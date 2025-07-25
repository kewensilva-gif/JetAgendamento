import React, { useState } from 'react';
import { createUser } from '../../services/Api';
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({
    message: '',
    type: '' as 'success' | 'error' | '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório.';
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = 'O nome deve ter no mínimo 3 caracteres.';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'O email é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'O formato do email é inválido.';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'A senha é obrigatória.';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createUser(formData);
        setAlertInfo({ message: 'Conta criada com sucesso!', type: 'success' });

        setTimeout(() => {
          setAlertInfo({ message: '', type: '' });
          navigate('/');
        }, 3000);
        return;
      } catch (error) {
        console.error("erro",error);
        setAlertInfo({ message: 'Erro ao criar a conta. Tente novamente.', type: 'error' });
        return;
      }
    } 
    setAlertInfo({ message: 'Erro de validação do formulário', type: 'error' });
  };

  return (
    <div className='relative'>
      <Alert
        message={alertInfo.message} 
        type={alertInfo.type as 'success' | 'error'}
        onClose={() => setAlertInfo({ message: '', type: '' })}
      />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Criar Nova Conta
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome<span className='text-red-600'>*</span></label>
              <input
                type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                placeholder="João da Silva"
                required
                className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email<span className='text-red-600'>*</span></label>
              <input
                type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="seu.email@exemplo.com"
                required
                className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha<span className='text-red-600'>*</span></label>
              <input
                placeholder="••••••••"
                required
                type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border rounded-md shadow-sm ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;