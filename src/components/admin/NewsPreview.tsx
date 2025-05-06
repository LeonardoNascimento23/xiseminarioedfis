import React from 'react';
import { News } from '../../hooks/useSupabase';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NewsPreviewProps {
  news: News;
}

const NewsPreview: React.FC<NewsPreviewProps> = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{news.title}</h1>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>Por {news.author}</span>
          <span>•</span>
          <span>{format(new Date(news.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
          <span>•</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {news.category}
          </span>
        </div>
      </div>

      {news.image_url && (
        <div className="mb-6">
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {news.summary && (
        <div className="mb-6">
          <p className="text-lg text-gray-700 italic border-l-4 border-blue-500 pl-4">
            {news.summary}
          </p>
        </div>
      )}

      <div className="prose max-w-none">
        {news.content.split('\n').map((paragraph: string, index: number) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>

      {news.tags && news.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {news.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPreview; 