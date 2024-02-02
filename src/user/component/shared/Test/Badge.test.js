import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Badge from "../Badge";

test("renders Badge component with default color for unknown text", () => {
  render(<Badge text="unknown" />);
  const badgeElement = screen.getByText("UNKNOWN");
  expect(badgeElement).toBeInTheDocument();
  expect(badgeElement).toHaveTextContent("UNKNOWN");
});

test("renders Badge component with correct color for 't' text", () => {
  render(<Badge text="t" />);
  const badgeElement = screen.getByText("T");
  expect(badgeElement).toBeInTheDocument();
  expect(badgeElement).toHaveTextContent("T");
  expect(badgeElement.tagName).toBe("P");
  expect(badgeElement.parentElement.tagName).toBe("DIV");
});

test("renders Badge component with correct color for 's' text", () => {
  render(<Badge text="s" />);
  const badgeElement = screen.getByText("S");
  expect(badgeElement).toBeInTheDocument();
  expect(badgeElement).toHaveTextContent("S");
});
