import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Legend from "../Legend";

test("renders Legend component with correct colors and texts", () => {
  const colorOne = "bg-blue-500";
  const colorTwo = "bg-green-500";
  const textOne = "Category One";
  const textTwo = "Category Two";

  render(
    <Legend
      colorOne={colorOne}
      colorTwo={colorTwo}
      textOne={textOne}
      textTwo={textTwo}
    />
  );

  const colorOneElement = screen.getByTestId("color-one");
  const colorTwoElement = screen.getByTestId("color-two");
  const textOneElement = screen.getByText(textOne);
  const textTwoElement = screen.getByText(textTwo);

  expect(colorOneElement).toBeInTheDocument();
  expect(colorTwoElement).toBeInTheDocument();
  expect(textOneElement).toBeInTheDocument();
  expect(textTwoElement).toBeInTheDocument();

  expect(colorOneElement).toHaveClass(colorOne);
  expect(colorTwoElement).toHaveClass(colorTwo);

  // Additional test to check if the text content is correct
  expect(textOneElement.textContent).toBe(textOne);
  expect(textTwoElement.textContent).toBe(textTwo);
});

test("renders Legend component with correct element types", () => {
  const colorOne = "bg-blue-500";
  const colorTwo = "bg-green-500";
  const textOne = "Category One";
  const textTwo = "Category Two";

  render(
    <Legend
      colorOne={colorOne}
      colorTwo={colorTwo}
      textOne={textOne}
      textTwo={textTwo}
    />
  );

  const colorOneElement = screen.getByTestId("color-one");
  const colorTwoElement = screen.getByTestId("color-two");
  const textOneElement = screen.getByText(textOne);
  const textTwoElement = screen.getByText(textTwo);

  expect(colorOneElement.tagName).toBe("DIV");
  expect(colorTwoElement.tagName).toBe("DIV");
  expect(textOneElement.tagName).toBe("SPAN");
  expect(textTwoElement.tagName).toBe("SPAN");
});
