import React from 'react';
import Layout from '../components/layout/Layout';
import { eventInfo } from '../data/mockData';

const RegistrationPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-blue-700 py-16">
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
              Clique no botão abaixo para acessar o formulário de inscrição
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href="https://forms.google.com" // Replace with actual Google Forms URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clique AQUI para se inscrever
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;