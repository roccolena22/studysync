import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BadgeAndAuthorName from "../BadgeAndAuthorName";

test("render component with fullName props", () => {
  const fullName = "Roberto Brandi";
  render(<BadgeAndAuthorName fullName={fullName} />);
  const fullNameElement = screen.getByText(fullName);
  expect(fullNameElement).toBeInTheDocument();
  expect(fullNameElement.tagName).toBe("P");
  expect(fullNameElement).toHaveTextContent(fullName);
  expect(fullNameElement.parentElement.tagName).toBe("DIV");
  expect(fullNameElement.parentElement).toHaveClass(
    "flex space-x-1 items-center"
  );
});

test("render component with role props", () => {
  const role = "student";
  render(<BadgeAndAuthorName role={role} />);
  const roleElement = screen.getByTestId("badge");
  expect(roleElement).toBeInTheDocument();

  expect(roleElement.parentElement.tagName).toBe("DIV");
  expect(roleElement.parentElement).toHaveClass("flex space-x-1 items-center");
});

test("render component with fullName and role props", () => {
  const fullName = "Roberto Brandi";
  const role = "student";
  render(<BadgeAndAuthorName fullName={fullName} role={role} />);
  const fullNameElement = screen.getByText(fullName);
  expect(fullNameElement).toBeInTheDocument();
  expect(fullNameElement.tagName).toBe("P");
  expect(fullNameElement).toHaveTextContent(fullName);
  expect(fullNameElement.parentElement.tagName).toBe("DIV");
  expect(fullNameElement.parentElement).toHaveClass(
    "flex space-x-1 items-center"
  );
  const roleElement = screen.getByTestId("badge");
  expect(roleElement).toBeInTheDocument();
});

test("render component without props", () => {
  render(<BadgeAndAuthorName />);
  const containerElement = screen.getByTestId("badge-and-author");
  expect(containerElement).toHaveClass("flex space-x-1 items-center");
});
