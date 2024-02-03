import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "../Input";

test("renders Input component with Label and Placeholder", () => {
  render(<Input label="Username" placeholder="Enter your username" />);
  expect(screen.getByText("Username:")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Enter your username")
  ).toBeInTheDocument();
  const inputContainer = screen.getByRole("textbox").parentElement;

  expect(inputContainer).toHaveClass(
    "flex",
    "items-center",
    "border",
    "border-gray-400",
    "rounded-lg",
    "px-3",
    "py-2",
    "w-full",
    "bg-white"
  );
  expect(inputContainer.tagName).toBe("DIV");
});

test("renders input with error message", () => {
  render(<Input errorMessage="Username is required" />);

  expect(screen.getByText("Username is required")).toBeInTheDocument();
  const inputContainer = screen.getByRole("textbox").parentElement;

  expect(inputContainer).toHaveClass(
    "flex",
    "items-center",
    "border",
    "border-gray-400",
    "rounded-lg",
    "px-3",
    "py-2",
    "w-full",
    "bg-white"
  );
  expect(inputContainer.tagName).toBe("DIV");
});

test("renders Input component with Label, Placeholder, and Children", () => {
  render(
    <Input label="Password" placeholder="Enter your password">
      <button>Toggle Password</button>
    </Input>
  );

  expect(screen.getByText("Password:")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Enter your password")
  ).toBeInTheDocument();
  expect(screen.getByText("Toggle Password")).toBeInTheDocument();
  const inputContainer = screen.getByRole("textbox").parentElement;

  expect(inputContainer).toHaveClass(
    "flex",
    "items-center",
    "border",
    "border-gray-400",
    "rounded-lg",
    "px-3",
    "py-2",
    "w-full",
    "bg-white"
  );
  expect(inputContainer.tagName).toBe("DIV");
});

test("applies default styles to the input container", () => {
  render(<Input />);

  const inputContainer = screen.getByRole("textbox").parentElement;
  expect(inputContainer).toHaveClass(
    "flex",
    "items-center",
    "border",
    "border-gray-400",
    "rounded-lg",
    "px-3",
    "py-2",
    "w-full",
    "bg-white"
  );
  expect(inputContainer.tagName).toBe("DIV");
});

test("applies error styles to the error message", () => {
  render(<Input errorMessage="Invalid input" />);

  const errorMessage = screen.getByText("Invalid input");
  expect(errorMessage).toHaveClass("text-red-500");
  const inputContainer = screen.getByRole("textbox").parentElement;

  expect(inputContainer).toHaveClass(
    "flex",
    "items-center",
    "border",
    "border-gray-400",
    "rounded-lg",
    "px-3",
    "py-2",
    "w-full",
    "bg-white"
  );
  expect(inputContainer.tagName).toBe("DIV");
});
