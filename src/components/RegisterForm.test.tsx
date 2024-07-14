import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { register } from '../api';

jest.mock('../api');

describe('RegisterForm', () => {
  const mockRegister = register as jest.Mock;

  test('renders form inputs and submit button', () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    mockRegister.mockResolvedValueOnce({});
    render(<RegisterForm />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(mockRegister).toHaveBeenCalledWith('testuser', 'password');
  });

  test('shows error message on failed registration', async () => {
    mockRegister.mockRejectedValueOnce(new Error('Registration failed'));
    render(<RegisterForm />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(await screen.findByText(/registration failed/i)).toBeInTheDocument();
  });
});
