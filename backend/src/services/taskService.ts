import { prisma } from '../database/prismaClient';
import { notificationQueue } from '../config/queue';

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
    const delay = jobTime - currentTime - fiveMinutesInMs;

    // console.log("--- DEBUG DE AGENDAMENTO ---");
    // console.log(`Data da Tarefa (dueDate): ${new Date(dueDate)}`);
    // console.log(`Hora da Tarefa (ms):     ${jobTime}`);
    // console.log(`Hora Atual (ms):          ${currentTime}`);
    // console.log(`Delay calculado (ms):     ${delay}`);
    // console.log(`O job será agendado?      ${delay > 0}`);
    // console.log("----------------------------");

    // Só adiciona o job se o horário for no futuro
    if (delay > 0) {
        await notificationQueue.add(
            `Notificação para: ${newTask.title}`,
            { taskId: newTask.id },
            { delay }
        );
        // console.log(`Job de notificação agendado para a tarefa ${newTask.id} com delay de ${delay}ms`);
    }

    return newTask;
};

export const list = async () => {
    const allTasks = await prisma.task.findMany();
    return allTasks;
};