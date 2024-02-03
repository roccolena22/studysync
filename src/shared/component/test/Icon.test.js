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
      color="red-500"
      onClick={mockOnClick}
    />
  );

  const iconElement = screen.getByTestId("icon-search");

  expect(iconElement).toBeInTheDocument();

  expect(iconElement).toHaveClass("custom-style");

  expect(iconElement).toHaveClass("text-red-500");

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

test("redirect warning icon when name is wrong", () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  render(<Icon name="searcdwh" style="custom-style" color="yellow" />);

  const iconElement = screen.getByTestId("icon-error");

  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveClass("text-red-500");

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining('Icon "searcdwh" not found in the mapping.')
  );

  consoleErrorSpy.mockRestore();
});
