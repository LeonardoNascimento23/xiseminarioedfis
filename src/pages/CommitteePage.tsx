import React from 'react';
import Layout from '../components/layout/Layout';
import { eventInfo } from '../data/mockData';

const CommitteePage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Comissão Organizadora</h1>
          <p className="text-blue-100 text-lg">
            Conheça nossa equipe de organização
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="grid grid-cols-1 gap-8">
            {eventInfo.organizers.map((organizer, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                <h3 className="text-xl font-semibold text-gray-900">{organizer.name}</h3>
                <div className="mt-2 space-y-1 text-gray-600">
                  <p>Função: {organizer.role}</p>
                  <p>Curso: {organizer.course}</p>
                  <p>Instituição: {organizer.institution}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-8 text-center">Instituições Organizadoras</h3>
            <div className="flex flex-col items-center space-y-8">
              <img src={eventInfo.logos.ufgd} alt="UFGD" className="h-32 object-contain" />
              <img src={eventInfo.logos.edFisica} alt="Curso de Educação Física" className="h-32 object-contain" />
              <img src={eventInfo.logos.faed} alt="FAED" className="h-32 object-contain" />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contato</h3>
              <p className="text-gray-600">Email: {eventInfo.contact.email}</p>
              <p className="text-gray-600">Telefone: {eventInfo.contact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommitteePage;