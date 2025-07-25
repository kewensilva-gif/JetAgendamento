import axios from 'axios';
import type { ITask, IUser } from '../types/Entities';

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IRegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface ICreateTaskData {
  title: string;
  description?: string;
  dueDate: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('@App:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (data: ILoginFormData) => {
  try {
    const response = await api.post<{ token: string, user: IUser }>('/auth', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
};

export const getTasks = async (): Promise<ITask[]> => {
  try {
    const response = await api.get<ITask[]>('/tasks');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

export const createUser = async (data: IRegisterUserData) => {
  const response = await api.post('/user', data);
  return response.data;
};

export const createTask = async (data: ICreateTaskData): Promise<ITask> => {
  const response = await api.post<ITask>('/tasks', data);
  return response.data;
};
