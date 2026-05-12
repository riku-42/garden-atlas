# Garden Atlas Prototype-First MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished mobile-first Garden Atlas web prototype plus a React Native Expo scaffold that mirrors the same product structure, mock data, UI copy, data model, and API boundaries.

**Architecture:** The web prototype is the design source of truth and lives in `apps/web`. Shared product data, types, and service contracts live in `packages/shared`. The Expo scaffold in `apps/mobile` reuses the same concepts and mocked data but stays lightweight, with placeholders for camera, location, image upload, and OpenAI-backed generation.

**Tech Stack:** Vite, React, TypeScript, CSS modules/plain CSS, Vitest, React Native Expo, Expo Router, TypeScript.

---

## File Structure

- Create `package.json`: npm workspaces, shared scripts.
- Create `tsconfig.base.json`: shared TypeScript settings.
- Create `apps/web`: Vite React prototype.
- Create `apps/web/src/domain`: web-facing adapters around shared mocked data.
- Create `apps/web/src/components`: reusable UI pieces such as phone shell, bottom nav, atlas card, recommendation deck, gallery card, comparison slider.
- Create `apps/web/src/screens`: Home, Capture, Generating, Result, Gallery, EntryDetail, LocationPicker, RecommendationSettings, ShareExport.
- Create `apps/web/src/styles`: app CSS and tokens.
- Create `apps/web/src/test`: Vitest setup.
- Create `apps/mobile`: Expo scaffold.
- Create `apps/mobile/app`: Expo Router screens matching the web screen names.
- Create `apps/mobile/src`: mobile components, mock services, and placeholders.
- Create `packages/shared/src`: data model types, UI copy, mock entries, API contract helpers.
- Modify `README.md`: add run commands and project structure.

## Task 1: Workspace Bootstrap

**Files:**
- Create: `package.json`
- Create: `tsconfig.base.json`
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/src/types.ts`
- Modify: `README.md`

- [ ] **Step 1: Add workspace package metadata**

Create `package.json`:

```json
{
  "name": "garden-atlas",
  "version": "0.1.0",
  "private": true,
  "description": "Prototype-first MVP for Garden Atlas / 花园图鉴.",
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "npm --workspace @garden-atlas/web run dev",
    "build:web": "npm --workspace @garden-atlas/web run build",
    "test:web": "npm --workspace @garden-atlas/web run test",
    "typecheck": "npm --workspaces --if-present run typecheck",
    "dev:mobile": "npm --workspace @garden-atlas/mobile run start"
  }
}
```

- [ ] **Step 2: Add base TypeScript config**

Create `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

- [ ] **Step 3: Add shared package shell**

Create `packages/shared/package.json`:

```json
{
  "name": "@garden-atlas/shared",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": {
    "typecheck": "tsc -p tsconfig.json"
  },
  "devDependencies": {
    "typescript": "^5.8.3"
  }
}
```

Create `packages/shared/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src"]
}
```

Create `packages/shared/src/types.ts`:

```ts
export type StyleMode =
  | "scientific_herbarium"
  | "vintage_botanical_book"
  | "minimal_japanese_field_guide"
  | "modern_editorial";

export type IdentificationStatus = "identified" | "unidentified" | "edited";

export type EntryVisibility = "private" | "recommendable";

export type GenerationStatus = "queued" | "processing" | "succeeded" | "failed";

export type GenerationRecord = {
  id: string;
  entryId: string;
  status: GenerationStatus;
  styleMode: StyleMode;
  prompt: string;
  revisedPrompt: string | null;
  outputImageUrl: string | null;
  errorCode: string | null;
  createdAt: string;
  completedAt: string | null;
};

export type PlantEntry = {
  id: string;
  originalImageUrl: string;
  generatedImageUrl: string;
  speciesName: string;
  commonName: string;
  identificationStatus: IdentificationStatus;
  confidence: number | null;
  notes: string;
  latitude: number | null;
  longitude: number | null;
  locationName: string;
  publicLocationLabel: string | null;
  weatherSummary: string | null;
  capturedAt: string;
  createdAt: string;
  updatedAt: string;
  styleMode: StyleMode;
  tags: string[];
  favorite: boolean;
  visibility: EntryVisibility;
  ownerDisplayName: string | null;
  generationHistory: GenerationRecord[];
};

export type UserRecommendationSettings = {
  userId: string;
  recommendationSharingEnabled: boolean;
  defaultEntryVisibility: EntryVisibility;
  publicDisplayName: string;
  updatedAt: string;
};

export type RecommendationInteraction = {
  id: string;
  viewerUserId: string;
  entryId: string;
  action: "like" | "pass";
  createdAt: string;
};
```

