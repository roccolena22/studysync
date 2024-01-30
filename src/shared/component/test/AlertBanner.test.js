import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import AlertBanner from "../AlertBanner";

test("renders with specific text and success type", () => {
  render(<AlertBanner text="Change made successfully" type="success" />);

  const element = screen.getByText("Change made successfully");

  expect(element).toBeInTheDocument();
  expect(element).toHaveClass("text-center");
  expect(element.closest("div")).toHaveClass("border-green-600");
  expect(element.closest("div")).toHaveClass("bg-green-100");
});

test("renders with specific text and alert type", () => {
  render(<AlertBanner text="Alert message" type="alert" />);

  const element = screen.getByText("Alert message");

  expect(element).toBeInTheDocument();
  expect(element).toHaveClass("text-center");
  expect(element.closest("div")).toHaveClass("border-yellow-600");
  expect(element.closest("div")).toHaveClass("bg-yellow-100");
});

test("does not render after timeout", async () => {
  act(() => {
    render(<AlertBanner text="Message" type="success" />);
  });

  const element = screen.getByText("Message");

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });

  expect(element).not.toBeInTheDocument();
});
