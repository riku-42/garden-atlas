import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getRecommendableEntries } from "@garden-atlas/shared";
import { RecommendationDeck } from "./RecommendationDeck";

describe("RecommendationDeck", () => {
  it("advances to the next recommendable plant after like", async () => {
    render(
      <RecommendationDeck
        entries={getRecommendableEntries()}
        interactionsCount={0}
        onInteract={vi.fn()}
        onOpenEntry={vi.fn()}
      />
    );

    expect(screen.getByText("山茶")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "喜欢" }));
    expect(await screen.findByText("绣球花")).toBeInTheDocument();
  });

  it("records the liked card when advancing", async () => {
    const onInteract = vi.fn();
    render(
      <RecommendationDeck
        entries={getRecommendableEntries()}
        interactionsCount={0}
        onInteract={onInteract}
        onOpenEntry={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "喜欢" }));

    await waitFor(() => {
      expect(onInteract).toHaveBeenCalledWith("entry_camellia", "like");
    });
  });
});
