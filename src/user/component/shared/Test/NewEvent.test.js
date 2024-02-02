import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NewEvent from "../NewEvent";

test("renders NewEvent component with priority popup and alert banner", () => {
  render(<NewEvent name="Test Event" />);

  const eventNameElement = screen.getByText("Test Event");
  expect(eventNameElement).toBeInTheDocument();
  expect(eventNameElement.tagName).toBe("P");

  const priorityPopupElement = screen.queryByText("New event");
  expect(priorityPopupElement).not.toBeInTheDocument();
});
