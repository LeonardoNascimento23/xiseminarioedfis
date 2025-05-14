import React from 'react';
import { useContentList } from '../hooks/useContent';
import { NoticiaCard } from '../components/features/NoticiaCard';

export const NoticiasPage: React.FC = () => {
  const { contents, loading, error } = useContentList('noticias');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Erro ao carregar notícias: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notícias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((noticia) => (
          <NoticiaCard
            key={noticia.slug}
            title={noticia.title}
            date={noticia.date}
            summary={noticia.summary}
            thumbnail={noticia.thumbnail}
            slug={noticia.slug}
            category={noticia.category}
          />
        ))}
      </div>
      {contents.length === 0 && (
        <p className="text-center text-gray-500">Nenhuma notícia encontrada.</p>
      )}
    </div>
  );
}; 