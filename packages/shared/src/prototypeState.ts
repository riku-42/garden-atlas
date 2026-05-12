import { mockEntries, recommendationSettings } from "./mockData";
import type {
  EntryVisibility,
  PlantEntry,
  RecommendationInteraction,
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

export function createPrototypeState(input: CreatePrototypeStateInput = {}): PrototypeState {
  return {
    entries: cloneEntries(input.entries ?? mockEntries),
    settings: { ...(input.settings ?? recommendationSettings) },
    interactions: [...(input.interactions ?? [])]
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
