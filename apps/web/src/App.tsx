import { useState } from "react";
import { mockEntries, type PlantEntry } from "@garden-atlas/shared";
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
  const [selectedEntry, setSelectedEntry] = useState<PlantEntry>(mockEntries[0]);

  function openEntry(entry: PlantEntry) {
    setSelectedEntry(entry);
    setScreen("detail");
  }

  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="Garden Atlas prototype">
        {screen === "home" && <HomeScreen onNavigate={setScreen} onOpenEntry={openEntry} />}
        {screen === "capture" && <CaptureScreen onNavigate={setScreen} />}
        {screen === "generating" && <GeneratingScreen onNavigate={setScreen} />}
        {screen === "result" && <ResultScreen entry={selectedEntry} onNavigate={setScreen} />}
        {screen === "gallery" && <GalleryScreen onNavigate={setScreen} onOpenEntry={openEntry} />}
        {screen === "detail" && <EntryDetailScreen entry={selectedEntry} onNavigate={setScreen} />}
        {screen === "location" && <LocationScreen onNavigate={setScreen} />}
        {screen === "settings" && <RecommendationSettingsScreen onNavigate={setScreen} />}
        {screen === "share" && <ShareExportScreen entry={selectedEntry} onNavigate={setScreen} />}
      </section>
    </main>
  );
}
