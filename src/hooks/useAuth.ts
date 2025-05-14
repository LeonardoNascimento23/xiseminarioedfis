import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = async () => {
      try {
        const netlifyIdentity = window.netlifyIdentity;
        if (netlifyIdentity) {
          netlifyIdentity.on('init', (user: any) => {
            if (user) {
              setUser({
                id: user.id,
                email: user.email,
                role: user.role || 'editor'
              });
            }
            setLoading(false);
          });

          netlifyIdentity.on('login', (user: any) => {
            setUser({
              id: user.id,
              email: user.email,
              role: user.role || 'editor'
            });
            setLoading(false);
          });

          netlifyIdentity.on('logout', () => {
            setUser(null);
            setLoading(false);
          });
        }
      } catch (err) {
        setError('Erro ao verificar autenticação');
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const netlifyIdentity = window.netlifyIdentity;
      if (netlifyIdentity) {
        await netlifyIdentity.open('login');
      }
    } catch (err) {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const netlifyIdentity = window.netlifyIdentity;
      if (netlifyIdentity) {
        await netlifyIdentity.logout();
      }
    } catch (err) {
      setError('Erro ao fazer logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 