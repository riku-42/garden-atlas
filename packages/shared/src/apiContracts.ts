import type {
  PlantEntry,
  RecommendationInteraction,
  StyleMode,
  UserRecommendationSettings
} from "./types";

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
  items: Array<
    Pick<
      PlantEntry,
      "id" | "commonName" | "speciesName" | "capturedAt" | "locationName" | "generatedImageUrl"
    >
  >;
  nextCursor: string | null;
};

export type CoverRecommendationsResponse = {
  items: Array<
    Pick<
      PlantEntry,
      | "id"
      | "generatedImageUrl"
      | "commonName"
      | "speciesName"
      | "publicLocationLabel"
      | "ownerDisplayName"
      | "styleMode"
      | "tags"
    >
  >;
  nextCursor: string | null;
};

export type RecommendationInteractionRequest = Pick<RecommendationInteraction, "action">;

export type RecommendationSettingsResponse = {
  settings: UserRecommendationSettings;
};
