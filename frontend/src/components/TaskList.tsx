// src/components/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/Api';
import type { ITask } from '../types/Entities';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const [task, setTask] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTask(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar as tarefas.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Carregando tarefas...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {task.length > 0 ? (
        task.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      ) : (
        <p>Nenhuma tarefa cadastrada ainda.</p>
      )}
    </div>
  );
};

export default TaskList;