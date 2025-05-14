import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../lib/supabase';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">XI Seminário EDFIS</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/noticias">Notícias</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/oficinas">Oficinas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/galeria">Galeria</Link>
              </li>
            </ul>
            <button
              className="btn btn-outline-light"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <div className="container py-4">
          {children}
        </div>
      </main>

      <footer className="bg-light py-3">
        <div className="container text-center">
          <p className="mb-0">© 2024 XI Seminário EDFIS. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
} 