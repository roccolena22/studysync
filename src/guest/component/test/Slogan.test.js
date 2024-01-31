import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Slogan from "../Slogan";

test("renders Slogan component with correct content", () => {
  const firstPart = "Hello";
  const highlightedPart = "World";
  const secondPart = "!";

  render(
    <Slogan
      firstPart={firstPart}
      highlightedPart={highlightedPart}
      secondPart={secondPart}
    />
  );

  const sloganElement = screen.getByTestId("slogan");

  expect(sloganElement).toBeInTheDocument();

  expect(sloganElement).toHaveClass(
    "text-2xl",
    "font-semibold",
    "italic",
    "text-center",
    "text-white",
    "pb-20"
  );

  expect(sloganElement).toHaveTextContent("HelloWorld!");
});
