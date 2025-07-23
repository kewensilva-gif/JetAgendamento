import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
      const { name, email } = req.body;
      const newUser = await userService.create({ name, email });
      res.status(201).json(newUser);
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error.message || error);

    res.status(500).json({
      message: 'Erro ao criar usuário',
      error: error.message || 'Erro interno no servidor',
    });
  }
};