import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ItemCard from "../ItemCard";

test("renders ItemCard component with label and text", () => {
    const label = "Example Label";
    const text = "Example Text";
  
    render(<ItemCard label={label} text={text} />);
  
    const labelElement = screen.getByText(label);
    const textElement = screen.getByText(text);
  
    expect(labelElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
  
  test("renders ItemCard component with label and link", () => {
    const label = "Example Label";
    const link = "https://example.com";
  
    render(<ItemCard label={label} link={link} />);
  
    const labelElement = screen.getByText(label);
    const linkElement = screen.getByRole("link");
  
    expect(labelElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", link);
  });