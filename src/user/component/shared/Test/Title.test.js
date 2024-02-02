import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Title from "../Title";

test("renders Title component with default font size", () => {
  const titleText = "Default Font Size";
  render(<Title title={titleText} />);
  const titleElement = screen.getByText(titleText);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement.tagName).toBe("P");
  expect(titleElement.parentElement.tagName).toBe("DIV");
  expect(titleElement).toHaveTextContent(titleText);
});

test("renders Title component with children", () => {
  const titleText = "Title with Children";
  render(
    <Title title={titleText}>
      <div data-testid="child-element">Child Element</div>
    </Title>
  );
  const titleElement = screen.getByText(titleText);
  const childElement = screen.getByTestId("child-element");

  expect(titleElement).toBeInTheDocument();
  expect(childElement).toBeInTheDocument();
});
