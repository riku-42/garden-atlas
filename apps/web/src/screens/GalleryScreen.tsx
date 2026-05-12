import { Search, SlidersHorizontal } from "lucide-react";
import type { PlantEntry } from "@garden-atlas/shared";
import type { ScreenName } from "../App";
import { BottomNav } from "../components/BottomNav";
import { GalleryCard } from "../components/GalleryCard";
import { StatusRow } from "../components/StatusRow";

type GalleryScreenProps = {
  entries: PlantEntry[];
  onNavigate: (screen: ScreenName) => void;
  onOpenEntry: (entry: PlantEntry) => void;
};

export function GalleryScreen({ entries, onNavigate, onOpenEntry }: GalleryScreenProps) {
  const identifiedCount = entries.filter((entry) => entry.identificationStatus !== "unidentified").length;
  const favoritesCount = entries.filter((entry) => entry.favorite).length;

  return (
    <section className="screen" aria-label="Gallery">
      <div className="screen-scroll">
        <StatusRow />
        <div className="topbar">
          <button className="icon-button" type="button" onClick={() => onNavigate("home")} aria-label="返回">
            ‹
          </button>
          <h3>图鉴全览</h3>
          <button className="icon-button" type="button" aria-label="搜索">
            <Search size={19} />
          </button>
        </div>
        <div className="pill-row">
          <span className="pill active">全部 {entries.length}</span>
          <span className="pill">已识别 {identifiedCount}</span>
          <span className="pill">未识别</span>
          <span className="pill">收藏 {favoritesCount}</span>
          <span className="pill">
            <SlidersHorizontal size={13} /> 筛选
          </span>
        </div>
        <div className="gallery-grid">
          {entries.map((entry) => (
            <GalleryCard entry={entry} key={entry.id} onOpen={onOpenEntry} />
          ))}
        </div>
      </div>
      <BottomNav onNavigate={onNavigate} />
    </section>
  );
}
