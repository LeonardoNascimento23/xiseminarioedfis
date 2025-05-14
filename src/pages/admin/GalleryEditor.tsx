import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useGallery } from '../../hooks/useSupabase';
import { ImagePreview } from '../../components/ui/ImagePreview';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = [
  'Eventos',
  'Oficinas',
  'Palestras',
  'Exposições',
  'Outros'
];

interface SelectedImage {
  file: File | null;
  description: string;
  category: string;
}

export default function GalleryEditor() {
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState<SelectedImage>({
    file: null,
    description: '',
    category: CATEGORIES[0]
  });
  const [errors, setErrors] = useState<string[]>([]);
  const { images, loading, error, uploadImage, deleteImage } = useGallery();

  const handleImageSelect = (file: File) => {
    setSelectedImage(prev => ({ ...prev, file }));
    setErrors([]);
  };

  const handleError = (errors: string[]) => {
    setErrors(errors);
  };

  const handleSave = async () => {
    try {
      if (!isAuthenticated) {
        setErrors(['Você precisa estar logado para fazer upload de imagens']);
        return;
      }

      if (!selectedImage.file) {
        setErrors(['Selecione uma imagem']);
        return;
      }

      if (!selectedImage.description.trim()) {
        setErrors(['Adicione uma descrição']);
        return;
      }

      const result = await uploadImage(selectedImage.file, 'gallery', {
        description: selectedImage.description,
        category: selectedImage.category
      });

      if (result) {
        setSelectedImage({
          file: null,
          description: '',
          category: CATEGORIES[0]
        });
        setErrors([]);
      }
    } catch (err) {
      console.error('Erro ao salvar:', err);
      setErrors([err instanceof Error ? err.message : 'Erro ao salvar imagem']);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Galeria</h1>

        {errors.length > 0 && (
          <Alert variant="error" className="mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Adicionar Nova Imagem</h2>
            
            <ImagePreview
              onImageSelect={handleImageSelect}
              onError={handleError}
              className="mb-4"
            />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  value={selectedImage.description}
                  onChange={(e) => setSelectedImage(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Digite uma descrição para a imagem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={selectedImage.category}
                  onChange={(e) => setSelectedImage(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleSave}
                disabled={loading || !selectedImage.file}
                isLoading={loading}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Salvar Imagem
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Imagens da Galeria</h2>
            
            {loading ? (
              <p>Carregando imagens...</p>
            ) : error ? (
              <Alert variant="error">{error}</Alert>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {images.map(image => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.description}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteImage(image.id)}
                        leftIcon={<Trash2 className="w-4 h-4" />}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}