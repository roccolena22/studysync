import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import AlertBanner from "../AlertBanner";
import { AlertTypes } from "../../models";

test("renders with specific text and success type", () => {
  render(<AlertBanner text="Change made successfully" type={AlertTypes.SUCCESS} />);

  const textElement = screen.getByText("Change made successfully");
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-center");
  expect(textElement.closest("div")).toHaveClass("border-green-600");
  expect(textElement.closest("div")).toHaveClass("bg-green-100");
  expect(textElement.tagName).toBe("P");
  expect(textElement.parentElement.tagName).toBe("DIV");
});

test("renders with specific text and delete type", () => {
  render(<AlertBanner text="deletion successful" type={AlertTypes.ERROR} />);

  const textElement = screen.getByText("deletion successful");

  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-center");
  expect(textElement.closest("div")).toHaveClass("border-red-800");
  expect(textElement.closest("div")).toHaveClass("bg-red-200");
  expect(textElement.tagName).toBe("P");
  expect(textElement.parentElement.tagName).toBe("DIV");
});

test("renders with specific text and alert type", () => {
  render(<AlertBanner text="Alert message" type={AlertTypes.ALERT} />);

  const textElement = screen.getByText("Alert message");

  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-center");
  expect(textElement.closest("div")).toHaveClass("border-yellow-600");
  expect(textElement.closest("div")).toHaveClass("bg-yellow-100");
  expect(textElement.tagName).toBe("P");
  expect(textElement.parentElement.tagName).toBe("DIV");
});

test("renders when type is missing", () => {
  render(<AlertBanner text="Alert message" />);

  const textElement = screen.getByText("Alert message");

  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveClass("text-center");
  expect(textElement.closest("div")).toHaveClass("border-gray-600 ");
  expect(textElement.closest("div")).toHaveClass("bg-gray-100");
  expect(textElement.tagName).toBe("P");
  expect(textElement.parentElement.tagName).toBe("DIV");
});

test("renders when text is missing", () => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  render(<AlertBanner type={AlertTypes.SUCCESS} />);

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining("text is missing!")
  );
});

test("does not render after timeout", async () => {
  act(() => {
    render(<AlertBanner text="Message" type={AlertTypes.SUCCESS} />);
  });

  const textElement = screen.getByText("Message");

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });

  expect(textElement).not.toBeInTheDocument();
});
