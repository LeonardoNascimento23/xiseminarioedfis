import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardImage, CardBody } from '../ui/Card';
import { Lecture } from '../../types';
import Button from '../ui/Button';

interface FeaturedLecturesProps {
  lectures: Lecture[];
}

const FeaturedLectures: React.FC<FeaturedLecturesProps> = ({ lectures }) => {
  // Display only the first 3 lectures
  const featuredLectures = lectures.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Palestras em Destaque</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Confira algumas das palestras mais aguardadas do nosso seminário, ministradas por especialistas renomados na área de Educação Física.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLectures.map((lecture) => (
            <Card key={lecture.id} isHoverable className="h-full flex flex-col">
              <CardImage src={lecture.imageUrl} alt={lecture.title} />
              <CardBody className="flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{lecture.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{lecture.description}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{new Date(lecture.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{lecture.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{lecture.location}</span>
                  </div>
                  
                  <Link to={`/palestras/${lecture.id}`}>
                    <Button 
                      variant="outline" 
                      rightIcon={<ChevronRight size={16} />}
                      className="mt-2"
                      isFullWidth
                    >
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/palestras">
            <Button 
              variant="primary" 
              rightIcon={<ChevronRight size={16} />}
            >
              Ver Todas as Palestras
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLectures;