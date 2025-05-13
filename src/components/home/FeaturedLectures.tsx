import { Calendar, Clock, MapPin, Users, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Lecture } from '../../types';
import { mockLectures } from "../../data/mockData";
import { Badge } from "../ui/badge";
import { Link } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { useState } from 'react';

const workshopForms = {
  'OFICINA INTRODUÇÃO AO BEACH TENNIS': 'https://docs.google.com/forms/d/e/1FAIpQLSe6YG2wcJDUKVIutGpAIbmMyKX4BoErlQzPraq-ggx0Zmov6Q/viewform?embedded=true',
  'OFICINA NUTRIÇÃO ESPORTIVA APLICADA À HIPERTROFIA E REDUÇÃO DE MASSA GORDA': 'https://docs.google.com/forms/d/e/1FAIpQLSfWYt5r3CGj46fO4h-bFU7tceJ-Lk2rZgLyuZwyy22Soo0FwA/viewform?embedded=true',
  'OFICINA GINÁSTICA RÍTMICA': 'https://docs.google.com/forms/d/e/1FAIpQLSdKMxTTzetNtxk02zXbSmnwxDq0hC-6aISWnVXDoV-KsHhjog/viewform?embedded=true',
  'OFICINA ATIVIDADE FÍSICA FUNCIONAL': 'https://docs.google.com/forms/d/e/1FAIpQLSe3SYwwKbmhW8coOjZJRwFUivSx11bw3DkLOJPrtjCIQ2cdSA/viewform?embedded=true',
  'OFICINA ESPORTES DE AVENTURA': 'https://docs.google.com/forms/d/e/1FAIpQLSekKbjdBAUVqnj23RTbWEq0m7EoiJiYR5_CB89omI7BJrGb4Q/viewform?embedded=true'
};

export function FeaturedLectures() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<{ title: string; formUrl: string } | null>(null);

  const handleOpenModal = (title: string) => {
    const formUrl = workshopForms[title as keyof typeof workshopForms];
    if (formUrl) {
      setSelectedWorkshop({ title, formUrl });
    }
  };

  const handleCloseModal = () => {
    setSelectedWorkshop(null);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oficinas em Destaque</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça as oficinas práticas que serão realizadas durante o evento, ministradas por profissionais renomados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockLectures.map((lecture: Lecture) => (
            <Card key={lecture.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">{lecture.title}</CardTitle>
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
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleOpenModal(lecture.title)}
                >
                  Inscrever-se
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/oficinas">
            <Button variant="outline" className="text-primary hover:text-primary/90">
              Ver Todas as Oficinas
            </Button>
          </Link>
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
    </section>
  );
}

export default FeaturedLectures;