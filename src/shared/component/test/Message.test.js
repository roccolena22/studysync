import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "../Message";

test("render Message component", () => {
  render(<Message text="No user to show" />);
  const messageItem = screen.getByText("No user to show");
  expect(messageItem).toBeInTheDocument();
  expect(messageItem).toHaveTextContent("No user to show");
  expect(messageItem).toHaveClass("text-md w-full text-center");
  expect(messageItem).toHaveClass("text-gray-600");
  expect(messageItem.tagName).toBe("P");
});

test("render Message component", () => {
    render(<Message text="No user to show" type="error"/>);
    const messageItem = screen.getByText("No user to show");
    expect(messageItem).toBeInTheDocument();
    expect(messageItem).toHaveTextContent("No user to show");
    expect(messageItem).toHaveClass("text-md w-full text-center");
    expect(messageItem).toHaveClass("text-red-600");
  });
  