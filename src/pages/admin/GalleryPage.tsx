import { useState } from 'react';
import { ImageUploader } from '../../components/common/ImageUploader';
import { useGallery } from '../../hooks/useSupabase';

export const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { images, loading, error, uploadImage, deleteImage } = useGallery();

  const handleUploadComplete = async (url: string) => {
    try {
      await uploadImage(url, 'Nova imagem da galeria', 'geral');
      setSelectedImage(null);
    } catch (err) {
      console.error('Erro ao salvar imagem:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Galeria</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seção de Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Adicionar Nova Imagem</h2>
          <ImageUploader 
            folder="gallery" 
            onUploadComplete={handleUploadComplete}
          />
        </div>

        {/* Lista de Imagens */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Imagens da Galeria</h2>
          
          {loading && <p>Carregando imagens...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img 
                  src={image.url} 
                  alt={image.description} 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 