Create `packages/shared/src/index.ts`:

```ts
export * from "./types";
```

- [ ] **Step 4: Run typecheck for shared package**

Run:

```bash
npm install
npm --workspace @garden-atlas/shared run typecheck
```

Expected: TypeScript exits successfully with no diagnostics.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.base.json packages/shared README.md
git commit -m "chore: bootstrap garden atlas workspace"
```

## Task 2: Shared Copy, Mock Data, And API Contracts

**Files:**
- Create: `packages/shared/src/copy.ts`
- Create: `packages/shared/src/mockData.ts`
- Create: `packages/shared/src/apiContracts.ts`
- Modify: `packages/shared/src/index.ts`
- Test: `packages/shared/src/mockData.test.ts`

- [ ] **Step 1: Add shared UI copy**

Create `packages/shared/src/copy.ts`:

```ts
export const uiCopy = {
  brand: {
    zh: "花园图鉴",
    en: "Garden Atlas"
  },
  home: {
    tagline: "探索植物之美，记录自然的每一刻。",
    coverTitle: "封面植物",
    coverHint: "左滑略过，右滑喜欢",
    captureTitle: "拍照识别植物",
    captureSubtitle: "拍下植物，生成专属图鉴",
    gallery: "图鉴全览",
    favorites: "我的收藏"
  },
  generation: [
    "正在整理植物轮廓",
    "生成标本构图",
    "绘制细节特写",
    "写入图鉴标签"
  ],
  recommendation: {
    optInTitle: "开放我的图鉴推荐给他人",
    optInBody: "开启后，你选择公开的植物卡片可能出现在他人的封面植物中。",
    privateDefault: "默认保持私密",
    makeRecommendable: "设为可推荐",
    remove: "从推荐中移除",
    pass: "不喜欢",
    like: "喜欢"
  }
} as const;
```

- [ ] **Step 2: Add mock plant entries**

Create `packages/shared/src/mockData.ts`:

```ts
import type { PlantEntry, UserRecommendationSettings } from "./types";

const now = "2026-05-12T07:30:00.000Z";

export const mockEntries: PlantEntry[] = [
  {
    id: "entry_camellia",
    originalImageUrl: "/images/mock/camellia-original.jpg",
    generatedImageUrl: "/images/mock/camellia-atlas.jpg",
    speciesName: "Camellia japonica",
    commonName: "山茶",
    identificationStatus: "identified",
    confidence: 0.88,
    notes: "雨后的一株山茶，花开洁白，香气淡雅。",
    latitude: 30.2475,
    longitude: 120.1215,
    locationName: "浙江省杭州市西湖区满觉陇路",
    publicLocationLabel: "杭州",
    weatherSummary: "小雨后",
    capturedAt: "2026-05-20T10:30:00.000Z",
    createdAt: now,
    updatedAt: now,
    styleMode: "scientific_herbarium",
    tags: ["庭院植物", "开花植物", "常绿灌木"],
    favorite: true,
    visibility: "recommendable",
    ownerDisplayName: "Luna's Herbarium",
    generationHistory: []
  },
  {
    id: "entry_hydrangea",
    originalImageUrl: "/images/mock/hydrangea-original.jpg",
    generatedImageUrl: "/images/mock/hydrangea-atlas.jpg",
    speciesName: "Hydrangea macrophylla",
    commonName: "绣球花",
    identificationStatus: "identified",
    confidence: 0.81,
    notes: "花球颜色从粉到紫，适合作为图鉴封面。",
    latitude: null,
    longitude: null,
    locationName: "Grandma's Backyard",
    publicLocationLabel: "庭院",
    weatherSummary: null,
    capturedAt: "2026-05-18T09:12:00.000Z",
    createdAt: now,
    updatedAt: now,
    styleMode: "minimal_japanese_field_guide",
    tags: ["花园", "夏季", "粉紫"],
    favorite: false,
    visibility: "recommendable",
    ownerDisplayName: "Moss & Petal",
    generationHistory: []
  },
  {
    id: "entry_rose",
    originalImageUrl: "/images/mock/rose-original.jpg",
    generatedImageUrl: "/images/mock/rose-atlas.jpg",
    speciesName: "Rosa chinensis",
    commonName: "月季",
    identificationStatus: "edited",
    confidence: 0.74,
    notes: "河岸边的黄色月季。",
    latitude: null,
    longitude: null,
    locationName: "Tokyo Riverside",
    publicLocationLabel: "Tokyo",
    weatherSummary: "晴",
    capturedAt: "2026-05-10T16:20:00.000Z",
    createdAt: now,
    updatedAt: now,
    styleMode: "vintage_botanical_book",
    tags: ["黄色", "河岸", "旅行"],
    favorite: false,
    visibility: "private",
    ownerDisplayName: null,
    generationHistory: []
  }
];

