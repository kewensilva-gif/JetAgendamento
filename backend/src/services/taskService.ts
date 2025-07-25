import { prisma } from '../database/prismaClient';
import { notificationQueue } from '../config/queue';
import { StatusTask } from '@prisma/client';

interface ICreateTaskData {
    title: string;
    description: string;
    dueDate: string;
    userId: number;
}

export const create = async ({ title, description, dueDate, userId }: ICreateTaskData) => {
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

    // --- Lógica de Agendamento ---
    const jobTime = new Date(dueDate).getTime();
    const currentTime = Date.now();
    const fiveMinutesInMs = 5 * 60 * 1000;   

    const notificationDelay = jobTime - currentTime - fiveMinutesInMs;
    // console.log("--- DEBUG DE AGENDAMENTO ---");
    // console.log(`Data da Tarefa (dueDate): ${new Date(dueDate)}`);
    // console.log(`Hora da Tarefa (ms):     ${jobTime}`);
    // console.log(`Hora Atual (ms):          ${currentTime}`);
    // console.log(`Delay calculado (ms):     ${delay}`);
    // console.log(`O job será agendado?      ${delay > 0}`);
    // console.log("----------------------------");

    // Só adiciona o job se o horário for no futuro
    if (notificationDelay > 0) {
        await notificationQueue.add(
            'send-notification',
            { taskId: newTask.id },
            { delay: notificationDelay }
        );
        console.log(`Job de NOTIFICAÇÃO agendado para a tarefa ${newTask.id}.`);
    }

    const statusUpdateDelay = jobTime - currentTime;
    if (statusUpdateDelay >= 0) {
        await notificationQueue.add(
            'update-status-to-concluida',
            { taskId: newTask.id },
            { delay: statusUpdateDelay }
        );
        console.log(`Atualização do status da tarefa ${newTask.title+ ' - ' + newTask.id}.`);
    }

    return newTask;
};

export const list = async () => {
    const allTasks = await prisma.task.findMany({orderBy: { id: 'desc' }});
    return allTasks;
};

export const changeStatus = async (taskId: number, status: StatusTask) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
    });

    if (!task) {
        throw new Error('Tarefa não encontrada');
    }

    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { status },
    });

    return updatedTask;
}