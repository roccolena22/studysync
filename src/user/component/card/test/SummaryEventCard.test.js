import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryEventCard from "../SummaryEventCard";

const mockEvent = {
  id: "testEventId",
  title: "Test Event",
  location: "Test Location",
  startTime: "10:00",
  endTime: "12:00",
  mode: "In person",
  places: "10",
  startDate: "2024-04-07",
  endDate: "2024-04-07",
  authorId: "testAuthorId",
  lastName: "Doe",
  firstName: "John",
  email: "john.doe@example.com",
  role: "student",
};

test("renders SummaryEventCard with correct userBody and eventDetails", () => {
  render(<SummaryEventCard event={mockEvent} />);

  const summaryEventCardContainer = screen.getByTestId("summary-event-Card");
  expect(summaryEventCardContainer).toBeInTheDocument();
  expect(summaryEventCardContainer).toHaveClass("border-b border-gray-400");

  expect(screen.getByTestId("user-details")).toBeInTheDocument();
  expect(screen.getByTestId("body-card")).toBeInTheDocument();
});
