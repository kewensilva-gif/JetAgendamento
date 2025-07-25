import { Request, Response, NextFunction } from 'express';

export const validateCreateTask = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, dueDate } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'O campo "title" é obrigatório e deve ser um texto.' });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ message: 'O campo "description" deve ser um texto.' });
  }

  if (!dueDate) {
    return res.status(400).json({ message: 'O campo "dueDate" é obrigatório.' });
  }

  const taskDate = new Date(dueDate);
  if (isNaN(taskDate.getTime())) {
    return res.status(400).json({ message: 'O formato de "dueDate" é inválido. Use o formato ISO 8601 (ex: YYYY-MM-DDTHH:mm).' });
  }

  if (taskDate < new Date()) {
    return res.status(400).json({ message: 'A data de vencimento não pode ser no passado.' });
  }

  next();
};