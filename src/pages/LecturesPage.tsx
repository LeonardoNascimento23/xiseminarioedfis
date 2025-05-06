import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardImage, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { mockLectures } from '../data/mockData';
import { Lecture } from '../types';

const LecturesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique dates for filtering
  const uniqueDates = Array.from(new Set(mockLectures.map(lecture => lecture.date)));

  // Filter lectures based on search term and date filter
  const filteredLectures = mockLectures.filter((lecture) => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lecture.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = dateFilter ? lecture.date === dateFilter : true;
    
    return matchesSearch && matchesDate;
  });

  return (
    <Layout>
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Palestras e Workshops</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Explore todas as palestras e workshops disponíveis no nosso seminário e inscreva-se para participar.
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
                className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Buscar palestras, temas ou palestrantes..."
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Data</label>
                  <select
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="">Todas as datas</option>
                    {uniqueDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {filteredLectures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLectures.map((lecture) => (
              <Card key={lecture.id} isHoverable withBorder className="h-full flex flex-col">
                <CardImage src={lecture.imageUrl} alt={lecture.title} />
                <CardBody className="flex-grow flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{lecture.title}</h2>
                  <p className="text-gray-600 mb-3 line-clamp-3">{lecture.description}</p>
                  <p className="text-blue-700 font-medium mb-4">{lecture.speaker}</p>
                  
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{new Date(lecture.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{lecture.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{lecture.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {lecture.currentParticipants}/{lecture.maxParticipants} inscritos
                      </span>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(lecture.currentParticipants / lecture.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Link to={`/palestras/${lecture.id}`} className="block mt-4">
                      <Button variant="primary" isFullWidth>
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma palestra encontrada</h3>
            <p className="text-gray-600">Tente ajustar seus critérios de busca ou filtros.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LecturesPage;