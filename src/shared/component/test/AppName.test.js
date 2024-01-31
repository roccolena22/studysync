import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AppName from '../AppName';

test('renders the name passed as props', () => {
  render(<AppName name="StudySync" />);
  const nameElement = screen.getByText(/StudySync/i);
  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveTextContent("StudySync");
});

test('renders with white color when white prop is true', () => {
  render(<AppName name="StudySync" white />);
  const nameElement = screen.getByText(/StudySync/i);
  expect(nameElement).toHaveClass('text-white');
});

test('renders with cyan color when white prop is false', () => {
  render(<AppName name="StudySync" white={false} />);
  const nameElement = screen.getByText(/StudySync/i);
  expect(nameElement).toHaveClass('text-cyan-700');
});
