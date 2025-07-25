import React, { useState } from 'react';
import { createTask } from '../services/Api';

function CreateTaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    userId: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    dueDate: '',
  });

  const validateForm = () => {
    const newErrors = { title: '', dueDate: '' };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'O título da tarefa é obrigatório.';
      isValid = false;
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'A data e hora de vencimento são obrigatórias.';
      isValid = false;
    } else {
      const now = new Date();
      const selectedDateTime = new Date(formData.dueDate);
      
      if (selectedDateTime < now) {
        newErrors.dueDate = 'A data e hora não podem ser no passado.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        formData['userId'] = JSON.parse(localStorage.getItem('@App:user') || '{}').id;
        console.log('Dados da tarefa:', formData);
        await createTask(formData);
        alert('Tarefa criada com sucesso!');
        setFormData({ title: '', description: '', dueDate: '', userId: '' });
      } catch (error) {
        alert('Erro ao criar a tarefa.');
      }
    } else {
      console.log('Formulário da tarefa com erros de validação.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Cadastrar Nova Tarefa
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título<span className='text-red-600'>*</span></label>
          <input
            type="text" id="title" name="title" value={formData.title} onChange={handleChange}
            required
            placeholder="Tirar o lixo"
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
          <textarea
            id="description" name="description" value={formData.description} onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Data e Hora de Vencimento<span className='text-red-600'>*</span></label>
          <input
            type="datetime-local" 
            id="dueDate" 
            name="dueDate" 
            required
            value={formData.dueDate} 
            onChange={handleChange}
            className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm ${errors.dueDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
        </div>

        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">
          Salvar Tarefa
        </button>
      </form>
    </div>
    </div>
  );
}

export default CreateTaskForm;