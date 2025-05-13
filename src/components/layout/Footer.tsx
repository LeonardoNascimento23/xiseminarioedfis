import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {/* Coluna de Contato */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-white" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-white" />
                <span>contato@evento.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-5 w-5 text-white" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Coluna de Links Rápidos */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-200 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/oficinas" className="hover:text-gray-200 transition-colors">
                  Oficinas
                </Link>
              </li>
              <li>
                <Link to="/programacao" className="hover:text-gray-200 transition-colors">
                  Programação
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="hover:text-gray-200 transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="hover:text-gray-200 transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/inscricao" className="hover:text-gray-200 transition-colors">
                  Inscrição
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna de Redes Sociais */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Redes Sociais</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p>&copy; {currentYear} XI Seminário de Práticas de Ensino, Pesquisa e Extensão em Educação Física
. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm text-white/80">
            Desenvolvido por{' '}
            <a 
              href="https://linktr.ee/Leonardo.Vital?utm_source=linktree_profile_share&ltsid=15b124fb-4c41-46b0-9fa2-60d94cd0be79" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Leonardo Nascimento
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;