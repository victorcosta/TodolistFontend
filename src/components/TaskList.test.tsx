import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskList from './TaskList';
import { useAuth } from '../contexts/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

jest.mock('../api');
jest.mock('../contexts/AuthContext');

describe('TaskList', () => {
  const mockGetTasks = getTasks as jest.Mock;
  const mockCreateTask = createTask as jest.Mock;
  const mockUpdateTask = updateTask as jest.Mock;
  const mockDeleteTask = deleteTask as jest.Mock;
  const mockToken = 'mock-token';

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ token: mockToken });
    mockGetTasks.mockResolvedValue([]);
  });

  test('renders task list', async () => {
    render(<TaskList />);

    expect(await screen.findByText(/add/i)).toBeInTheDocument();
  });

  test('creates a new task', async () => {
    const newTask = { _id: '1', title: 'New Task', completed: false };
    mockCreateTask.mockResolvedValueOnce(newTask);
    render(<TaskList />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(await screen.findByText('New Task')).toBeInTheDocument();
  });

  test('updates a task', async () => {
    const task = { _id: '1', title: 'Task 1', completed: false };
    mockGetTasks.mockResolvedValueOnce([task]);
    render(<TaskList />);

    // Ensure tasks are rendered
    await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId(`update-${task._id}`));

    expect(mockUpdateTask).toHaveBeenCalledWith(task._id, task.title, true, mockToken);
  });

  test('deletes a task', async () => {
    const task = { _id: '1', title: 'Task 1', completed: false };
    mockGetTasks.mockResolvedValueOnce([task]);
    render(<TaskList />);

    // Ensure tasks are rendered
    await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId(`delete-${task._id}`));

    expect(mockDeleteTask).toHaveBeenCalledWith(task._id, mockToken);
  });
});
