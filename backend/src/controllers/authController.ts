import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login({ email, password });
    res.status(201).json({ token, user })
  } catch(error: any) {
    console.error('Erro ao realizar login:', error.message || error);

    res.status(500).json({
      message: 'Erro ao realizar login',
      error: error.message || 'Erro interno no servidor',
    });
  }
};