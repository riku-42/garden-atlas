import { describe, expect, it } from "vitest";
import { mockEntries, recommendationSettings } from "./mockData";
import {
  createPrototypeState,
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
});
