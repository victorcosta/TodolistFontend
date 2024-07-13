import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
    return (
      <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a account?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register here!
            </a>
          </p>
        </div>
      </div>
    </>
    );
};

export default LoginPage;
