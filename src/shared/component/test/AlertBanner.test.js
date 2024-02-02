import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import AlertBanner from "../AlertBanner";

test("renders with specific text and success type", () => {
  render(<AlertBanner text="Change made successfully" type="success" />);

  const textElement = screen.getByText("Change made successfully");

  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-center");
  expect(textElement.closest("div")).toHaveClass("border-green-600");
  expect(textElement.closest("div")).toHaveClass("bg-green-100");
  expect(textElement.tagName).toBe("P");
  expect(textElement.parentElement.tagName).toBe("DIV");
});

test("renders with specific text and alert type", () => {
  render(<AlertBanner text="Alert message" type="alert" />);

  const textElement = screen.getByText("Alert message");

  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-center");
  expect(textElement.closest("div")).toHaveClass("border-yellow-600");
  expect(textElement.closest("div")).toHaveClass("bg-yellow-100");
});

test("does not render after timeout", async () => {
  act(() => {
    render(<AlertBanner text="Message" type="success" />);
  });

  const textElement = screen.getByText("Message");

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });

  expect(textElement).not.toBeInTheDocument();
});
