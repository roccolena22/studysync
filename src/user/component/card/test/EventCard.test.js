import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EventCard from "../EventCard";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockStore = configureStore();

const event = {
  id: "recTxIpxMA5va6lRF",
  title: "Ripasso Informatica II",
  location: "Aula F3",
  startTime: "14:30",
  endTime: "16:30",
  mode: "In person",
  places: "5",
  startDate: "2024-04-07",
  endDate: "2024-04-07",
  authorId: "rec2YqfJN9ahZ949c",
  lastName: "Lena",
  firstName: "Rocco",
  email: "rocco.lena@icloud.com",
  role: "student",
};

const event2 = {
  id: "recTxIpxMA5va6lRF",
  title: "Ripasso Informatica II",
  location: "Aula F3",
  startTime: "14:30",
  endTime: "16:30",
  mode: "In person",
  places: "5",
  startDate: "2024-04-07",
  endDate: "2024-04-07",
  authorId: "rec2YqfJN9ahZ949c",
  lastName: "Lena",
  firstName: "Rocco",
  email: "rocco.lena@icloud.com",
  role: "teacher",
};

const initialState = {
  bookings: [],
  users: [],
  auth: {
    user: {
      id: "rec2YqfJN9ahZ949c",
    },
  },
};

test("renders EventCard component", () => {
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <EventCard event={event} />
      </BrowserRouter>
    </Provider>
  );
  const eventCardContainer = screen.getByTestId("event-card");
  expect(eventCardContainer).toHaveClass(
    "w-full h-96 relative rounded-lg p-3 bg-gray-50 shadow-xl"
  );
  expect(eventCardContainer.tagName).toBe("DIV");
  expect(screen.getByTestId("header-card")).toBeInTheDocument();
  expect(screen.getByTestId("body-card")).toBeInTheDocument();
  expect(screen.getByTestId("footer-card")).toBeInTheDocument();
});

test("applies correct border color based on user role, teacher in this case", () => {
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <EventCard event={event2} />
      </BrowserRouter>
    </Provider>
  );

  const headerCardComponent = screen.getByTestId("header-card");
  expect(headerCardComponent.parentElement).toHaveClass("border-purple-500");
});
