import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BadgeAndAuthorName from "../BadgeAndAuthorName";

test("render component with firstName and lastName props", () => {
  const firstName = "Roberto";
  const lastName = "Brandi";
  render(<BadgeAndAuthorName firstName={firstName} lastName={lastName} />);
  const fullName = `${firstName} ${lastName}`;

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
  const firstName = "Roberto";
  const lastName = "Brandi";
  const role = "student";
  render(
    <BadgeAndAuthorName firstName={firstName} lastName={lastName} role={role} />
  );
  const fullName = `${firstName} ${lastName}`;

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
