import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GuestPageContainer from "../GuestPageContainer";

test("renders main container div with correct styling", () => {
  render(<GuestPageContainer />);

  const mainContainerDiv = screen.getByTestId("guest-container");

  expect(mainContainerDiv).toBeInTheDocument();
  expect(mainContainerDiv.tagName).toBe("DIV");

  expect(mainContainerDiv).toHaveClass(
    "min-h-screen",
    "flex",
    "items-center",
    "px-4"
  );
});

test("renders children content", () => {
  const mockChild = <div data-testid="mock-child">Mock Child</div>;

  render(<GuestPageContainer>{mockChild}</GuestPageContainer>);

  const childElement = screen.getByTestId("mock-child");
  expect(childElement.tagName).toBe("DIV");
  expect(childElement.parentElement.tagName).toBe("DIV");

  expect(childElement).toBeInTheDocument();
  expect(childElement).toHaveTextContent("Mock Child");
  expect(childElement.parentElement).toHaveClass(
    "bg-white px-8 py-2 rounded-lg shadow-md z-10"
  );
});
