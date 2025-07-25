import { prisma } from '../database/prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface ILoginData {
    email: string;
    password: string;
}

export const login = async ({ email, password }: ILoginData) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Email ou senha inválidos.');
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Email ou senha inválidos.');

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Chave secreta do JWT não configurada.');

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

    return { 
        token, 
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        } 
    };
};