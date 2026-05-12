import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RecommendationDeck } from "./RecommendationDeck";

describe("RecommendationDeck", () => {
  it("advances to the next recommendable plant after like", async () => {
    render(<RecommendationDeck onOpenEntry={vi.fn()} />);

    expect(screen.getByText("山茶")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "喜欢" }));
    expect(await screen.findByText("绣球花")).toBeInTheDocument();
  });
});
