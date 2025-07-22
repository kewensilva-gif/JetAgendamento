import { prisma } from '../database/prismaClient';

interface ICreateTaskData {
    title: string;
    description: string;
    dueDate: string;
    userId: number;
}

export const createTask = async ({ title, description, dueDate, userId }: ICreateTaskData) => {
    const userExists = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!userExists) {
        throw new Error('Usuário não encontrado');
    }

    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            dueDate: new Date(dueDate),
            userId,
        },
    });
    return newTask;
};

export const listTasks = async () => {
    const allTasks = await prisma.task.findMany();
    console.log(allTasks)
    return allTasks;
};