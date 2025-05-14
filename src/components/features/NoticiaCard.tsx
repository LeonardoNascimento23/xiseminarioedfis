import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NoticiaCardProps {
  title: string;
  date: string;
  summary: string;
  thumbnail?: string;
  slug: string;
  category: string;
}

export const NoticiaCard: React.FC<NoticiaCardProps> = ({
  title,
  date,
  summary,
  thumbnail,
  slug,
  category,
}) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {thumbnail && (
        <div className="relative h-48">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
            {category}
          </span>
        </div>
      )}
      <div className="p-4">
        <time className="text-sm text-gray-500">
          {format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </time>
        <h2 className="text-xl font-semibold mt-2 mb-2">
          <Link to={`/noticias/${slug}`} className="hover:text-blue-600">
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 line-clamp-3">{summary}</p>
        <Link
          to={`/noticias/${slug}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-800"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  );
}; 