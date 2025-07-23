import axios from 'axios';
import type { ITask } from '../types/Entities';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export const getTasks = async (): Promise<ITask[]> => {
  try {
    const response = await api.get<ITask[]>('/tasks');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};
