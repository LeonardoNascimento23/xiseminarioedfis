import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardImage, CardBody } from '../ui/Card';
import { NewsArticle } from '../../types';
import { mockNewsArticles } from '../../data/mockData';

export function LatestNews() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Últimas Notícias</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fique por dentro das últimas novidades e atualizações sobre o evento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNewsArticles.slice(0, 3).map((article: NewsArticle) => (
            <Card key={article.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <CardImage src={article.imageUrl} alt={article.title} />
              <CardBody className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-auto">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{article.author}</span>
                  </div>
                  
                  <Link to={`/noticias/${article.id}`}>
                    <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                      Ler Mais
                    </button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/noticias">
            <button className="bg-transparent text-primary border border-primary py-2 px-6 rounded-md hover:bg-primary/10 transition-colors">
              Ver Todas as Notícias
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestNews