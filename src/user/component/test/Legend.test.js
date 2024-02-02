import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Legend from "../Legend";

const colorOne = "bg-blue-500";
const colorTwo = "bg-green-500";
const textOne = "Category One";
const textTwo = "Category Two";

test("renders Legend component with correct colors and texts", () => {
  render(
    <Legend
      colorOne={colorOne}
      colorTwo={colorTwo}
      textOne={textOne}
      textTwo={textTwo}
    />
  );

  const colorOneElement = screen.getByTestId("color-one");
  expect(colorOneElement).toHaveClass("w-4 h-4 rounded-2xl mr-2", colorOne);

  const colorTwoElement = screen.getByTestId("color-two");
  expect(colorTwoElement).toHaveClass("w-4 h-4 rounded-2xl mr-2", colorTwo);

  const textOneElement = screen.getByText(textOne);
  expect(textOneElement).toHaveClass("text-sm md:text-lg");

  const textTwoElement = screen.getByText(textTwo);
  expect(textTwoElement).toHaveClass("text-sm md:text-lg");

  expect(colorOneElement).toBeInTheDocument();
  expect(colorTwoElement).toBeInTheDocument();
  expect(textOneElement).toBeInTheDocument();
  expect(textTwoElement).toBeInTheDocument();
});

test("renders Legend component with correct element types", () => {
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
