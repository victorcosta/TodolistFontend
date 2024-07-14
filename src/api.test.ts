import axios from 'axios';
import { login, register, getTasks, createTask, updateTask, deleteTask, API_URL } from './api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API calls', () => {
  const mockToken = 'Bearer mock-token';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login calls the correct API endpoint', async () => {
    const username = 'testuser';
    const password = 'password';
    const response = { data: { token: mockToken } };
    mockedAxios.post.mockResolvedValueOnce(response);

    const result = await login(username, password);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/auth/login`, { username, password });
    expect(result).toEqual(response.data);
  });

  test('register calls the correct API endpoint', async () => {
    const username = 'testuser';
    const password = 'password';
    const response = { data: {} };
    mockedAxios.post.mockResolvedValueOnce(response);

    const result = await register(username, password);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/auth/register`, { username, password });
    expect(result).toEqual(response.data);
  });

  test('getTasks calls the correct API endpoint', async () => {
    const response = { data: [] };
    mockedAxios.get.mockResolvedValueOnce(response);

    const result = await getTasks(mockToken);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/tasks`, {
      headers: { Authorization: `${mockToken}` },
    });
    expect(result).toEqual(response.data);
  });

  test('createTask calls the correct API endpoint', async () => {
    const title = 'New Task';
    const response = { data: { _id: '1', title, completed: false } };
    mockedAxios.post.mockResolvedValueOnce(response);

    const result = await createTask(title, mockToken);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/tasks`, { title }, {
      headers: { Authorization: `${mockToken}` },
    });
    expect(result).toEqual(response.data);
  });

  test('updateTask calls the correct API endpoint', async () => {
    const id = '1';
    const title = 'Updated Task';
    const completed = true;
    const response = { data: { _id: id, title, completed } };
    mockedAxios.put.mockResolvedValueOnce(response);

    const result = await updateTask(id, title, completed, mockToken);

    expect(mockedAxios.put).toHaveBeenCalledWith(`${API_URL}/tasks/${id}`, { title, completed }, {
      headers: { Authorization: `${mockToken}` },
    });
    expect(result).toEqual(response.data);
  });

  test('deleteTask calls the correct API endpoint', async () => {
    const id = '1';
    const response = { data: {} };
    mockedAxios.delete.mockResolvedValueOnce(response);

    const result = await deleteTask(id, mockToken);

    expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/tasks/${id}`, {
      headers: { Authorization: `${mockToken}` },
    });
    expect(result).toEqual(response.data);
  });
});
