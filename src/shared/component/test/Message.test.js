import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "../Message";
import { MessageTypes } from "../../models";

test("renders Message component with error type", () => {
  const text = "This is an error message";
  const type = MessageTypes.ERROR;

  render(<Message text={text} type={type} />);

  const textElement = screen.getByText(text);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-sm text-red-600");
  expect(textElement).toHaveTextContent(text);
  expect(textElement.tagName).toBe("P");
});

test("renders Message component with highlighted type", () => {
  const text = "This is a highlighted message";
  const type = "highlighted";

  render(<Message text={text} type={type} />);

  const textElement = screen.getByText(text);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-sm text-cyan-700");
  expect(textElement).toHaveTextContent(text);
  expect(textElement.tagName).toBe("P");
});

test("renders Message component with default type", () => {
  const text = "This is a default message";
  const type = "unknownType";

  render(<Message text={text} type={type} />);

  const textElement = screen.getByText(text);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-sm text-gray-600");
  expect(textElement).toHaveTextContent(text);
  expect(textElement.tagName).toBe("P");
});

test("renders Message without type", () => {
  const text = "This is an error message";

  render(<Message text={text} />);

  const textElement = screen.getByText(text);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-sm text-gray-600");
  expect(textElement).toHaveTextContent(text);
  expect(textElement.tagName).toBe("P");
});

test("renders Message without text and without iconName", () => {
  render(<Message />);

  const textElement = screen.queryByText(/This is a default message/i);

  expect(textElement).not.toBeInTheDocument();
});

test("renders Message with icon", () => {
  render(<Message iconName="close" iconStyle="text-red-500" />);

  const iconElement = screen.getByTestId("icon");

  expect(iconElement).toBeInTheDocument();
});