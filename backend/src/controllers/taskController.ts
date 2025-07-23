import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, dueDate, userId } = req.body;
        // adicionar validação
        const newTask = await taskService.create({ title, description, dueDate, userId });
        res.status(201).json(newTask);
    } catch (error) {  }
};

export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTasks = await taskService.list();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
