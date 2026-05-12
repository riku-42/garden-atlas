import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
import {
  createPrototypeState,
  getRecommendationQueue,
  recordRecommendationInteraction,
  setEntryVisibility,
  toggleRecommendationSharing
} from "@garden-atlas/shared";
import type {
  EntryVisibility,
  PlantEntry,
  PrototypeState,
  RecommendationInteraction,
  UserRecommendationSettings
} from "@garden-atlas/shared";

type PrototypeContextValue = {
  entries: PlantEntry[];
  interactions: RecommendationInteraction[];
  recommendationQueue: PlantEntry[];
  settings: UserRecommendationSettings;
  recordInteraction: (entryId: string, action: RecommendationInteraction["action"]) => void;
  reset: () => void;
  setSharing: (enabled: boolean) => void;
  updateVisibility: (entryId: string, visibility: EntryVisibility) => void;
};

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PrototypeState>(() => createPrototypeState());

  const value = useMemo<PrototypeContextValue>(
    () => ({
      entries: state.entries,
      interactions: state.interactions,
      recommendationQueue: getRecommendationQueue(state),
      settings: state.settings,
      recordInteraction: (entryId, action) => {
        setState((current) => recordRecommendationInteraction(current, entryId, action));
      },
      reset: () => {
        setState(createPrototypeState());
      },
      setSharing: (enabled) => {
        setState((current) => toggleRecommendationSharing(current, enabled));
      },
      updateVisibility: (entryId, visibility) => {
        setState((current) => setEntryVisibility(current, entryId, visibility));
      }
    }),
    [state]
  );

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototypeStore() {
  const context = useContext(PrototypeContext);

  if (!context) {
    throw new Error("usePrototypeStore must be used inside PrototypeProvider");
  }

  return context;
}
