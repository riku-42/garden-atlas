import type { PlantEntry } from "@garden-atlas/shared";
import { PlantVisual } from "./PlantVisual";

type AtlasCardProps = {
  entry: PlantEntry;
};

export function AtlasCard({ entry }: AtlasCardProps) {
  return (
    <article className="atlas-card">
      <h2>{entry.commonName}</h2>
      <p>
        {entry.speciesName} · {entry.publicLocationLabel}
      </p>
      <div className="atlas-hero">
        <PlantVisual variant={entry.id} />
      </div>
      <div className="pill-row">
        <span className="pill">花期 12月-4月</span>
        <span className="pill">{entry.styleMode.replaceAll("_", " ")}</span>
      </div>
      <div className="line-row" aria-label="Botanical line drawings">
        <div className="line-drawing" />
        <div className="line-drawing" />
        <div className="line-drawing" />
        <div className="line-drawing" />
      </div>
    </article>
  );
}
