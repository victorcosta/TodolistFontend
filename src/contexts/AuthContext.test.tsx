import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

const TestComponent: React.FC = () => {
  const { token, login, logout } = useAuth();

  return (
    <div>
      <div>Token: {token}</div>
      <button onClick={() => login('test-token')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const renderWithAuthProvider = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('AuthContext', () => {
  test('should provide initial value', () => {
    renderWithAuthProvider(<TestComponent />);
    expect(screen.getByText(/Token:/).textContent).toBe('Token: ');
  });

  test('should update token on login', () => {
    renderWithAuthProvider(<TestComponent />);

    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.getByText(/Token:/).textContent).toBe('Token: test-token');
  });

  test('should clear token on logout', () => {
    renderWithAuthProvider(<TestComponent />);

    fireEvent.click(screen.getByText(/Login/i));
    fireEvent.click(screen.getByText(/Logout/i));
    expect(screen.getByText(/Token:/).textContent).toBe('Token: ');
  });
});
