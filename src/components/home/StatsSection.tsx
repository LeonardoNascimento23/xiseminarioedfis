import React from 'react';
import { Users, BookOpen, Award, Calendar } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Seminário em Números</h2>
          <p className="mt-4 text-lg text-blue-200 max-w-3xl mx-auto">
            Veja o impacto do nosso evento na comunidade de Educação Física.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-blue-700 rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <Users className="h-10 w-10 text-blue-200" />
            </div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-blue-200">Participantes</div>
          </div>

          <div className="bg-blue-700 rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-10 w-10 text-blue-200" />
            </div>
            <div className="text-4xl font-bold mb-2">20+</div>
            <div className="text-blue-200">Palestras e Workshops</div>
          </div>

          <div className="bg-blue-700 rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <Award className="h-10 w-10 text-blue-200" />
            </div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-blue-200">Especialistas</div>
          </div>

          <div className="bg-blue-700 rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
              <Calendar className="h-10 w-10 text-blue-200" />
            </div>
            <div className="text-4xl font-bold mb-2">2</div>
            <div className="text-blue-200">Dias de Imersão</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;