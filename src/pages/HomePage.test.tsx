import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { useAuth } from '../contexts/AuthContext';

jest.mock('../contexts/AuthContext');

describe('HomePage', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({});
  });

  test('renders welcome message and logout button', () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('renders task list component', () => {
    render(<HomePage />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Add/i)).toBeInTheDocument();
  });
});
