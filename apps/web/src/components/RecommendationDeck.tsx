import { useMemo, useState } from "react";
import { uiCopy, type PlantEntry, type RecommendationInteraction } from "@garden-atlas/shared";
import { Heart, X } from "lucide-react";
import { PlantVisual } from "./PlantVisual";

type RecommendationDeckProps = {
  entries: PlantEntry[];
  interactionsCount: number;
  onInteract: (entryId: string, action: RecommendationInteraction["action"]) => void;
  onOpenEntry: (entry: PlantEntry) => void;
};

export function RecommendationDeck({ entries, interactionsCount, onInteract, onOpenEntry }: RecommendationDeckProps) {
  const safeEntries = useMemo(() => (entries.length > 0 ? entries : []), [entries]);
  const [index, setIndex] = useState(0);
  const [gesture, setGesture] = useState<"left" | "right" | null>(null);
  const current = safeEntries[index % safeEntries.length];

  function advance(nextGesture: "left" | "right", action: RecommendationInteraction["action"]) {
    if (!current) {
      return;
    }
    setGesture(nextGesture);
    window.setTimeout(() => {
      onInteract(current.id, action);
      setIndex((value) => value + 1);
      setGesture(null);
    }, 160);
  }

  if (!current) {
    return (
      <section className="recommendation" aria-label="封面植物推荐">
        <div className="paper-panel">
          <strong>暂无公开植物</strong>
          <p>开启图鉴推荐后，这里会出现他人的植物卡片。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="recommendation" aria-label="封面植物推荐">
      <div className="section-heading">
        <div>
          <h2>{uiCopy.home.coverTitle}</h2>
          <p>{uiCopy.home.coverHint}</p>
        </div>
        <span>{interactionsCount} 次滑动</span>
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
        <button type="button" className="round-action" onClick={() => advance("left", "pass")} aria-label="不喜欢">
          <X size={22} />
          {uiCopy.recommendation.pass}
        </button>
        <button type="button" className="round-action like" onClick={() => advance("right", "like")} aria-label="喜欢">
          <Heart size={22} />
          {uiCopy.recommendation.like}
        </button>
      </div>
    </section>
  );
}
