import React from 'react';
import { Users, BookOpen, Award, Calendar } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Números do Evento</h2>
        <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
          Confira alguns números que demonstram a grandeza do nosso seminário
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-primary rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center">
              <Users className="h-10 w-10 text-gray-200" />
            </div>
            <div className="mt-4 text-4xl font-extrabold">500+</div>
            <div className="text-gray-200">Participantes</div>
          </div>

          <div className="bg-primary rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center">
              <BookOpen className="h-10 w-10 text-gray-200" />
            </div>
            <div className="mt-4 text-4xl font-extrabold">20+</div>
            <div className="text-gray-200">Palestras e Workshops</div>
          </div>

          <div className="bg-primary rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center">
              <Award className="h-10 w-10 text-gray-200" />
            </div>
            <div className="mt-4 text-4xl font-extrabold">15</div>
            <div className="text-gray-200">Especialistas</div>
          </div>

          <div className="bg-primary rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center">
              <Calendar className="h-10 w-10 text-gray-200" />
            </div>
            <div className="mt-4 text-4xl font-extrabold">2</div>
            <div className="text-gray-200">Dias de Imersão</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;