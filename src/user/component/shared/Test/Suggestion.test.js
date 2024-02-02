import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Suggestion from "../Suggestion";

test("renders Suggestion component with provided text", () => {
  const textProps = "Test text";
  render(<Suggestion text={textProps} />);

  const suggestionElement = screen.getByText(textProps);
  expect(suggestionElement).toBeInTheDocument();
  expect(suggestionElement.tagName).toBe("SPAN");
  expect(suggestionElement.parentElement.tagName).toBe("DIV");
  expect(suggestionElement).toHaveTextContent(textProps)
});

