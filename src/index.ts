import express, { Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API de Agendamento de Tarefas com TypeScript está no ar!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});