import { Worker } from 'bullmq';
import axios from 'axios';
import { prisma } from './database/prismaClient';

const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};

console.log('Worker de notificações iniciado...');

// O worker escuta a fila 'notification-queue'
new Worker('notification-queue', async job => {
  // console.log(`Processando job: ${job.name} (ID: ${job.id})`);
  
  const { taskId } = job.data;
  if (!taskId) {
    console.error('Job sem taskId. Descartando.');
    return;
  }

  try {
    // busca os dados da tarefa no banco
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { user: true }
    });

    if (!task) {
      throw new Error(`Tarefa com ID ${taskId} não encontrada.`);
    }

    // prepara os dados para o webhook
    const webhookPayload = {
      message: `Lembrete: Sua tarefa "${task.title}" está agendada para daqui a 5 minutos.`,
      task,
    };

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('WEBHOOK_URL não configurada no ambiente.');
    }

    // envia a notificação para o webhook
    // console.log(`Enviando notificação para: ${webhookUrl}`);
    await axios.post(webhookUrl, webhookPayload);
    
    // console.log(`Notificação para a tarefa ${taskId} enviada com sucesso!`);

  } catch (error: any) {
    console.error(`Falha ao processar a notificação para a tarefa ${taskId}:`, error.message);
    throw error;
  }
}, { connection: redisConnection });