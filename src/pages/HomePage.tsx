import React from 'react';
import TaskList from '../components/TaskList';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e: React.FormEvent) => {
      e.preventDefault();
      try {
          logout();
          navigate('/login');
      } catch (error) {
          console.error('Lougout failed', error);
      }
  };



    return (
      <div className="container mx-auto my-10">
        <div className="flex flex-wrap">
          
          <div className="md:w-3/4 ml-auto h-12"></div>
          <div className="md:w-1/4 mr-auto h-12">
                      <button 
                        className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
          </div>
        </div>
        <h1 className="text-center text-3xl font-semibold mb-4">
            To Do List
        </h1>
        <div className="md:w-1/2 mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <TaskList />
          </div>
      </div>
  </div>
    );
};

export default HomePage;
