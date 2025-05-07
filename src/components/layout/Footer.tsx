import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-yellow-100">Seminário de Educação Física</h3>
            <p className="text-gray-300 text-sm mb-4">
              O maior evento acadêmico na área de Educação Física, reunindo profissionais e estudantes para compartilhar conhecimentos e experiências.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-100 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-100 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-100 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-100 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-yellow-100">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/palestras" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Palestras
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Notícias
                </Link>
              </li>
              <li>
                <Link to="/programacao" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Programação
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Sobre o Evento
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-yellow-100">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-yellow-100 transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-yellow-100">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-gray-300 mr-2 h-5 w-5 mt-0.5" />
                <span className="text-gray-300 text-sm">Campus Universitário, Av. Principal, 1000 - São Paulo, SP</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-gray-300 mr-2 h-5 w-5" />
                <span className="text-gray-300 text-sm">(11) 5555-1234</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-gray-300 mr-2 h-5 w-5" />
                <span className="text-gray-300 text-sm">contato@seminarioef.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary text-center text-sm text-gray-300">
          <p>© {currentYear} Seminário de Educação Física. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;