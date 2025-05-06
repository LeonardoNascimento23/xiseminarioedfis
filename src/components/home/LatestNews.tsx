import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { Card, CardImage, CardBody } from '../ui/Card';
import { NewsArticle } from '../../types';
import Button from '../ui/Button';

interface LatestNewsProps {
  news: NewsArticle[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ news }) => {
  // Display only the first 3 news articles
  const latestNews = news.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Últimas Notícias</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Fique por dentro das últimas atualizações sobre o Seminário de Educação Física.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((article) => (
            <Card key={article.id} isHoverable withBorder>
              <CardImage src={article.imageUrl} alt={article.title} />
              <CardBody>
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{article.category}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.content.substring(0, 150)}...</p>
                
                <Link to={`/noticias/${article.id}`}>
                  <Button 
                    variant="text" 
                    rightIcon={<ChevronRight size={16} />}
                    className="mt-2 px-0"
                  >
                    Leia mais
                  </Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/noticias">
            <Button 
              variant="outline" 
              rightIcon={<ChevronRight size={16} />}
            >
              Ver Todas as Notícias
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;