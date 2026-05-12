import { mockEntries, recommendationSettings } from "./mockData";
import type {
  EntryVisibility,
  GenerationRecord,
  PlantEntry,
  RecommendationInteraction,
  StyleMode,
  UserRecommendationSettings
} from "./types";

export type PrototypeState = {
  entries: PlantEntry[];
  settings: UserRecommendationSettings;
  interactions: RecommendationInteraction[];
};

type CreatePrototypeStateInput = {
  entries?: PlantEntry[];
  settings?: UserRecommendationSettings;
  interactions?: RecommendationInteraction[];
};

export type AddCapturedEntryInput = {
  capturedAt?: string;
  generatedImageUrl?: string;
  id?: string;
  locationName?: string;
  notes?: string;
  now?: string;
  originalImageUrl?: string;
  sourceEntryId?: string;
  styleMode?: StyleMode;
};

export type AddCapturedEntryResult = {
  entryId: string;
  state: PrototypeState;
};

export function createPrototypeState(input: CreatePrototypeStateInput = {}): PrototypeState {
  return {
    entries: cloneEntries(input.entries ?? mockEntries),
    settings: { ...(input.settings ?? recommendationSettings) },
    interactions: [...(input.interactions ?? [])]
  };
}

export function getPlantEntry(state: PrototypeState, entryId: string): PlantEntry | undefined {
  return state.entries.find((entry) => entry.id === entryId);
}

export function addCapturedEntry(
  state: PrototypeState,
  input: AddCapturedEntryInput = {}
): AddCapturedEntryResult {
  const source = input.sourceEntryId ? getPlantEntry(state, input.sourceEntryId) : state.entries[0];
  const template = source ?? mockEntries[0];
  const now = input.now ?? new Date().toISOString();
  const entryId = input.id ?? `entry_capture_${state.entries.length + 1}`;
  const styleMode = input.styleMode ?? template.styleMode;
  const originalImageUrl = input.originalImageUrl ?? template.originalImageUrl;
  const generatedImageUrl = input.generatedImageUrl ?? input.originalImageUrl ?? template.generatedImageUrl;
  const generation: GenerationRecord = {
    id: `gen_${entryId}`,
    entryId,
    status: "succeeded",
    styleMode,
    prompt: `Mock botanical atlas generation for ${template.commonName}`,
    revisedPrompt: null,
    outputImageUrl: generatedImageUrl,
    errorCode: null,
    createdAt: now,
    completedAt: now
  };
  const entry: PlantEntry = {
    ...template,
    id: entryId,
    capturedAt: input.capturedAt ?? now,
    createdAt: now,
    updatedAt: now,
    favorite: false,
    generatedImageUrl,
    generationHistory: [generation],
    locationName: input.locationName ?? template.locationName,
    notes: input.notes ?? template.notes,
    originalImageUrl,
    ownerDisplayName: null,
    publicLocationLabel: null,
    styleMode,
    tags: [...template.tags],
    visibility: state.settings.defaultEntryVisibility,
    weatherSummary: null
  };

  return {
    entryId,
    state: {
      ...state,
      entries: [entry, ...state.entries]
    }
  };
}

export function getRecommendationQueue(state: PrototypeState): PlantEntry[] {
  const recommendable = state.entries.filter((entry) => entry.visibility === "recommendable");
  const interactedIds = new Set(state.interactions.map((interaction) => interaction.entryId));
  const fresh = recommendable.filter((entry) => !interactedIds.has(entry.id));

  return fresh.length > 0 ? fresh : recommendable;
}

export function recordRecommendationInteraction(
  state: PrototypeState,
  entryId: string,
  action: RecommendationInteraction["action"],
  viewerUserId = "user_demo"
): PrototypeState {
  const interaction: RecommendationInteraction = {
    id: `rec_${action}_${entryId}_${state.interactions.length + 1}`,
    viewerUserId,
    entryId,
    action,
    createdAt: new Date().toISOString()
  };

  return {
    ...state,
    entries: state.entries.map((entry) =>
      entry.id === entryId && action === "like" ? { ...entry, favorite: true } : entry
    ),
    interactions: [...state.interactions, interaction]
  };
}

export function toggleRecommendationSharing(state: PrototypeState, enabled: boolean): PrototypeState {
  return {
    ...state,
    settings: {
      ...state.settings,
      recommendationSharingEnabled: enabled,
      updatedAt: new Date().toISOString()
    }
  };
}

export function setEntryVisibility(
  state: PrototypeState,
  entryId: string,
  visibility: EntryVisibility
): PrototypeState {
  return {
    ...state,
    entries: state.entries.map((entry) => (entry.id === entryId ? { ...entry, visibility } : entry))
  };
}

function cloneEntries(entries: PlantEntry[]): PlantEntry[] {
  return entries.map((entry) => ({
    ...entry,
    tags: [...entry.tags],
    generationHistory: entry.generationHistory.map((generation) => ({ ...generation }))
  }));
}
