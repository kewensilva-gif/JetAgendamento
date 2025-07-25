import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const [, token] = authorization.split(' ');

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('Chave secreta do JWT não configurada.');

        const data = jwt.verify(token, secret);
        const { id } = data as TokenPayload;

        // @ts-ignore
        req.userId = id; 

        return next();
    } catch {
        return res.status(401).json({ error: 'Token inválido.' });
    }
};