import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Calendar, Clock, MapPin, User, Users, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockLectures } from '../data/mockData';

const LectureDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const lecture = mockLectures.find(l => l.id === id);

  if (!lecture) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Palestra não encontrada</h2>
            <p className="text-gray-600">A palestra que você está procurando não existe ou foi removida.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{lecture.title}</h1>
              <div className="flex items-center text-gray-100">
                <User className="h-5 w-5 mr-2" />
                <span>{lecture.speaker}</span>
              </div>
            </div>
            <Button 
              variant="secondary"
              size="lg"
              className="w-full md:w-auto"
            >
              Inscrever-se nesta palestra
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Palestra</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{lecture.description}</p>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">O que você vai aprender</h3>
                <ul className="space-y-3">
                  {lecture.learningPoints?.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Palestrante</h2>
              <div className="flex items-start space-x-4">
                <img 
                  src={lecture.speakerImage || 'https://via.placeholder.com/150'} 
                  alt={lecture.speaker}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{lecture.speaker}</h3>
                  <p className="text-gray-600 leading-relaxed">{lecture.speakerBio}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações da Palestra</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Data</p>
                    <p className="text-gray-600">
                      {new Date(lecture.date).toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Horário</p>
                    <p className="text-gray-600">{lecture.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Local</p>
                    <p className="text-gray-600">{lecture.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Vagas Disponíveis</p>
                    <p className="text-gray-600">
                      {lecture.maxParticipants - (lecture.currentParticipants || 0)} vagas restantes
                    </p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ 
                          width: `${((lecture.currentParticipants || 0) / lecture.maxParticipants) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                variant="primary"
                size="lg"
                isFullWidth
                className="mt-6"
              >
                Inscrever-se nesta palestra
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LectureDetailsPage;