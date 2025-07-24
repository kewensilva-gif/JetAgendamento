// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { loginUser } from '../../services/Api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ email, password });
      login(token);
      navigate('/'); // Redireciona para o painel principal após o login
    } catch (error) {
      alert('Erro ao fazer login: verifique seu email e senha.');
    }
  };

  return (
    // Container principal para centralizar o conteúdo
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      {/* Card do formulário */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Acessar sua Conta
        </h1>
        
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo de Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          
          {/* Campo de Senha */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          
          {/* Botão de Envio */}
          <div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Entrar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;