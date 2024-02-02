import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Gadget from "../Gadget";

test("renders Gadget component with title, value, and children", () => {
  const title = "Sample Title";
  const value = "42";
  const childText = "This is a child component";

  render(
    <Gadget title={title} value={value}>
      <div>{childText}</div>
    </Gadget>
  );

  const titleElement = screen.getByText(title);
  const valueElement = screen.getByText(value);
  const childElement = screen.getByText(childText);

  expect(titleElement).toBeInTheDocument();
  expect(valueElement).toBeInTheDocument();
  expect(childElement).toBeInTheDocument();
});

test("renders Gadget component with proper styling", () => {
  const title = "Sample Title";
  const value = "42";

  render(<Gadget title={title} value={value} />);

  const gadgetContainer = screen.getByTestId("gadget-container");
  expect(gadgetContainer.tagName).toBe("DIV");
  expect(gadgetContainer).toHaveTextContent(title);

  expect(gadgetContainer).toHaveClass("w-full");
  expect(gadgetContainer).toHaveClass("bg-white");
  expect(gadgetContainer).toHaveClass("p-3");
  expect(gadgetContainer).toHaveClass("rounded-lg");
  expect(gadgetContainer).toHaveClass("shadow-xl");
  expect(gadgetContainer).toHaveClass("flex");
  expect(gadgetContainer).toHaveClass("justify-between");
  expect(gadgetContainer).toHaveClass("items-center");
  expect(gadgetContainer).toHaveClass("space-x-1");
});

test("renders Gadget component with correct element types", () => {
  const title = "Sample Title";
  const value = "42";

  render(<Gadget title={title} value={value} />);

  const gadgetContainer = screen.getByTestId("gadget-container");
  const titleElement = screen.getByText(title);
  const valueElement = screen.getByText(value);

  expect(gadgetContainer.tagName).toBe("DIV");
  expect(titleElement.tagName).toBe("SPAN");
  expect(valueElement.tagName).toBe("SPAN");
});
