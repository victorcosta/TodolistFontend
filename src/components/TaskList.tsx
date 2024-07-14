import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import { useAuth } from '../contexts/AuthContext';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [newTask, setNewTask] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchTasks = async () => {
            if (token) {
                const fetchedTasks = await getTasks(token);
                setTasks(fetchedTasks);
            }
        };
        fetchTasks();
    }, [token]);

    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token && newTask) {
            const createdTask = await createTask(newTask, token);
            setTasks([...tasks, createdTask]);
            setNewTask('');
        }
    };

    const handleUpdateTask = async (id: string, title: string, completed: boolean) => {
        if (token) {
            const updatedTask = await updateTask(id, title, completed, token);
            setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
        }
    };

    const handleDeleteTask = async (id: string) => {
        if (token) {
            await deleteTask(id, token);
            setTasks(tasks.filter(task => task._id !== id));
        }
    };

    return (
        <div className="space-y-4">
            <form className="flex space-x-2" onSubmit={e => handleCreateTask(e)}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                    type='submit'
                    data-testid="add"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add
                </button>
            </form>
            <ul id="todo-list">
                {tasks.map(task => (
                    <li key={task._id} className="flex justify-between items-center bg-gray-100 m-1 rounded-sm pl-2">
                        <span className={`${task.completed ? 'line-through' : ''}`}>{task.title}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleUpdateTask(task._id, task.title, !task.completed)}
                                data-testid={`update-${task._id}`}
                                className="py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-indigo-300 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button
                                data-testid={`delete-${task._id}`}
                                onClick={() => handleDeleteTask(task._id)}
                                className="py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-red-400 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
