import { prisma } from '../database/prismaClient';

interface ICreateUserData {
    name: string;
    email: string;
}

export const createUser = async ({ name, email }: ICreateUserData) => {
    let password = "1234"
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password
        },
    });
    return newUser;
};