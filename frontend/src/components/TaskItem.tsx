import React from 'react';
import type { ITask } from '../types/Entities';

interface TaskItemProps {
  task: ITask;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const formattedData = new Date(task.dueDate).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const isPendente = task.status === 'PENDENTE';

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isPendente ? 'border-amber-500' : 'border-green-500'
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>
      </div>
      
      {task.description && (
        <p className="text-gray-600 my-2 text-sm">{task.description}</p>
      )}

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
        <span
          className={`py-1 px-3 rounded-full text-white text-xs font-semibold ${
            isPendente ? 'bg-amber-500' : 'bg-green-500'
          }`}
        >
          {task.status}
        </span>

        <div className="flex items-center text-sm text-gray-500 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formattedData}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;