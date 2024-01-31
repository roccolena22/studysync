import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

test("renders Button component with default props", () => {
  render(<Button name="Click me" />);
  const buttonElement = screen.getByRole("button", { name: /Click me/i });

  expect(buttonElement).toHaveClass("py-1");
  expect(buttonElement).toHaveClass("rounded-lg");
  expect(buttonElement).toHaveClass("flex");
  expect(buttonElement).toHaveClass("justify-center");
  expect(buttonElement).toHaveClass("hover:bg-cyan-800");
  expect(buttonElement).toHaveClass("transition");
  expect(buttonElement).toHaveClass("duration-300");
  expect(buttonElement).toHaveClass("ease-in-out");
  expect(buttonElement).toHaveClass("w-32");
  expect(buttonElement).toHaveClass("text-white");
  expect(buttonElement).not.toHaveClass("w-20");
});

test("renders small Button component", () => {
  render(<Button name="Click me" small />);
  const buttonElement = screen.getByRole("button", { name: /Click me/i });

  expect(buttonElement).toHaveClass("w-20");
  expect(buttonElement).toHaveTextContent("Click me");

});


test("renders outlined Button component", () => {
  render(<Button name="Click me" outline />);
  const buttonElement = screen.getByRole("button", { name: /Click me/i });

  expect(buttonElement).toHaveClass("text-cyan-700");
  expect(buttonElement).toHaveClass("hover:border-cyan-800");
  expect(buttonElement).toHaveClass("hover:text-white");
  expect(buttonElement).toHaveClass("border");
  expect(buttonElement).toHaveClass("border-cyan-700");
  expect(buttonElement).not.toHaveClass("bg-cyan-700");
});


test("triggers onClick handler when clicked", () => {
  const onClickMock = jest.fn();
  render(<Button name="Click me" onClick={onClickMock} />);
  const buttonElement = screen.getByRole("button", { name: /Click me/i });

  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});