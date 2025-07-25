
import React, { createContext, useState, useContext, useEffect } from 'react';

interface IUser {
  id: number;
  name: string | null;
  email: string;
}

interface IAuthContextData {
    isAuthenticated: boolean;
    user: IUser | null; // <-- Adiciona o usuário ao contexto
    loading: boolean;
    login: (token: string, userData: IUser) => void; // <-- Altera a assinatura do login
    logout: () => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('@App:token');
            const storedUser = localStorage.getItem('@App:user');

            if (storedToken && storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (token: string, userData: IUser) => {
        localStorage.setItem('@App:token', token);
        localStorage.setItem('@App:user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('@App:token');
        localStorage.removeItem('@App:user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);