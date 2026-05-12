#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import net from "node:net";
import path from "node:path";
import qrcode from "qrcode-terminal";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mobileRoot = path.resolve(__dirname, "..");
const isWindows = process.platform === "win32";
const npxBin = isWindows ? "npx.cmd" : "npx";

const cliArgs = process.argv.slice(2);
const smokeTest = cliArgs.includes("--smoke-test");
const expoArgsFromUser = cliArgs.filter((arg) => arg !== "--smoke-test" && arg !== "--non-interactive");
const requestedPort = Number(process.env.RCT_METRO_PORT || process.env.EXPO_PORT || 8081);
const qrPlatform = resolveQrPlatform(process.env.EXPO_GO_PLATFORM || "ios");
const children = new Set();

let shuttingDown = false;
let expoStarted = false;
let port = requestedPort;

function log(message) {
  process.stdout.write(`${message}\n`);
}

function resolveQrPlatform(platform) {
  const normalized = String(platform).toLowerCase();
  if (normalized === "android" || normalized === "ios") {
    return normalized;
  }

  throw new Error(`EXPO_GO_PLATFORM must be "ios" or "android". Received: ${platform}`);
}

function spawnChild(command, args, options = {}) {
  const useCmdShim = isWindows && command.toLowerCase().endsWith(".cmd");
  const child = spawn(useCmdShim ? "cmd.exe" : command, useCmdShim ? ["/d", "/s", "/c", command, ...args] : args, {
    cwd: options.cwd ?? mobileRoot,
    env: options.env ?? process.env,
    stdio: options.stdio ?? ["inherit", "pipe", "pipe"],
    shell: false,
  });

  children.add(child);
  child.once("exit", () => children.delete(child));
  child.once("error", (error) => {
    log(`[garden-atlas] Failed to start ${command}: ${error.message}`);
  });

  return child;
}

function stopChildren() {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (child.killed) {
      continue;
    }

    if (isWindows && child.pid) {
      spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      child.kill("SIGTERM");
    }
  }
}

function pipeWithPrefix(stream, prefix, onData) {
  stream.on("data", (chunk) => {
    const text = chunk.toString();
    onData?.(text);
    process.stdout.write(
      text
        .split(/\r?\n/)
        .map((line) => (line ? `${prefix}${line}` : line))
        .join("\n")
    );
  });
}

function isPortAvailable(candidatePort) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(candidatePort);
  });
}

async function resolveAvailablePort(startPort) {
  for (let candidatePort = startPort; candidatePort < startPort + 20; candidatePort += 1) {
    if (await isPortAvailable(candidatePort)) {
      return candidatePort;
    }
  }

  throw new Error(`No available Expo port found from ${startPort} to ${startPort + 19}.`);
}

async function waitForStatus(url, label, timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;

  while (Date.now() < deadline) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      const body = await response.text();
      if (response.ok && body.includes("packager-status:running")) {
        log(`[garden-atlas] ${label} is reachable.`);
        return;
      }
      lastError = new Error(`${response.status} ${body.slice(0, 80)}`);
    } catch (error) {
      lastError = error;
    }
    await delay(1000);
  }

  throw new Error(`${label} did not become reachable: ${lastError?.message ?? "unknown error"}`);
}

