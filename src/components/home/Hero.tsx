import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { eventInfo } from '../../data/mockData';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <img src="/images/LogoEdFisUFGD.png" alt="Logo" className="h-32 w-auto" />
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl md:text-6xl">
                {eventInfo.title}
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {eventInfo.description}
              </p>

              <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center justify-center text-blue-100">
                  <Calendar className="flex-shrink-0 h-5 w-5 mr-2" />
                  <span>23-27 de Junho, 2025</span>
                </div>
                <div className="flex items-center justify-center text-blue-100">
                  <MapPin className="flex-shrink-0 h-5 w-5 mr-2" />
                  <span>UFGD - Dourados, MS</span>
                </div>
              </div>

              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <Link to="/inscricao">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="bg-secondary hover:bg-secondary-dark focus:ring-secondary/50"
                      isFullWidth
                    >
                      Inscreva-se Agora
                    </Button>
                  </Link>
                  <Link to="/programacao">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="bg-transparent text-white border-white hover:bg-primary-dark"
                      isFullWidth
                    >
                      Ver Programação
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;