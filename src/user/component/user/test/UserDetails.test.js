import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserDetails from "../UserDetails";

test("renders UserDetails component with user details", () => {
    const firstName = "John";
    const lastName = "Doe";
    const role = "Teacher";
    const email = "john.doe@example.com";
  
    render(<UserDetails firstName={firstName} lastName={lastName} role={role} email={email} />);
  
    const userDetailsElement = screen.getByTestId("user-details");
    expect(userDetailsElement).toBeInTheDocument();
  
    const badgeAndAuthorElement = screen.getByTestId("badge-and-author");
    expect(badgeAndAuthorElement).toBeInTheDocument();
  
    const fullNameElement = screen.getByText(`${firstName} ${lastName}`);
    expect(fullNameElement).toBeInTheDocument();
  
    const emailElement = screen.getByText(email);
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(email);
  });