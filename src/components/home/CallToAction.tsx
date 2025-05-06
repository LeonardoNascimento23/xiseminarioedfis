import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-3/5">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
              Junte-se a nós no maior evento de Educação Física de 2025
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-blue-50">
              Garanta sua vaga e participe de dois dias imersivos de aprendizado, troca de experiências e
              networking com profissionais e estudantes de Educação Física de todo o país.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Link to="/registrar">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90 focus:ring-secondary/50"
                >
                  Inscreva-se Agora
                </Button>
              </Link>
              <Link to="/programacao">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-blue-700"
                >
                  Ver Programação Completa
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-2/5 lg:pl-10">
            <div className="bg-blue-700 bg-opacity-50 p-6 rounded-lg border border-blue-400">
              <h3 className="text-xl font-bold mb-4">Detalhes do Evento</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-3 mt-0.5">1</span>
                  <span>10 e 11 de Junho de 2025</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-3 mt-0.5">2</span>
                  <span>Campus Universitário, São Paulo</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-3 mt-0.5">3</span>
                  <span>20+ Palestras e Workshops</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-3 mt-0.5">4</span>
                  <span>Certificado de participação</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-3 mt-0.5">5</span>
                  <span>Material de apoio completo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;