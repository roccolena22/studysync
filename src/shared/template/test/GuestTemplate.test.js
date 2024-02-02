import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GuestTemplate from "../GuestTemplate";

test("renders GuestTemplate component", () => {
  render(<GuestTemplate />);

  const guestTemplateElement = screen.getByTestId("guest-template");

  expect(guestTemplateElement).toBeInTheDocument();
  expect(guestTemplateElement.tagName).toBe("DIV");

  expect(guestTemplateElement).toHaveClass(
    "bg-gradient-to-b from-cyan-700 to-gray-400 text-gray-700 w-full flex justify-center"
  );
});
