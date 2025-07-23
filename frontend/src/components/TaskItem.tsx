import React from 'react';
import type { ITask } from '../types/entities';

const cardStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '10px',
  backgroundColor: '#f9f9f9',
};

const statusStyle: React.CSSProperties = {
    padding: '4px 8px',
    borderRadius: '12px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
}

interface TaskItemProps {
  task: ITask;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const formattedData = new Date(task.dueDate).toLocaleDateString('pt-BR');
  const isPendente = task.status === 'PENDENTE';

  return (
    <div style={cardStyle}>
      <h3>{task.description}</h3>
      <p>
        <strong>Status: </strong> 
        <span style={{...statusStyle, backgroundColor: isPendente ? '#f39c12' : '#2ecc71'}}>
            {task.status}
        </span>
      </p>
      <p><strong>Vencimento:</strong> {formattedData}</p>
    </div>
  );
};

export default TaskItem;