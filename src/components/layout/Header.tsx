import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/images/LogoEdFisUFGD.png" alt="Logo" className="h-12 w-auto" />
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link to="/" className="text-primary hover:text-primary-dark px-3 py-2 text-sm font-medium">
                Início
              </Link>
              <Link to="/inscricao" className="text-primary hover:text-primary-dark px-3 py-2 text-sm font-medium">
                Inscrição
              </Link>
              <Link to="/programacao" className="text-primary hover:text-primary-dark px-3 py-2 text-sm font-medium">
                Programação
              </Link>
              <Link to="/oficinas" className="text-primary hover:text-primary-dark px-3 py-2 text-sm font-medium">
                Oficinas
              </Link>
              <Link to="/noticias" className="text-primary hover:text-primary-dark px-3 py-2 text-sm font-medium">
                Notícias
              </Link>
              <Link to="/galeria" className="text-primary hover:text-primary-dark px-3 py-2 text-sm font-medium">
                Fotos
              </Link>
              <Link to="/sobre" className="text-primary hover:text-primary-dark px-3 py-2 text-sm font-medium">
                Sobre
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center max-w-xs text-sm rounded-full text-primary focus:outline-none"
                  onClick={toggleUserMenu}
                >
                  <span className="mr-2">Minha Conta</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-primary hover:bg-gray-50">
                        Gerenciar Conteúdo
                      </Link>
                    )}
                    <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sair
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-gray-50">Entrar</Button>
                </Link>
                <Link to="/registrar">
                  <Button variant="secondary" size="sm">Registrar</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-dark hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMenu}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
              Início
            </Link>
            <Link to="/inscricao" className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
              Inscrição
            </Link>
            <Link to="/programacao" className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
              Programação
            </Link>
            <Link to="/oficinas" className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
              Oficinas
            </Link>
            <Link to="/noticias" className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
              Notícias
            </Link>
            <Link to="/galeria" className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
              Fotos
            </Link>
            <Link to="/sobre" className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
              Sobre
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-3 space-y-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="block rounded-md py-2 px-3 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
                      Gerenciar Conteúdo
                    </Link>
                  )}
                  <Link to="/logout" className="block rounded-md py-2 px-3 text-base font-medium text-primary hover:bg-gray-50 hover:text-primary-dark">
                    Sair
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="block w-full">
                    <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-gray-50">Entrar</Button>
                  </Link>
                  <Link to="/registrar" className="block w-full">
                    <Button variant="secondary" size="sm">Registrar</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;