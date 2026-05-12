import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the Garden Atlas brand", () => {
    render(<App />);

    expect(screen.getByText("花园图鉴")).toBeInTheDocument();
  });
});