export const recommendationSettings: UserRecommendationSettings = {
  userId: "user_demo",
  recommendationSharingEnabled: false,
  defaultEntryVisibility: "private",
  publicDisplayName: "My Herbarium",
  updatedAt: now
};

export function getRecommendableEntries(entries: PlantEntry[] = mockEntries): PlantEntry[] {
  return entries.filter((entry) => entry.visibility === "recommendable");
}
```

- [ ] **Step 3: Add API contract helpers**

Create `packages/shared/src/apiContracts.ts`:

```ts
import type { PlantEntry, RecommendationInteraction, StyleMode, UserRecommendationSettings } from "./types";

export type CreatePlantEntryRequest = {
  originalImageId: string;
  styleMode: StyleMode;
  notes: string;
  latitude: number | null;
  longitude: number | null;
  locationName: string;
};

export type CreatePlantEntryResponse = {
  entry: {
    id: string;
    generationStatus: "queued";
  };
};

export type StartGenerationRequest = {
  styleMode: StyleMode;
  includeDetailPanels: boolean;
  includeLineDrawings: boolean;
  language: "zh-CN" | "en-US";
};

export type StartGenerationResponse = {
  generation: {
    id: string;
    status: "processing";
    estimatedSeconds: number;
  };
};

export type GalleryResponse = {
  items: Array<Pick<PlantEntry, "id" | "commonName" | "speciesName" | "capturedAt" | "locationName" | "generatedImageUrl">>;
  nextCursor: string | null;
};

export type CoverRecommendationsResponse = {
  items: Array<Pick<PlantEntry, "id" | "generatedImageUrl" | "commonName" | "speciesName" | "publicLocationLabel" | "ownerDisplayName" | "styleMode" | "tags">>;
  nextCursor: string | null;
};

export type RecommendationInteractionRequest = Pick<RecommendationInteraction, "action">;

export type RecommendationSettingsResponse = {
  settings: UserRecommendationSettings;
};
```

- [ ] **Step 4: Export shared modules**

Modify `packages/shared/src/index.ts`:

```ts
export * from "./apiContracts";
export * from "./copy";
export * from "./mockData";
export * from "./types";
```

- [ ] **Step 5: Add shared mock data test**

Create `packages/shared/src/mockData.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getRecommendableEntries, mockEntries } from "./mockData";

