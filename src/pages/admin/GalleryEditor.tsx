import React, { useState, ChangeEvent } from 'react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { Plus, Save, Trash2, Upload } from 'lucide-react';
import { useGallery, GalleryImage } from '../../hooks/useSupabase';

interface SelectedImage {
  id: string;
  description: string;
  category: string;
}

const GalleryEditor: React.FC = () => {
  const { images, loading, error, uploadImage, deleteImage } = useGallery();
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSave = async () => {
    if (!selectedImage || !file) return;

    setSaving(true);
    try {
      await uploadImage(file, selectedImage.description, selectedImage.category);
      setSelectedImage(null);
      setFile(null);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar imagem. Por favor, tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta imagem?')) return;

    try {
      await deleteImage(id);
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao excluir imagem. Por favor, tente novamente.');
    }
  };

  const createNewImage = () => {
    setSelectedImage({
      id: '',
      description: '',
      category: ''
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedImage) {
      setSelectedImage({ ...selectedImage, description: e.target.value });
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedImage) {
      setSelectedImage({ ...selectedImage, category: e.target.value });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando imagens...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-red-600">
            <p>Erro ao carregar imagens: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Galeria</h1>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={createNewImage}
              leftIcon={<Plus size={16} />}
            >
              Nova Imagem
            </Button>
            {selectedImage && (
              <Button
                variant="primary"
                onClick={handleSave}
                isLoading={saving}
                leftIcon={<Save size={16} />}
              >
                Salvar
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-900 mb-4">Imagens</h2>
            <ul className="space-y-2">
              {images.map((image: GalleryImage) => (
                <li key={image.id} className="flex items-center justify-between">
                  <button
                    className={`flex-grow text-left px-3 py-2 rounded-md text-sm ${
                      selectedImage?.id === image.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedImage({
                      id: image.id,
                      description: image.description,
                      category: image.category
                    })}
                  >
                    {image.description || 'Imagem sem descrição'}
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            {selectedImage ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Arquivo da Imagem
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload de arquivo</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">ou arraste e solte</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF até 10MB
                        </p>
                      </div>
                    </div>
                    {file && (
                      <p className="mt-2 text-sm text-gray-500">
                        Arquivo selecionado: {file.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <input
                      type="text"
                      value={selectedImage.description}
                      onChange={handleDescriptionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <input
                      type="text"
                      value={selectedImage.category}
                      onChange={handleCategoryChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-500">
                  Selecione uma imagem para editar ou adicione uma nova
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GalleryEditor;