import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext'; // Importe o AuthProvider
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders login form component', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
