import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  addCapturedEntry,
  createPrototypeState,
  getPlantEntry,
  getRecommendationQueue,
  recordRecommendationInteraction,
  setEntryVisibility,
  toggleRecommendationSharing
} from "@garden-atlas/shared";
import type {
  AddCapturedEntryInput,
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
  addGeneratedEntry: (input?: AddCapturedEntryInput) => string;
  getEntry: (entryId: string | undefined) => PlantEntry | undefined;
  recordInteraction: (entryId: string, action: RecommendationInteraction["action"]) => void;
  reset: () => void;
  setSharing: (enabled: boolean) => void;
  updateVisibility: (entryId: string, visibility: EntryVisibility) => void;
};

const PrototypeContext = createContext<PrototypeContextValue | null>(null);
const STORAGE_KEY = "garden-atlas.prototype-state.v1";

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PrototypeState>(() => createPrototypeState());
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        const restored = restorePrototypeState(stored);
        if (isMounted && restored) {
          setState(restored);
        }
      })
      .finally(() => {
        if (isMounted) {
          setHasHydrated(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {
      // Keep the app usable if local persistence is temporarily unavailable.
    });
  }, [hasHydrated, state]);

  const value = useMemo<PrototypeContextValue>(
    () => ({
      entries: state.entries,
      interactions: state.interactions,
      recommendationQueue: getRecommendationQueue(state),
      settings: state.settings,
      addGeneratedEntry: (input = {}) => {
        const result = addCapturedEntry(state, {
          capturedAt: new Date().toISOString(),
          now: new Date().toISOString(),
          sourceEntryId: "entry_camellia",
          ...input
        });
        setState(result.state);
        return result.entryId;
      },
      getEntry: (entryId) => (entryId ? getPlantEntry(state, entryId) : undefined),
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

function restorePrototypeState(stored: string | null): PrototypeState | null {
  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<PrototypeState>;

    if (!Array.isArray(parsed.entries)) {
      return null;
    }

    return createPrototypeState({
      entries: parsed.entries,
      interactions: Array.isArray(parsed.interactions) ? parsed.interactions : [],
      settings: parsed.settings
    });
  } catch {
    return null;
  }
}

export function usePrototypeStore() {
  const context = useContext(PrototypeContext);

  if (!context) {
    throw new Error("usePrototypeStore must be used inside PrototypeProvider");
  }

  return context;
}
