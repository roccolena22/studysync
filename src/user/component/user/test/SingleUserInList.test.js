import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SingleUserInList from "../SingleUserInList";

const mockStore = configureStore();

const mockUser = {
  role: "student",
  lastName: "Vallario",
  firstName: "Walter",
  email: "walter.g@virgilio.it",
  password: "$2a$10$P7RKU8Uqbh5IUwuE1WQpPOZAZR2dqLvDUdV62zBvbvv54me8DYVUu",
  id: "recDVoxuyPQy0pGFu",
};

test("renders SingleUserInList with userDetails and FollowAndUnfollowButtons ", () => {
  const initialState = {
    auth: {
      user: { id: "mockUserId" },
    },
    followers: [],
  };

  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <SingleUserInList user={mockUser} />
    </Provider>
  );

  const singleUserInListContainer = screen.getByTestId("single-user-in-list");
  expect(singleUserInListContainer).toBeInTheDocument();
  expect(singleUserInListContainer).toHaveClass(
    "flex justify-between items-center border-b border-gray-400 w-full py-1"
  );

  expect(screen.getByTestId("user-details")).toBeInTheDocument();
  expect(screen.getByTestId("follow-and-unfollow-buttons")).toBeInTheDocument();
});
