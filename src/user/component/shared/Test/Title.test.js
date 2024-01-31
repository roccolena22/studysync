import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Title from "../Title";

test("render Title component", () => {
  render(<Title title="Test" />);
  const titleElement = screen.getByText("Test");
  expect(titleElement).toBeInTheDocument();
});
