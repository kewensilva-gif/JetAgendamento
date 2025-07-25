import React, { useState } from 'react';
import { loginUser } from '../../services/Api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertInfo, setAlertInfo] = useState({
    message: '',
    type: '' as 'success' | 'error' | '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser({ email, password });
      if (token && user) {
        login(token, user);

        navigate('/');
      }
    } catch (error) {
      setAlertInfo({
        message: 'Erro ao realizar login. Verifique suas credenciais.',type: 'error',
      });
    }
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
            Acessar sua Conta
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
    
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
            
            <div>
              <button 
                type="submit" 
                className="cursor-pointer w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Entrar
              </button>
            </div>
            <div className="text-sm text-center text-gray-600">
              Não tem uma conta? 
              <a 
                href="/register" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Crie uma agora
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;