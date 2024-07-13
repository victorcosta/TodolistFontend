import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders app component', () => {
  render(<App />);
  expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
