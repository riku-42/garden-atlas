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
  const [gesture, setGesture] = useState<"left" | "right" | null>(null);
  const current = entries[index % entries.length];

  function advance(nextGesture: "left" | "right") {
    setGesture(nextGesture);
    window.setTimeout(() => {
      setIndex((value) => value + 1);
      setGesture(null);
    }, 160);
  }

  return (
    <section className="recommendation" aria-label="封面植物推荐">
      <div className="section-heading">
        <div>
          <h2>{uiCopy.home.coverTitle}</h2>
          <p>{uiCopy.home.coverHint}</p>
        </div>
        <span>∞</span>
      </div>
      <button
        className={`plant-deck-card ${gesture === "left" ? "swiping-left" : ""} ${
          gesture === "right" ? "swiping-right" : ""
        }`}
        type="button"
        onClick={() => onOpenEntry(current)}
      >
        <PlantVisual variant={current.id} />
        <span className="swipe-stamp pass">PASS</span>
        <span className="swipe-stamp like">LIKE</span>
        <span className="plant-card-copy">
          <strong>{current.commonName}</strong>
          <small>
            {current.speciesName} · {current.publicLocationLabel}
          </small>
          <small>来自 {current.ownerDisplayName}</small>
        </span>
      </button>
      <div className="deck-actions">
        <button type="button" className="round-action" onClick={() => advance("left")} aria-label="不喜欢">
          <X size={22} />
          {uiCopy.recommendation.pass}
        </button>
        <button type="button" className="round-action like" onClick={() => advance("right")} aria-label="喜欢">
          <Heart size={22} />
          {uiCopy.recommendation.like}
        </button>
      </div>
    </section>
  );
}
