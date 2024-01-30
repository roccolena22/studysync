import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Icon from "../Icon";

test("renders Icon component with specified name", () => {
  const mockOnClick = jest.fn();

  render(
    <Icon
      name="search"
      style="custom-style"
      color="red"
      onClick={mockOnClick}
    />
  );

  const iconElement = screen.getByTestId("icon-search");

  expect(iconElement).toBeInTheDocument();

  expect(iconElement).toHaveClass("custom-style");

  expect(iconElement).toHaveClass("text-red");

  fireEvent.click(iconElement);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test("renders Icon component with default color", () => {
  const mockOnClick = jest.fn();

  render(<Icon name="menu" onClick={mockOnClick} />);

  const iconElement = screen.getByTestId("icon-menu");

  expect(iconElement).toBeInTheDocument();

  expect(iconElement).toHaveClass("text-cyan-700");

  fireEvent.click(iconElement);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
