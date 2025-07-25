import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4 flex-wrap">
        <Link to="/" className="text-2xl font-bold tracking-wider hover:text-blue-400 transition-colors duration-300">
          JetAgendamentos
        </Link>

        <nav className="flex items-center gap-6 flex-wrap">
          {isAuthenticated ? (
            <>
              <span className="text-gray-300">
                Olá, <strong className="font-medium text-white">{user?.name || user?.email}</strong>
              </span>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Painel de Tarefas
              </Link>
              <Link
                to="/auth/createtask"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Nova Tarefa
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Painel de Tarefas
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;