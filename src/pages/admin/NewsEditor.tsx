import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useNews, News } from '../../hooks/useSupabase';

const NewsEditor: React.FC = () => {
  const { news, loading, error, createNews, updateNews, deleteNews } = useNews();
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedNews) return;

    setSaving(true);
    try {
      if (selectedNews.id) {
        await updateNews(selectedNews.id, selectedNews);
      } else {
        await createNews(selectedNews);
      }
      setSelectedNews(null);
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Erro ao salvar notícia. Por favor, tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;

    try {
      await deleteNews(id);
      if (selectedNews?.id === id) {
      setSelectedNews(null);
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Erro ao excluir notícia. Por favor, tente novamente.');
    }
  };

  const createNewNews = () => {
    const newNews: Omit<News, 'id' | 'created_at' | 'updated_at'> = {
      title: 'Nova Notícia',
      content: '',
      summary: '',
      date: new Date().toISOString().split('T')[0],
      author: '',
      category: '',
      image_url: '',
      tags: [],
      published: false
    };
    setSelectedNews(newNews as News);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando notícias...</p>
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
            <p>Erro ao carregar notícias: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Notícias</h1>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={createNewNews}
              leftIcon={<Plus size={16} />}
            >
              Nova Notícia
            </Button>
            {selectedNews && (
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
            <h2 className="font-semibold text-gray-900 mb-4">Notícias</h2>
            <ul className="space-y-2">
              {news.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <button
                    className={`flex-grow text-left px-3 py-2 rounded-md text-sm ${
                      selectedNews?.id === item.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedNews(item)}
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
            {selectedNews ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={selectedNews.title}
                      onChange={(e) =>
                        setSelectedNews({ ...selectedNews, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Autor
                    </label>
                    <input
                      type="text"
                      value={selectedNews.author}
                      onChange={(e) =>
                        setSelectedNews({ ...selectedNews, author: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <input
                      type="text"
                      value={selectedNews.category}
                      onChange={(e) =>
                        setSelectedNews({ ...selectedNews, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      value={selectedNews.date}
                      onChange={(e) =>
                        setSelectedNews({ ...selectedNews, date: e.target.value })
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
                      value={selectedNews.image_url}
                      onChange={(e) =>
                        setSelectedNews({ ...selectedNews, image_url: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      value={selectedNews.tags.join(', ')}
                      onChange={(e) =>
                        setSelectedNews({
                          ...selectedNews,
                          tags: e.target.value.split(',').map((tag) => tag.trim())
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resumo
                    </label>
                    <textarea
                      value={selectedNews.summary}
                      onChange={(e) =>
                        setSelectedNews({ ...selectedNews, summary: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Conteúdo
                    </label>
                    <textarea
                      value={selectedNews.content}
                      onChange={(e) =>
                        setSelectedNews({ ...selectedNews, content: e.target.value })
                      }
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedNews.published}
                        onChange={(e) =>
                          setSelectedNews({
                            ...selectedNews,
                            published: e.target.checked
                          })
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Publicar notícia
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                  Selecione uma notícia para editar ou crie uma nova
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsEditor;