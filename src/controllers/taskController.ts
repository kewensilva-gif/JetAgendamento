import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const handleCreateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, dueDate, userId } = req.body;
        // adicionar validação
        const newTask = await taskService.createTask({ title, description, dueDate, userId });
        res.status(201).json(newTask);
    } catch (error) {  }
};

export const handleListTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTasks = await taskService.listTasks();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
