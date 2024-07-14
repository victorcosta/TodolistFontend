import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';

const TestComponent: React.FC = () => <div>Private Content</div>;
const LoginComponent: React.FC = () => <div>Login Page</div>;

const renderWithAuthProvider = (ui: React.ReactElement, route: string) => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/" element={<PrivateRoute element={ui} path={'/login'} />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('PrivateRoute', () => {
  
  test('redirects to login when not authenticated', () => {
    const { getByText } = renderWithAuthProvider(<TestComponent />, '/');
    expect(getByText('Login Page')).toBeInTheDocument();
  });
});
