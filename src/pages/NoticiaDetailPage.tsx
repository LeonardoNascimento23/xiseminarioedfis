import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Noticia {
  id: string;
  title: string;
  summary: string;
  body: string;
  thumbnail: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
}

export default function NoticiaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNoticia() {
      try {
        const { data, error } = await supabase
          .from('noticias')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setNoticia(data as Noticia);
      } catch (err) {
        console.error('Erro ao carregar notícia:', err);
        setError('Erro ao carregar a notícia. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchNoticia();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !noticia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Notícia não encontrada'}
          </h2>
          <Link to="/noticias">
            <Button variant="primary">Voltar para Notícias</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/noticias" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para Notícias
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {noticia.thumbnail && (
            <img
              src={noticia.thumbnail}
              alt={noticia.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {noticia.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-8">
              <time dateTime={noticia.date}>
                {format(new Date(noticia.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </time>
              <span className="mx-2">•</span>
              <span>Por {noticia.author}</span>
              <span className="mx-2">•</span>
              <Link
                to={`/noticias/categoria/${noticia.category}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {noticia.category}
              </Link>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-8">
                {noticia.summary}
              </p>
              <div className="text-gray-800">
                {noticia.body}
              </div>
            </div>

            {noticia.tags && noticia.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {noticia.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      to={`/noticias/tag/${tag}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      <Tag className="h-4 w-4 mr-1" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
} 