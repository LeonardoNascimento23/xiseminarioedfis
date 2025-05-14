import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Save, Eye } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  published: boolean;
}

const ContentEditor: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('pages')
        .upsert({
          id: selectedPage.id,
          slug: selectedPage.slug,
          title: selectedPage.title,
          content: selectedPage.content,
          published: selectedPage.published,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      await fetchPages();
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Editor de Conteúdo</h1>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => setPreview(!preview)}
              leftIcon={<Eye size={16} />}
            >
              {preview ? 'Editar' : 'Visualizar'}
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={saving}
              leftIcon={<Save size={16} />}
            >
              Salvar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-900 mb-4">Páginas</h2>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.id}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      selectedPage?.id === page.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPage(page)}
                  >
                    {page.title}
                    {!page.published && (
                      <span className="ml-2 text-xs text-gray-500">(Rascunho)</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            {selectedPage ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={selectedPage.title}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={preview}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conteúdo (Markdown)
                  </label>
                  <textarea
                    value={selectedPage.content}
                    onChange={(e) =>
                      setSelectedPage({ ...selectedPage, content: e.target.value })
                    }
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
                    disabled={preview}
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPage.published}
                      onChange={(e) =>
                        setSelectedPage({
                          ...selectedPage,
                          published: e.target.checked
                        })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={preview}
                    />
                    <span className="ml-2 text-sm text-gray-700">Publicado</span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-500">
                  Selecione uma página para começar a editar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContentEditor;