import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import { Plus, Save, Trash2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  published: boolean;
}

const GalleryEditor: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedItem) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('gallery')
        .upsert({
          ...selectedItem,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      await fetchGalleryItems();
    } catch (error) {
      console.error('Error saving gallery item:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta imagem?')) return;

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchGalleryItems();
      setSelectedItem(null);
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  const createNewItem = () => {
    const newItem: GalleryItem = {
      id: '',
      title: 'Nova Imagem',
      description: '',
      image_url: '',
      published: false
    };
    setSelectedItem(newItem);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Galeria</h1>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={createNewItem}
              leftIcon={<Plus size={16} />}
            >
              Nova Imagem
            </Button>
            {selectedItem && (
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-900 mb-4">Imagens</h2>
            <ul className="space-y-2">
              {galleryItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <button
                    className={`flex-grow text-left px-3 py-2 rounded-md text-sm ${
                      selectedItem?.id === item.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    {item.title}
                    {!item.published && (
                      <span className="ml-2 text-xs text-gray-500">(Rascunho)</span>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            {selectedItem ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={selectedItem.title}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL da Imagem
                    </label>
                    <input
                      type="text"
                      value={selectedItem.image_url}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, image_url: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {selectedItem.image_url && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prévia
                      </label>
                      <img
                        src={selectedItem.image_url}
                        alt={selectedItem.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={selectedItem.description}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, description: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedItem.published}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            published: e.target.checked
                          })
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Publicado</span>
                    </label>
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