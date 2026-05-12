import { useEffect, useMemo, useState } from "react";
import {
  createPrototypeState,
  getRecommendationQueue,
  recordRecommendationInteraction,
  setEntryVisibility,
  toggleRecommendationSharing,
  type EntryVisibility,
  type PlantEntry,
  type PrototypeState,
  type RecommendationInteraction
} from "@garden-atlas/shared";

const STORAGE_KEY = "garden-atlas.prototype-state";

export function usePrototypeStore() {
  const [state, setState] = useState<PrototypeState>(() => readState());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const recommendationQueue = useMemo(() => getRecommendationQueue(state), [state]);

  function recordInteraction(entryId: string, action: RecommendationInteraction["action"]) {
    setState((current) => recordRecommendationInteraction(current, entryId, action));
  }

  function setSharing(enabled: boolean) {
    setState((current) => toggleRecommendationSharing(current, enabled));
  }

  function updateVisibility(entryId: string, visibility: EntryVisibility) {
    setState((current) => setEntryVisibility(current, entryId, visibility));
  }

  function reset() {
    setState(createPrototypeState());
  }

  return {
    entries: state.entries,
    interactions: state.interactions,
    recommendationQueue,
    recordInteraction,
    reset,
    settings: state.settings,
    setSharing,
    updateVisibility
  };
}

function readState(): PrototypeState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createPrototypeState();
    }

    const parsed = JSON.parse(raw) as PrototypeState;
    return createPrototypeState(parsed);
  } catch {
    return createPrototypeState();
  }
}