async function waitForManifest(url, platform, timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;

  while (Date.now() < deadline) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(`${url}/?platform=${platform}`, {
        headers: {
          accept: "application/expo+json,application/json",
          "expo-platform": platform,
          "expo-protocol-version": "1",
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const body = await response.text();
      const contentType = response.headers.get("content-type") ?? "";
      JSON.parse(body);
      if (response.ok && contentType.includes("application/expo+json")) {
        log(`[garden-atlas] Expo ${platform} manifest is valid JSON.`);
        return;
      }
      lastError = new Error(`${response.status} ${contentType} ${body.slice(0, 80)}`);
    } catch (error) {
      lastError = error;
    }
    await delay(1000);
  }

  throw new Error(`Expo ${platform} manifest did not become valid JSON: ${lastError?.message ?? "unknown error"}`);
}

function startExpo(tunnelUrl) {
  if (expoStarted) return;
  expoStarted = true;

  const expoCommand = npxBin;
  const expoArgs = [
    "expo",
    "start",
    "--localhost",
    "--port",
    String(port),
    ...expoArgsFromUser,
  ];

  log(`[garden-atlas] Cloudflare tunnel ready: ${tunnelUrl}`);
  const expoGoUrl = `exp://${new URL(tunnelUrl).host}/?platform=${qrPlatform}`;
  log(`[garden-atlas] Expo Go URL: ${expoGoUrl}`);
  if (!smokeTest) {
    log("[garden-atlas] Scan this QR code with Expo Go:");
    qrcode.generate(expoGoUrl, { small: true }, (qr) => log(qr));
    log("[garden-atlas] Android phone: run again with $env:EXPO_GO_PLATFORM='android' before the npm command.");
  }
  log("[garden-atlas] Starting Expo with EXPO_PACKAGER_PROXY_URL so the QR code uses the public tunnel.");

  const expo = spawnChild(expoCommand, expoArgs, {
    cwd: mobileRoot,
    stdio: smokeTest ? undefined : "inherit",
    env: {
      ...process.env,
      CI: smokeTest ? "1" : process.env.CI,
      RCT_METRO_PORT: String(port),
      EXPO_PACKAGER_PROXY_URL: tunnelUrl,
    },
  });

  if (expo.stdout) {
    pipeWithPrefix(expo.stdout, "[expo] ");
  }
  if (expo.stderr) {
    pipeWithPrefix(expo.stderr, "[expo] ");
  }

  expo.once("exit", (code) => {
    if (!shuttingDown) {
      stopChildren();
      process.exit(code ?? 1);
    }
  });
}

async function main() {
  port = await resolveAvailablePort(requestedPort);
  if (port !== requestedPort) {
    log(`[garden-atlas] Expo port ${requestedPort} is busy; using ${port}.`);
  }

  log(`[garden-atlas] Opening Cloudflare quick tunnel to local Expo port ${port}.`);

  const cloudflared = spawnChild(npxBin, [
    "--yes",
    "cloudflared",
    "tunnel",
    "--url",
    `http://127.0.0.1:${port}`,
    "--no-autoupdate",
  ]);

  let tunnelUrl = null;
  const tunnelUrlPattern = /https:\/\/[-a-z0-9]+\.trycloudflare\.com/i;
  const handleTunnelOutput = (text) => {
    const match = text.match(tunnelUrlPattern);
    if (match && !tunnelUrl) {
      tunnelUrl = match[0];
      startExpo(tunnelUrl);
    }
  };

  pipeWithPrefix(cloudflared.stdout, "[cloudflared] ", handleTunnelOutput);
  pipeWithPrefix(cloudflared.stderr, "[cloudflared] ", handleTunnelOutput);

  cloudflared.once("exit", (code) => {
    if (!shuttingDown) {
      stopChildren();
      process.exit(code ?? 1);
    }
  });

  const deadline = Date.now() + 45000;
  while (!tunnelUrl && Date.now() < deadline) {
    await delay(250);
  }

  if (!tunnelUrl) {
    throw new Error("Cloudflare did not return a trycloudflare.com tunnel URL.");
  }

  if (smokeTest) {
    await waitForStatus(`http://127.0.0.1:${port}/status`, "Local Expo server");
    await waitForStatus(`${tunnelUrl}/status`, "Cloudflare tunnel");
    await waitForManifest(tunnelUrl, qrPlatform);
    stopChildren();
  }
}

process.once("SIGINT", () => {
  stopChildren();
  process.exit(130);
});
process.once("SIGTERM", () => {
  stopChildren();
  process.exit(143);
});
process.once("exit", stopChildren);

main().catch((error) => {
  stopChildren();
  process.stderr.write(`[garden-atlas] ${error.message}\n`);
  process.exit(1);
});
