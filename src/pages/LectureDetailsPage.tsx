import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Calendar, Clock, MapPin, User, Users, Award, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockLectures } from '../data/mockData';
import { Breadcrumb } from '../components/ui/Breadcrumb';

const workshopForms = {
  'OFICINA INTRODUÇÃO AO BEACH TENNIS': 'https://docs.google.com/forms/d/e/1FAIpQLSe6YG2wcJDUKVIutGpAIbmMyKX4BoErlQzPraq-ggx0Zmov6Q/viewform?embedded=true',
  'OFICINA NUTRIÇÃO ESPORTIVA APLICADA À HIPERTROFIA E REDUÇÃO DE MASSA GORDA': 'https://docs.google.com/forms/d/e/1FAIpQLSfWYt5r3CGj46fO4h-bFU7tceJ-Lk2rZgLyuZwyy22Soo0FwA/viewform?embedded=true',
  'OFICINA GINÁSTICA RÍTMICA': 'https://docs.google.com/forms/d/e/1FAIpQLSdKMxTTzetNtxk02zXbSmnwxDq0hC-6aISWnVXDoV-KsHhjog/viewform?embedded=true',
  'OFICINA ATIVIDADE FÍSICA FUNCIONAL': 'https://docs.google.com/forms/d/e/1FAIpQLSe3SYwwKbmhW8coOjZJRwFUivSx11bw3DkLOJPrtjCIQ2cdSA/viewform?embedded=true',
  'OFICINA ESPORTES DE AVENTURA': 'https://docs.google.com/forms/d/e/1FAIpQLSekKbjdBAUVqnj23RTbWEq0m7EoiJiYR5_CB89omI7BJrGb4Q/viewform?embedded=true'
};

const LectureDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedWorkshop, setSelectedWorkshop] = useState<{ title: string; formUrl: string } | null>(null);

  const lecture = mockLectures.find((l) => l.id === id);

  const handleOpenModal = (title: string) => {
    const formUrl = workshopForms[title as keyof typeof workshopForms];
    if (formUrl) {
      setSelectedWorkshop({ title, formUrl });
    }
  };

  const handleCloseModal = () => {
    setSelectedWorkshop(null);
  };

  if (!lecture) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Palestra não encontrada</h1>
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
          <Breadcrumb
            items={[
              { label: 'Oficinas', href: '/oficinas' },
              { label: lecture?.title || 'Detalhes da Oficina' }
            ]}
            className="mb-6"
          />
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
              onClick={() => handleOpenModal(lecture.title)}
            >
              Inscrever-se nesta oficina
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Palestra</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {lecture.description}
              </p>
            </div>

            {lecture.learningPoints && lecture.learningPoints.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">O que você vai aprender</h2>
                <ul className="space-y-3">
                  {lecture.learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                        {index + 1}
                      </div>
                      <p className="ml-3 text-gray-600">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informações</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Data</p>
                    <p className="text-gray-600">
                      {new Date(lecture.date).toLocaleDateString('pt-BR')}
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
                variant="secondary"
                size="lg"
                className="mt-6 w-full"
                onClick={() => handleOpenModal(lecture.title)}
              >
                Inscrever-se nesta oficina
              </Button>
            </div>
          </div>
        </div>
      </div>

      {selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedWorkshop.title}</h3>
            <div className="w-full h-[600px]">
              <iframe
                src={selectedWorkshop.formUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-lg"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                loading="lazy"
                title={`Formulário de inscrição - ${selectedWorkshop.title}`}
                referrerPolicy="no-referrer"
              >
                Carregando…
              </iframe>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LectureDetailsPage;