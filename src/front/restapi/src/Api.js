import axios from 'axios';

const baseUrl = 'http://localhost:8080/task';


export const getTasks = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

export const getTask = async (taskId) => {
    const response = await axios.get(`${baseUrl}/${taskId}`);
    return response.data;
};


export const createTask = async (taskData) => {
    const response = await axios.post(baseUrl, taskData);
    return response.data;
};

export const updateTask = async (taskId, taskData) => {
    const response = await axios.put(`${baseUrl}/${taskId}`, taskData);
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await axios.delete(`${baseUrl}/${taskId}`);
    return response.data;
};


export default {getTasks, getTask, createTask, updateTask, deleteTask};