describe("mockData", () => {
  it("only exposes opt-in entries for recommendations", () => {
    const recommendations = getRecommendableEntries(mockEntries);

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.every((entry) => entry.visibility === "recommendable")).toBe(true);
    expect(recommendations.every((entry) => entry.publicLocationLabel !== null)).toBe(true);
  });
});
```

- [ ] **Step 6: Add Vitest dependency to shared package**

Modify `packages/shared/package.json`:

```json
{
  "name": "@garden-atlas/shared",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": {
    "test": "vitest run",
    "typecheck": "tsc -p tsconfig.json"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.1.4"
  }
}
```

- [ ] **Step 7: Run tests**

Run:

```bash
npm install
npm --workspace @garden-atlas/shared run test
npm --workspace @garden-atlas/shared run typecheck
```

Expected: one passing test and no TypeScript diagnostics.

- [ ] **Step 8: Commit**

```bash
git add packages/shared package-lock.json
git commit -m "feat: add shared garden atlas domain data"
```

## Task 3: Web App Shell

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/index.html`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/vite.config.ts`
- Create: `apps/web/src/main.tsx`
- Create: `apps/web/src/App.tsx`
- Create: `apps/web/src/styles/tokens.css`
- Create: `apps/web/src/styles/app.css`
- Test: `apps/web/src/App.test.tsx`

- [ ] **Step 1: Add Vite package**

Create `apps/web/package.json`:

```json
{
  "name": "@garden-atlas/web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -p tsconfig.json && vite build",
    "test": "vitest run",
    "typecheck": "tsc -p tsconfig.json"
  },
  "dependencies": {
    "@garden-atlas/shared": "0.1.0",
    "@vitejs/plugin-react": "^4.5.0",
    "vite": "^6.3.5",
    "typescript": "^5.8.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "lucide-react": "^0.511.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@types/react": "^19.1.4",
    "@types/react-dom": "^19.1.5",
    "jsdom": "^26.1.0",
    "vitest": "^3.1.4"
  }
}
```

- [ ] **Step 2: Add Vite config**

Create `apps/web/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "vite.config.ts"]
}
```

Create `apps/web/vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"]
  }
});
```

Create `apps/web/index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>花园图鉴 / Garden Atlas</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Add initial React shell**

Create `apps/web/src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/tokens.css";
import "./styles/app.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Create `apps/web/src/App.tsx`:

```tsx
import { uiCopy } from "@garden-atlas/shared";

export function App() {
  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="Garden Atlas prototype">
        <div className="screen home-screen">
          <p className="status-row">9:41</p>
          <h1>{uiCopy.brand.zh}</h1>
          <p className="tagline">{uiCopy.home.tagline}</p>
        </div>
      </section>
    </main>
  );
}
```

Create `apps/web/src/styles/tokens.css`:

```css
:root {
  --color-ink: #20351f;
  --color-muted: #68745f;
  --color-paper: #fbf7ed;
  --color-ivory: #fffdf6;
  --color-moss: #557a3d;
  --color-forest: #172916;
  --color-line: #e2dac7;
  --color-gold: #b5964f;
  --shadow-soft: 0 22px 64px rgba(49, 61, 42, 0.14);
  --radius-card: 8px;
  --radius-phone: 34px;
}
```

Create `apps/web/src/styles/app.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #ece5d8;
  color: var(--color-ink);
  font-family: Aptos, "Segoe UI", sans-serif;
}

.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.phone-frame {
  width: min(100%, 390px);
  min-height: 780px;
  border-radius: var(--radius-phone);
  background: #111;
  padding: 10px;
  box-shadow: var(--shadow-soft);
}

