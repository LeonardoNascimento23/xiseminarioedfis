import React from 'react';
import Layout from '../components/layout/Layout';
import { eventInfo } from '../data/mockData';

const RegistrationPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Inscrições</h1>
          <p className="text-blue-100 text-lg">
            Inscrições abertas até {new Date(eventInfo.registrationDeadline).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Faça sua inscrição</h2>
            <p className="text-gray-600">
              Preencha o formulário abaixo para realizar sua inscrição
            </p>
          </div>

          <div className="flex justify-center">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSfAMWKNxuvZpUN1UmTh1m0aINzCIcqFuAD3f9h_8_klszPJnw/viewform?embedded=true" 
              width="100%" 
              height="1652" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0"
              className="max-w-2xl w-full"
            >
              Carregando…
            </iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;