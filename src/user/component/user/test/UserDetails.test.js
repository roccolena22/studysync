import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserDetails from "../UserDetails";
import { UserRoles } from "../../../../shared/models";

test("renders UserDetails component with user details", () => {
  const firstName = "John";
  const lastName = "Doe";
  const role = UserRoles.TEACHER;
  const email = "john.doe@example.com";

  render(
    <UserDetails
      firstName={firstName}
      lastName={lastName}
      role={role}
      email={email}
    />
  );

  const userDetailsElement = screen.getByTestId("user-details");
  expect(userDetailsElement).toBeInTheDocument();
  expect(userDetailsElement).toHaveClass("flex flex-col items-start");
  expect(userDetailsElement.tagName).toBe("DIV");

  const badgeAndAuthorElement = screen.getByTestId("badge-and-author");
  expect(badgeAndAuthorElement).toBeInTheDocument();

  const fullNameElement = screen.getByText(`${firstName} ${lastName}`);
  expect(fullNameElement).toBeInTheDocument();

  const emailElement = screen.getByText(email);
  expect(emailElement).toBeInTheDocument();
  expect(emailElement).toHaveTextContent(email);
  expect(emailElement.tagName).toBe("P");
  expect(emailElement.parentElement.tagName).toBe("DIV");
  expect(emailElement).toHaveClass("text-xs pb-1");
});
