import axios from 'axios';
import type { ITask } from '../types/Entities';

export interface ILoginFormData {
  email: string;
  password: string;
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
    const response = await api.post<{ token: string }>('/auth', data);
    console.log('Login realizado com sucesso:', response.data);
    localStorage.setItem('@App:token', response.data.token);
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
