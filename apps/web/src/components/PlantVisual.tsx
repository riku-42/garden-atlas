type PlantVisualProps = {
  variant: string;
};

export function PlantVisual({ variant }: PlantVisualProps) {
  return <div className={`plant-visual ${variant}`} aria-hidden="true" />;
}
