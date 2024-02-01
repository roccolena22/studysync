import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Suggestion from "../Suggestion";

test("renders Suggestion component with provided text", () => {
  const textProps = "Test text";
  render(<Suggestion text={textProps} />);

  const suggestionElement = screen.getByText(textProps);
  expect(suggestionElement).toBeInTheDocument();
});

test("renders Suggestion component with Icon", () => {
  const textProps = "Test text";
  render(<Suggestion text={textProps} />);

  const iconElement = screen.getByTestId("icon-element");
  expect(iconElement).toBeInTheDocument();
});

test("renders Suggestion component with correct styling", () => {
  const textProps = "Test text";
  render(<Suggestion text={textProps} />);

  const suggestionElement = screen.getByText(textProps);

  expect(suggestionElement).toHaveClass(
    "flex",
    "items-start",
    "space-x-1",
    "w-full",
    "py-4",
    "text-xs"
  );
});
