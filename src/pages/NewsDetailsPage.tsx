import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { mockNewsArticles } from '../data/mockData';
import { Card, CardImage, CardBody } from '../components/ui/Card';

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = mockNewsArticles.find(a => a.id === id);
  const relatedArticles = article?.relatedArticles
    ? mockNewsArticles.filter(a => article.relatedArticles?.includes(a.id))
    : [];

  if (!article) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Notícia não encontrada</h2>
            <p className="text-gray-600">A notícia que você está procurando não existe ou foi removida.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/noticias" 
            className="inline-flex items-center text-blue-50 hover:text-white mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar para Notícias
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>
          <div className="flex flex-wrap items-center text-blue-50 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>{article.author}</span>
            </div>
            <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">
              {article.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-8">
            <div className="prose prose-blue max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {article.tags && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-5 w-5 text-gray-500" />
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notícias Relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <Card key={related.id} isHoverable withBorder>
                  <CardImage src={related.imageUrl} alt={related.title} />
                  <CardBody>
                    <div className="flex items-center text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {new Date(related.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {related.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{related.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{related.summary}</p>
                    
                    <Link 
                      to={`/noticias/${related.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Leia mais
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewsDetailsPage;