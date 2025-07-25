import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { resourceUsage } from 'process';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
      const { name, email, password } = req.body;
      const newUser = await userService.create({ name, email, password });
      res.status(201).json(newUser);
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error.message || error);
    
    if (error.message === 'Email já cadastrado') {
        res.status(409).json({
            message: 'Conflito de dados',
            error: error.message,
        });
    }

    res.status(500).json({
      message: 'Erro ao criar usuário',
      error: error.message || 'Erro interno no servidor',
    });
  }
};