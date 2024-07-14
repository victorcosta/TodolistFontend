import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders app component', () => {
  render(<App />);
  expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
