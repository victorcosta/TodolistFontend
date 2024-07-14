import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AuthProvider } from '../contexts/AuthContext';
import * as api from '../api';

jest.mock('../api');

describe('LoginForm', () => {
  const mockLogin = jest.spyOn(api, 'login').mockResolvedValue({ token: 'test-token' });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handles form submission successfully', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password');
    });
  });

  test('displays error message on failed login', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Login failed'));
    
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>,
      { wrapper: BrowserRouter }
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument();
    });
  });
});
