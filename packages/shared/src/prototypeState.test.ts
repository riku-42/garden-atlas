import { describe, expect, it } from "vitest";
import { mockEntries, recommendationSettings } from "./mockData";
import {
  addCapturedEntry,
  createPrototypeState,
  getPlantEntry,
  getRecommendationQueue,
  recordRecommendationInteraction,
  setEntryVisibility,
  toggleRecommendationSharing
} from "./prototypeState";

describe("prototypeState", () => {
  it("keeps recommendations private by default and exposes only recommendable entries", () => {
    const state = createPrototypeState();
    const queue = getRecommendationQueue(state);

    expect(state.settings.recommendationSharingEnabled).toBe(false);
    expect(queue.length).toBeGreaterThan(0);
    expect(queue.every((entry) => entry.visibility === "recommendable")).toBe(true);
  });

  it("records like interactions and marks liked entries as favorites", () => {
    const state = createPrototypeState({ entries: mockEntries, settings: recommendationSettings });
    const next = recordRecommendationInteraction(state, "entry_hydrangea", "like");

    expect(next.interactions).toHaveLength(1);
    expect(next.interactions[0]).toMatchObject({ entryId: "entry_hydrangea", action: "like" });
    expect(next.entries.find((entry) => entry.id === "entry_hydrangea")?.favorite).toBe(true);
  });

  it("falls back to an infinite queue after all public cards have been swiped", () => {
    const state = createPrototypeState();
    const recommendableIds = getRecommendationQueue(state).map((entry) => entry.id);
    const exhausted = recommendableIds.reduce(
      (current, entryId) => recordRecommendationInteraction(current, entryId, "pass"),
      state
    );

    expect(getRecommendationQueue(exhausted).map((entry) => entry.id)).toEqual(recommendableIds);
  });

  it("updates sharing settings and per-entry visibility", () => {
    const state = createPrototypeState();
    const sharingEnabled = toggleRecommendationSharing(state, true);
    const updated = setEntryVisibility(sharingEnabled, "entry_rose", "recommendable");

    expect(updated.settings.recommendationSharingEnabled).toBe(true);
    expect(updated.entries.find((entry) => entry.id === "entry_rose")?.visibility).toBe("recommendable");
  });

  it("adds a captured generated entry as a private gallery item", () => {
    const state = createPrototypeState();
    const result = addCapturedEntry(state, {
      id: "entry_new_capture",
      capturedAt: "2026-05-13T09:00:00.000Z",
      locationName: "Shanghai Riverside",
      notes: "A white flower found during a walk.",
      now: "2026-05-13T09:00:05.000Z",
      sourceEntryId: "entry_camellia",
      styleMode: "modern_editorial"
    });
    const entry = getPlantEntry(result.state, result.entryId);

    expect(result.entryId).toBe("entry_new_capture");
    expect(result.state.entries[0].id).toBe("entry_new_capture");
    expect(entry).toMatchObject({
      commonName: "山茶",
      locationName: "Shanghai Riverside",
      notes: "A white flower found during a walk.",
      styleMode: "modern_editorial",
      visibility: "private",
      favorite: false
    });
    expect(entry?.generationHistory[0]).toMatchObject({
      entryId: "entry_new_capture",
      status: "succeeded",
      styleMode: "modern_editorial"
    });
  });
});
