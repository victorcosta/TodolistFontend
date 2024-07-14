import axios from 'axios';

export const API_URL = 'http://localhost:5100/api';

export const register = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/register`, { username, password });
    return response.data;
};

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
};

export const createTask = async (title: string, token: string) => {
    const response = await axios.post(`${API_URL}/tasks`, { title }, {
        headers: { Authorization: token }
    });
    return response.data;
};

export const getTasks = async (token: string) => {
    const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: token }
    });
    return response.data;
};

export const updateTask = async (id: string, title: string, completed: boolean, token: string) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, { title, completed }, {
        headers: { Authorization: token }
    });
    return response.data;
};

export const deleteTask = async (id: string, token: string) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: token }
    });
    return response.data;
};