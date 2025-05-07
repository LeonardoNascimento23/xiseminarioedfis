import React from 'react';
import Layout from '../components/layout/Layout';
import { useGallery } from '../hooks/useSupabase';

const GalleryPage: React.FC = () => {
  const { images, loading, error } = useGallery();

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Galeria de Fotos</h1>
          <p className="text-gray-100 text-lg">
            Confira os momentos marcantes das edições anteriores
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm">{image.description}</p>
                    {image.category && (
                      <p className="text-gray-300 text-xs mt-1">{image.category}</p>
                    )}
                  </div>
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