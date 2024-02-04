import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SecondaryPopup from "../SecondaryPopup";

test("renders PriorityPopup component", () => {
  render(<SecondaryPopup />);

  const popupElement = screen.getByTestId("secondary-popup-container");
  const backgroundElement = screen.getByTestId("secondary-popup-bg");

  expect(popupElement).toBeInTheDocument();
  expect(popupElement.tagName).toBe("DIV");
  expect(popupElement).toHaveClass("w-full");

  expect(popupElement.parentElement.tagName).toBe("DIV");

  expect(backgroundElement).toBeInTheDocument();
  expect(backgroundElement).toHaveClass(
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit flex flex-col justify-center items-center bg-gray-100 z-[100] border border-cyan-700 rounded-lg shadow-xl"
  );
});

test("renders PriorityPopup with title", () => {
  render(<SecondaryPopup title="Users list" />);

  const textElement = screen.getByText("Users list");

  expect(textElement).toBeInTheDocument();
  expect(textElement.parentElement.tagName).toBe("DIV");
});

test("does not render title when not provided", () => {
  render(<SecondaryPopup />);

  const titleElement = screen.queryByTestId("title");

  expect(titleElement).not.toBeInTheDocument();
});
