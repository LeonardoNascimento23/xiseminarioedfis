import React from 'react';
import Layout from '../components/layout/Layout';
import { useGallery } from '../hooks/useSupabase';

const GalleryPage: React.FC = () => {
  const { images, loading, error } = useGallery();

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
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando imagens...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>Erro ao carregar imagens: {error}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <p className="text-gray-600">
              As fotos do evento serão disponibilizadas aqui durante a realização do seminário.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-800 font-medium">{image.description}</p>
                  {image.category && (
                    <p className="text-sm text-gray-500 mt-1">{image.category}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GalleryPage;