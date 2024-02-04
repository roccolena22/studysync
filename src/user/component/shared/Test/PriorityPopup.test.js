import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PriorityPopup from "../PriorityPopup";

test("renders PriorityPopup component", () => {
    render(<PriorityPopup />);
    
    const popupElement = screen.getByTestId("priority-popup-container");
    const backgroundElement = screen.getByTestId("priority-popup-bg");
  
    expect(popupElement).toBeInTheDocument();
    expect(popupElement).toHaveClass("bg-gray-50 rounded-lg px-4 w-5/6 lg:w-2/3 h-5/6 overflow-y-auto")
    expect(popupElement.tagName).toBe("DIV");
    expect(popupElement.parentElement.tagName).toBe("DIV");
  
    expect(backgroundElement).toBeInTheDocument();
    expect(backgroundElement).toHaveClass("fixed top-0 right-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20 z-[100]");
  });
  
  test("renders PriorityPopup with title", () => {
    render(<PriorityPopup title="Users list" />);
    
    const textElement = screen.getByText("Users list");
  
    expect(textElement).toBeInTheDocument();
    expect(textElement.parentElement.tagName).toBe("DIV");
    });
  
  test("does not render title when not provided", () => {
    render(<PriorityPopup />);
    
    const titleElement = screen.queryByTestId("title");
  
    expect(titleElement).not.toBeInTheDocument();
  });