.screen {
  min-height: 760px;
  border-radius: 27px;
  overflow: hidden;
  background: linear-gradient(180deg, #fffaf0, #f0e7d8);
}

.home-screen {
  padding: 22px;
}

.status-row {
  margin: 0 0 44px;
  font-size: 12px;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 48px;
  letter-spacing: 0;
}

.tagline {
  color: var(--color-muted);
}
```

- [ ] **Step 4: Add shell smoke test**

Create `apps/web/src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Create `apps/web/src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the Garden Atlas brand", () => {
    render(<App />);

    expect(screen.getByText("花园图鉴")).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run shell checks**

Run:

```bash
npm install
npm --workspace @garden-atlas/web run test
npm --workspace @garden-atlas/web run build
```

Expected: test passes and Vite build creates `apps/web/dist`.

- [ ] **Step 6: Commit**

```bash
git add apps/web package-lock.json
git commit -m "feat: add web prototype shell"
```

## Task 4: Web Prototype Screens

**Files:**
- Create: `apps/web/src/components/AtlasCard.tsx`
- Create: `apps/web/src/components/BottomNav.tsx`
- Create: `apps/web/src/components/GalleryCard.tsx`
- Create: `apps/web/src/components/PlantVisual.tsx`
- Create: `apps/web/src/components/RecommendationDeck.tsx`
- Create: `apps/web/src/screens/HomeScreen.tsx`
- Create: `apps/web/src/screens/CaptureScreen.tsx`
- Create: `apps/web/src/screens/GeneratingScreen.tsx`
- Create: `apps/web/src/screens/ResultScreen.tsx`
- Create: `apps/web/src/screens/GalleryScreen.tsx`
- Create: `apps/web/src/screens/EntryDetailScreen.tsx`
- Create: `apps/web/src/screens/LocationScreen.tsx`
- Create: `apps/web/src/screens/RecommendationSettingsScreen.tsx`
- Create: `apps/web/src/screens/ShareExportScreen.tsx`
- Modify: `apps/web/src/App.tsx`
- Modify: `apps/web/src/styles/app.css`
- Test: `apps/web/src/components/RecommendationDeck.test.tsx`

- [ ] **Step 1: Implement route state in `App.tsx`**

Use local state instead of a router for the prototype:

```tsx
import { useState } from "react";
import { mockEntries } from "@garden-atlas/shared";
import { CaptureScreen } from "./screens/CaptureScreen";
import { EntryDetailScreen } from "./screens/EntryDetailScreen";
import { GalleryScreen } from "./screens/GalleryScreen";
import { GeneratingScreen } from "./screens/GeneratingScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LocationScreen } from "./screens/LocationScreen";
import { RecommendationSettingsScreen } from "./screens/RecommendationSettingsScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { ShareExportScreen } from "./screens/ShareExportScreen";

export type ScreenName =
  | "home"
  | "capture"
  | "generating"
  | "result"
  | "gallery"
  | "detail"
  | "location"
  | "settings"
  | "share";

export function App() {
  const [screen, setScreen] = useState<ScreenName>("home");
  const selectedEntry = mockEntries[0];

  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="Garden Atlas prototype">
        {screen === "home" && <HomeScreen onNavigate={setScreen} />}
        {screen === "capture" && <CaptureScreen onNavigate={setScreen} />}
        {screen === "generating" && <GeneratingScreen onNavigate={setScreen} />}
        {screen === "result" && <ResultScreen entry={selectedEntry} onNavigate={setScreen} />}
        {screen === "gallery" && <GalleryScreen onNavigate={setScreen} />}
        {screen === "detail" && <EntryDetailScreen entry={selectedEntry} onNavigate={setScreen} />}
        {screen === "location" && <LocationScreen onNavigate={setScreen} />}
        {screen === "settings" && <RecommendationSettingsScreen onNavigate={setScreen} />}
        {screen === "share" && <ShareExportScreen entry={selectedEntry} onNavigate={setScreen} />}
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Implement recommendation deck behavior**

Create `apps/web/src/components/RecommendationDeck.tsx`:

```tsx
import { useMemo, useState } from "react";
import { getRecommendableEntries, uiCopy, type PlantEntry } from "@garden-atlas/shared";
import { Heart, X } from "lucide-react";
import { PlantVisual } from "./PlantVisual";

type RecommendationDeckProps = {
  onOpenEntry: (entry: PlantEntry) => void;
};

export function RecommendationDeck({ onOpenEntry }: RecommendationDeckProps) {
  const entries = useMemo(() => getRecommendableEntries(), []);
  const [index, setIndex] = useState(0);
  const current = entries[index % entries.length];

  function advance() {
    setIndex((value) => value + 1);
  }

  return (
    <section className="recommendation" aria-label="封面植物推荐">
      <div className="section-heading">
        <div>
          <h2>{uiCopy.home.coverTitle}</h2>
          <p>{uiCopy.home.coverHint}</p>
        </div>
        <span>{index + 1}</span>
      </div>
      <button className="plant-deck-card" type="button" onClick={() => onOpenEntry(current)}>
        <PlantVisual variant={current.id} />
        <span className="swipe-stamp pass">PASS</span>
        <span className="swipe-stamp like">LIKE</span>
        <span className="plant-card-copy">
          <strong>{current.commonName}</strong>
          <small>{current.speciesName} · {current.publicLocationLabel}</small>
          <small>来自 {current.ownerDisplayName}</small>
        </span>
      </button>
      <div className="deck-actions">
        <button type="button" className="round-action" onClick={advance} aria-label="不喜欢">
          <X size={22} />
        </button>
        <button type="button" className="round-action like" onClick={advance} aria-label="喜欢">
          <Heart size={22} />
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add deck tests**

Create `apps/web/src/components/RecommendationDeck.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RecommendationDeck } from "./RecommendationDeck";

describe("RecommendationDeck", () => {
  it("advances to the next recommendable plant after like", async () => {
    render(<RecommendationDeck onOpenEntry={vi.fn()} />);

    expect(screen.getByText("山茶")).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("喜欢"));
    expect(screen.getByText("绣球花")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Implement remaining screens from the storyboard**

Create each screen with the same names listed in the file section. Each screen must:

- Use `ScreenName` navigation callbacks from `App.tsx`.
- Use `PlantVisual` instead of external images.
- Keep text from `uiCopy` where available.
- Keep primary actions visible inside a mobile viewport.
- Include a meaningful `aria-label` for the screen root.

- [ ] **Step 5: Run web checks**

Run:

```bash
npm --workspace @garden-atlas/web run test
npm --workspace @garden-atlas/web run build
```

Expected: tests pass and build succeeds.

- [ ] **Step 6: Manual browser verification**

Run:

```bash
npm --workspace @garden-atlas/web run dev -- --port 5175
```

Open `http://localhost:5175` and verify:

- Home shows one `封面植物` card in the first viewport.
- Like/pass buttons advance the deck indefinitely.
- Capture, generation, result, gallery, detail, location, recommendation settings, and share screens are reachable.
- Text does not overflow on a 390px mobile viewport.

- [ ] **Step 7: Commit**

```bash
git add apps/web
git commit -m "feat: build mobile web prototype screens"
```

## Task 5: Expo Scaffold

**Files:**
- Create: `apps/mobile/package.json`
- Create: `apps/mobile/app.json`
- Create: `apps/mobile/tsconfig.json`
- Create: `apps/mobile/app/_layout.tsx`
- Create: `apps/mobile/app/index.tsx`
- Create: `apps/mobile/app/capture.tsx`
- Create: `apps/mobile/app/generating.tsx`
- Create: `apps/mobile/app/result.tsx`
- Create: `apps/mobile/app/gallery.tsx`
- Create: `apps/mobile/app/detail.tsx`
- Create: `apps/mobile/app/location.tsx`
- Create: `apps/mobile/app/recommendation-settings.tsx`
- Create: `apps/mobile/src/components/Screen.tsx`
- Create: `apps/mobile/src/components/PlantVisual.tsx`
- Create: `apps/mobile/src/services/generationService.ts`

- [ ] **Step 1: Add Expo package**

Create `apps/mobile/package.json`:

```json
{
  "name": "@garden-atlas/mobile",
  "version": "0.1.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "typecheck": "tsc -p tsconfig.json"
  },
  "dependencies": {
    "@garden-atlas/shared": "0.1.0",
    "expo": "^53.0.0",
    "expo-camera": "^16.1.6",
    "expo-image-picker": "^16.1.4",
    "expo-location": "^18.1.5",
    "expo-router": "^5.0.7",
    "react": "^19.0.0",
    "react-native": "^0.79.2",
    "react-native-gesture-handler": "^2.24.0",
    "react-native-reanimated": "^3.17.5",
    "react-native-safe-area-context": "^5.4.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.14",
    "typescript": "^5.8.3"
  }
}
```

- [ ] **Step 2: Add Expo config**

Create `apps/mobile/app.json`:

```json
{
  "expo": {
    "name": "Garden Atlas",
    "slug": "garden-atlas",
    "scheme": "garden-atlas",
    "version": "0.1.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "plugins": ["expo-router", "expo-camera", "expo-image-picker", "expo-location"]
  }
}
```

Create `apps/mobile/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-native"
  },
  "include": ["app", "src"]
}
```

- [ ] **Step 3: Add Expo Router layout**

Create `apps/mobile/app/_layout.tsx`:

```tsx
import { Stack } from "expo-router";

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

- [ ] **Step 4: Add shared screen wrapper**

Create `apps/mobile/src/components/Screen.tsx`:

```tsx
import type { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fbf7ed"
  },
  content: {
    flex: 1,
    padding: 20
  }
});
```

- [ ] **Step 5: Add route placeholders**

Each file in `apps/mobile/app/*.tsx` should render a `Screen`, a title, and primary content copied from the matching web screen. Example for `apps/mobile/app/index.tsx`:

```tsx
import { uiCopy } from "@garden-atlas/shared";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../src/components/Screen";

export default function Home() {
  return (
    <Screen>
      <Text>{uiCopy.brand.zh}</Text>
      <Text>{uiCopy.home.coverTitle}</Text>
      <View>
        <Link href="/capture">拍照识别植物</Link>
        <Link href="/gallery">图鉴全览</Link>
        <Link href="/recommendation-settings">推荐设置</Link>
      </View>
    </Screen>
  );
}
```

- [ ] **Step 6: Add generation service placeholder**

Create `apps/mobile/src/services/generationService.ts`:

```ts
import type { StartGenerationRequest, StartGenerationResponse } from "@garden-atlas/shared";

export async function startMockGeneration(_request: StartGenerationRequest): Promise<StartGenerationResponse> {
  return {
    generation: {
      id: "gen_mock",
      status: "processing",
      estimatedSeconds: 12
    }
  };
}
```

- [ ] **Step 7: Run mobile typecheck**

Run:

```bash
npm install
npm --workspace @garden-atlas/mobile run typecheck
```

Expected: TypeScript exits successfully.

- [ ] **Step 8: Commit**

```bash
git add apps/mobile package-lock.json
git commit -m "feat: scaffold expo mobile app"
```

## Task 6: Final Verification And Handoff

**Files:**
- Modify: `README.md`
- Create: `docs/html/garden-atlas-build-handoff.html`

- [ ] **Step 1: Update README run instructions**

Add:

```md
## Run Locally

```bash
npm install
npm run dev:web
npm run dev:mobile
```

Web prototype: `http://localhost:5175`

## Verify

```bash
npm run typecheck
npm run build:web
npm run test:web
```
```

- [ ] **Step 2: Create HTML handoff page**

Create `docs/html/garden-atlas-build-handoff.html` summarizing:

- Prototype URL.
- Implemented screens.
- Recommendation privacy behavior.
- Test commands.
- Known deferred production work.

- [ ] **Step 3: Run full checks**

Run:

```bash
npm run typecheck
npm run test:web
npm run build:web
```

Expected: all commands succeed.

- [ ] **Step 4: Browser visual QA**

Open web prototype at `http://localhost:5175`.

Verify:

- Desktop: centered phone frame with no overlapping controls.
- Mobile viewport: no text overflow inside buttons/cards.
- Home first viewport shows one dominant `封面植物` card.
- Like/pass advances the recommendation deck.
- Settings explain opt-in recommendation sharing.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/html/garden-atlas-build-handoff.html
git commit -m "docs: add prototype handoff"
```

## Self-Review

Spec coverage:

- Mobile-first web prototype: Tasks 3, 4, and 6.
- React Native Expo scaffold: Task 5.
- Formal UI copy, data model, and API contracts: Tasks 1 and 2.
- One-card-at-a-time `封面植物` recommendation stream: Task 4.
- Opt-in recommendation sharing and privacy rules: Tasks 2, 4, 5, and 6.
- Gallery/detail/location/result/share/capture pages: Task 4.

Placeholder scan:

- The plan intentionally defers production OpenAI calls, auth, payments, cloud sync, and production map SDK keys because the approved MVP scope keeps them mocked.
- No implementation step relies on an undefined type or missing route name.

Type consistency:

- `PlantEntry`, `StyleMode`, `UserRecommendationSettings`, and recommendation interaction types are defined in `packages/shared/src/types.ts` before web and mobile code consume them.
- Web `ScreenName` values match the intended prototype screens.
- API contract names match the product spec endpoints.
