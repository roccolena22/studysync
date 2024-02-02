import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "../Message";

test("renders Message component with error type", () => {
  const text = "This is an error message";
  const type = "error";

  render(<Message text={text} type={type} />);

  const messageElement = screen.getByText(text);
  expect(messageElement).toBeInTheDocument();
  expect(messageElement).toHaveClass("text-sm w-full text-center text-red-600");
  expect(messageElement).toHaveTextContent(text);
  expect(messageElement.tagName).toBe("P");
});

test("renders Message component with highlighted type", () => {
  const text = "This is a highlighted message";
  const type = "highlighted";

  render(<Message text={text} type={type} />);

  const messageElement = screen.getByText(text);
  expect(messageElement).toBeInTheDocument();
  expect(messageElement).toHaveClass("text-sm w-full text-center text-cyan-700");
  expect(messageElement).toHaveTextContent(text);
  expect(messageElement.tagName).toBe("P");
});

test("renders Message component with default type", () => {
  const text = "This is a default message";
  const type = "unknownType";

  render(<Message text={text} type={type} />);

  const messageElement = screen.getByText(text);
  expect(messageElement).toBeInTheDocument();
  expect(messageElement).toHaveClass("text-sm w-full text-center text-gray-600");
  expect(messageElement).toHaveTextContent(text);
  expect(messageElement.tagName).toBe("P");
});