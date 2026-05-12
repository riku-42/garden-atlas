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
