import { Worker, Job } from 'bullmq';
import axios from 'axios';
import { prisma } from './database/prismaClient';
import { StatusTask, Task, User } from '@prisma/client';

const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};

/*
 * Envia uma notificação via webhook se a tarefa ainda estiver pendente.
*/
const handleNotificationJob = async (task: Task & { user: User }) => {
  if (task.status !== StatusTask.PENDENTE) {
    console.log(`Tarefa ${task.id} não está mais PENDENTE. Notificação cancelada.`);
    return;
  }

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error('WEBHOOK_URL não configurada no ambiente.');
  }

  const webhookPayload = {
    message: `Lembrete: Sua tarefa "${task.title}" está agendada para daqui a 5 minutos.`,
    task,
  };

  console.log(`Enviando notificação para a tarefa ${task.id} para: ${webhookUrl}`);
  await axios.post(webhookUrl, webhookPayload);
  console.log(`Notificação para a tarefa ${task.id} enviada com sucesso!`);
};

/**
 * Realiza a atualização do status da tarefa para 'CONCLUIDA' se ela ainda estiver 'PENDENTE'.
*/
const handleStatusUpdateJob = async (taskId: number) => {
  await prisma.task.update({
    where: { 
      id: taskId,
      status: StatusTask.PENDENTE
    },
    data: { 
      status: StatusTask.CONCLUIDA 
    },
  });

  console.log(`Status da tarefa ${taskId} atualizado com sucesso.`);
};


// --- Instância Principal do Worker ---
new Worker('notification-queue', async (job: Job) => {
  const { taskId } = job.data;
  if (!taskId) {
    console.error(`Job ${job.id} sem taskId. Descartando.`);
    return;
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { user: true }
    });

    if (!task) {
      // Se a tarefa foi deletada após o agendamento, apenas ignore o job.
      console.warn(`Tarefa com ID ${taskId} não encontrada para o job ${job.id}. O job será ignorado.`);
      return;
    }

    // Verifica o tipo de job e chama a função apropriada
    switch (job.name) {
      case 'send-notification':
        await handleNotificationJob(task);
        break;

      case 'update-status-to-concluida':
        await handleStatusUpdateJob(task.id);
        break;

      default:
        console.warn(`Job com nome desconhecido recebido: ${job.name}`);
    }

  } catch (error: any) {
    console.error(`Falha ao processar job ${job.id} (Tarefa ${taskId}):`, error.message);
    throw error;
  }
}, { connection: redisConnection });