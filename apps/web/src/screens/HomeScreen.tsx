import { Camera, Image, Star } from "lucide-react";
import { uiCopy, type PlantEntry } from "@garden-atlas/shared";
import type { ScreenName } from "../App";
import { BottomNav } from "../components/BottomNav";
import { RecommendationDeck } from "../components/RecommendationDeck";
import { StatusRow } from "../components/StatusRow";

type HomeScreenProps = {
  onNavigate: (screen: ScreenName) => void;
  onOpenEntry: (entry: PlantEntry) => void;
};

export function HomeScreen({ onNavigate, onOpenEntry }: HomeScreenProps) {
  return (
    <section className="screen" aria-label="Home">
      <div className="screen-scroll">
        <StatusRow />
        <div className="topbar">
          <div>
            <h1 className="hero-title">{uiCopy.brand.zh}</h1>
            <p className="tagline">{uiCopy.home.tagline}</p>
          </div>
          <button className="plain-icon" type="button" onClick={() => onNavigate("settings")} aria-label="设置">
            <Star size={18} />
          </button>
        </div>
        <RecommendationDeck onOpenEntry={onOpenEntry} />
        <div className="quick-actions">
          <button className="capture-card" type="button" onClick={() => onNavigate("capture")}>
            <span className="icon-button">
              <Camera size={22} />
            </span>
            <span>
              <strong>{uiCopy.home.captureTitle}</strong>
              <br />
              <small>{uiCopy.home.captureSubtitle}</small>
            </span>
          </button>
          <button className="square-card" type="button" onClick={() => onNavigate("gallery")}>
            <Image size={22} />
            <h3>{uiCopy.home.gallery}</h3>
            <p>查看所有图鉴</p>
          </button>
          <button className="square-card" type="button" onClick={() => onNavigate("gallery")}>
            <Star size={22} />
            <h3>{uiCopy.home.favorites}</h3>
            <p>收藏的植物</p>
          </button>
        </div>
      </div>
      <BottomNav onNavigate={onNavigate} />
    </section>
  );
}
