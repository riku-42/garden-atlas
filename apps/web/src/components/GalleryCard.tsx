import type { PlantEntry } from "@garden-atlas/shared";
import { PlantVisual } from "./PlantVisual";

type GalleryCardProps = {
  entry: PlantEntry;
  onOpen: (entry: PlantEntry) => void;
};

export function GalleryCard({ entry, onOpen }: GalleryCardProps) {
  return (
    <button className="gallery-card" type="button" onClick={() => onOpen(entry)}>
      <div className="gallery-card-visual">
        <PlantVisual variant={entry.id} />
      </div>
      <div className="gallery-card-copy">
        <strong>{entry.commonName}</strong>
        <br />
        <small>{entry.speciesName}</small>
        <br />
        <small>{entry.publicLocationLabel ?? entry.locationName}</small>
      </div>
    </button>
  );
}
