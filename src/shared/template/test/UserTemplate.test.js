import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserTemplate from "../UserTemplate";

jest.mock("../../../user/component/navigation/Navbar.jsx", () => jest.fn());
jest.mock("../../../user/component/navigation/Footer.jsx", () => jest.fn());

test("renders UserTemplate component and applies styles", () => {
  render(
    <MemoryRouter>
      <UserTemplate />
    </MemoryRouter>
  );

  const userTemplateElement = screen.getByTestId("user-template");

  expect(userTemplateElement).toHaveClass(
    "flex",
    "flex-col",
    "min-h-screen",
    "items-center",
    "bg-gray-50",
    "text-gray-700"
  );
});
