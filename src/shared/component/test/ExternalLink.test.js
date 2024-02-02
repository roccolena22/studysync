import React from "react";
import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
import ExternalLink from "../ExternalLink";

test("renders the link passed as props", () => {
    render(<ExternalLink link="www.exmp.com" />);
    const linkElement = screen.getByText("www.exmp.com");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass("text-xs");
    expect(linkElement).toHaveClass("md:text-md");
    expect(linkElement).toHaveClass("text-cyan-700");
    expect(linkElement).toHaveClass("cursor-pointer");
    expect(linkElement).toHaveClass("underline");
    expect(linkElement.tagName).toBe("A");
  });

  test("renders the link passed as props", () => {
    render(<ExternalLink link="https://vm.googletest4jest" />);
    const linkElement = screen.getByText("https://vm.g...");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass("text-xs");
    expect(linkElement).toHaveClass("md:text-md");
    expect(linkElement).toHaveClass("text-cyan-700");
    expect(linkElement).toHaveClass("cursor-pointer");
    expect(linkElement).toHaveClass("underline");
  });
  
  