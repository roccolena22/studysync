import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventItem from "../EventItem";

  test('renders label correctly', () => {
    const label = 'Event Label';
    render(<EventItem label={label} />);
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders text correctly', () => {
    const text = 'Event Description';
    render(<EventItem label="Label" text={text} />);
    const textElement = screen.getByText(text);
    expect(textElement).toBeInTheDocument();
  });

  test('renders link correctly', () => {
    const link = 'https://example.com';
    render(<EventItem label="Label" link={link} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', link);
  });

  test('does not render link when link prop is not provided', () => {
    render(<EventItem label="Label" />);
    const linkElement = screen.queryByRole('link');
    expect(linkElement).toBeNull();
  });
