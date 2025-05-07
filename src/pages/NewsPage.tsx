import React, { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardImage, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useSupabase';

const NewsPage: React.FC = () => {
  const { news, loading, error } = useNews();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories for filtering
  const uniqueCategories = Array.from(new Set(news.map(article => article.category)));

  // Filter articles based on search term and category filter
  const filteredArticles = news.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter ? article.category === categoryFilter : true;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
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
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Notícias</h1>
          <p className="text-gray-100 text-lg max-w-3xl mx-auto">
            Fique por dentro das últimas novidades do seminário
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-auto md:flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              {showFilters ? 'Esconder Filtros' : 'Mostrar Filtros'}
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Categoria</label>
                  <select
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">Todas as categorias</option>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card key={article.id} isHoverable withBorder>
                <CardImage src={article.image_url} alt={article.title} />
                <CardBody>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-primary bg-primary/10 px-2 py-0.5 rounded-full">{article.category}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.content.substring(0, 150)}...</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Por {article.author}</span>
                    <Link to={`/noticias/${article.id}`}>
                      <Button variant="primary" size="sm">
                        Leia mais
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-600">Tente ajustar seus critérios de busca ou filtros.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewsPage;