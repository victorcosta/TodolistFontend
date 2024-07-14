import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert component', () => {
  it('renders success message correctly', () => {
    render(<Alert message="Success message" type="success" />);
    const messageElement = screen.getByText(/Success message/i);
    const { parentElement } = messageElement 
    expect(messageElement).toBeInTheDocument();
    expect(parentElement).toHaveClass('bg-green-100 border-green-400 text-green-700');
  });

  it('renders error message correctly', () => {
    render(<Alert message="Error message" type="error" />);
    const messageElement = screen.getByText(/Error message/i);
    const { parentElement } = messageElement 
    expect(messageElement).toBeInTheDocument();
    expect(parentElement).toHaveClass('bg-red-100 border-red-400 text-red-700');
  });
});
