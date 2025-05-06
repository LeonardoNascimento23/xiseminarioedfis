import React from 'react';
import Layout from '../components/layout/Layout';

const GalleryPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Galeria de Fotos</h1>
          <p className="text-blue-100 text-lg">
            Acompanhe os registros do nosso evento
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <p className="text-gray-600">
            As fotos do evento serão disponibilizadas aqui durante a realização do seminário.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;