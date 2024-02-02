import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PriorityPopup from "../PriorityPopup";

test("renders PriorityPopup component", () => {
    render(<PriorityPopup />);
    
    const popupElement = screen.getByTestId("popup-container");
    const backgroundElement = screen.getByTestId("background");
  
    expect(popupElement).toBeInTheDocument();
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
  
//   test("closes PriorityPopup on close button click", () => {
//     const handleClose = jest.fn();
//     render(<PriorityPopup handleClose={handleClose} />);
    
//     const iconClose = screen.getByTestId("icon-close");
//     iconClose.click();
  
//     expect(handleClose).toHaveBeenCalledTimes(1);
//   });
  
  test("does not render title when not provided", () => {
    render(<PriorityPopup />);
    
    const titleElement = screen.queryByTestId("title");
  
    expect(titleElement).not.toBeInTheDocument();
  });