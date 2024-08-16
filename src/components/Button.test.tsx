// src/components/Button.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import { describe, it, expect, vi } from "vitest";

describe("Button Component", () => {
  it("should render with the correct label", () => {
    const { getByText } = render(
      <Button label="Click Me" onClick={() => {}} />
    );
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("should call onClick handler when clicked", () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button label="Click Me" onClick={handleClick} />
    );
    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
