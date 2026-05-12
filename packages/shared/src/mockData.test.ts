import { describe, expect, it } from "vitest";
import { getRecommendableEntries, mockEntries } from "./mockData";

describe("mockData", () => {
  it("only exposes opt-in entries for recommendations", () => {
    const recommendations = getRecommendableEntries(mockEntries);

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.every((entry) => entry.visibility === "recommendable")).toBe(true);
    expect(recommendations.every((entry) => entry.publicLocationLabel !== null)).toBe(true);
  });
});
