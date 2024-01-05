import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../component/Button';

test('renders Button component with default props', () => {
  const { getByText } = render(<Button name="Click me" />);
  const buttonElement = getByText(/Click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Button component with outline style', () => {
  const { getByText } = render(<Button name="Outline Button" outline />);
  const buttonElement = getByText(/Outline Button/i);
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('border-cyan-700');
});

test('calls onClick when Button is clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<Button name="Click me" onClick={onClickMock} />);
  const buttonElement = getByText(/Click me/i);
  fireEvent.click(buttonElement);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
