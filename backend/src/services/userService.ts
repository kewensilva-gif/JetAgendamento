import { prisma } from '../database/prismaClient';
import bcrypt from 'bcryptjs';

interface ICreateUserData {
    name: string;
    email: string;
    password: string;
}

export const create = async ({ name, email, password }: ICreateUserData) => {
    const hashPassword = await bcrypt.hash(password, 8);

    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashPassword,
        },
    });

    return { name, email } = newUser;
};