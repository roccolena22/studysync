import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TitleAndAuthorName from "../TitleAndAuthorName";

test("renders component with title props", () => {
  const title = "Event 1";
  render(<TitleAndAuthorName title={title} />);
  const titleElement = screen.getByText(`- ${title}`);
  expect(titleElement).toBeInTheDocument();
  expect(titleElement.tagName).toBe("SPAN");
  expect(titleElement).toHaveTextContent(`- ${title}`);
  expect(titleElement.parentElement.tagName).toBe("DIV");
  expect(titleElement).toHaveClass("font-semibold");
  expect(titleElement.parentElement).toHaveClass(
    "flex justify-between w-full px-6"
  );
});

test("renders component with title and author props", () => {
  const title = "Event 1";
  const firstName = "Roberto";
  const lastName = "Brandi";
  render(
    <TitleAndAuthorName
      title={title}
      firstName={firstName}
      lastName={lastName}
    />
  );

  const titleElement = screen.getByText(`- ${title}`);
  expect(titleElement).toBeInTheDocument();
  expect(titleElement.tagName).toBe("SPAN");
  expect(titleElement).toHaveTextContent(`- ${title}`);
  expect(titleElement.parentElement.tagName).toBe("DIV");
  expect(titleElement).toHaveClass("font-semibold");
  expect(titleElement.parentElement).toHaveClass(
    "flex justify-between w-full px-6"
  );

  const authorElement = screen.getByTestId("badge-and-author");
  expect(authorElement).toBeInTheDocument();
  expect(authorElement.tagName).toBe("DIV");
});

test("renders component without props", () => {
  render(<TitleAndAuthorName />);
  const containerElement = screen.getByTestId("badge-and-author");
  expect(containerElement).toBeInTheDocument();
  expect(containerElement.tagName).toBe("DIV");
});
