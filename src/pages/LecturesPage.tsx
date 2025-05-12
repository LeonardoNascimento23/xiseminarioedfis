import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, Filter, Users } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardImage, CardBody, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { mockLectures } from '../data/mockData';
import { Lecture } from '../types';
import { Badge } from "../components/ui/badge";

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
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Palestras e Workshops</h1>
          <p className="text-gray-100 text-lg max-w-3xl mx-auto">
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
                className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Buscar palestras, temas ou palestrantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Esconder Filtros' : 'Mostrar Filtros'}
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Data</label>
                  <select
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
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
              <Card key={lecture.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={lecture.imageUrl}
                    alt={lecture.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary/90 text-white">
                    Oficina
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                    {lecture.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {lecture.speaker}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(lecture.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{lecture.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{lecture.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{lecture.currentParticipants}/{lecture.maxParticipants} participantes</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {lecture.description}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Inscrever-se
                  </Button>
                </CardFooter>
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