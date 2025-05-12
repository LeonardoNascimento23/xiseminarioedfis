import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { ActivitySchedule } from '../../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/badge";
import { mockSchedule } from "../../data/mockData";

interface SchedulePreviewProps {
  schedule: ActivitySchedule[];
}

const SchedulePreview: React.FC<SchedulePreviewProps> = ({ schedule }) => {
  const uniqueDates = Array.from(new Set(schedule.map(item => item.date)));
  const [selectedDate, setSelectedDate] = useState(uniqueDates[0]);

  // Filter schedule items for selected date
  const filteredSchedule = schedule.filter(item => item.date === selectedDate);

  // Get formatted date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Get activity type style
  const getActivityTypeStyle = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'presentation':
        return 'bg-purple-100 text-purple-800';
      case 'event':
        return 'bg-yellow-100 text-yellow-800';
      case 'break':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get activity type text
  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'Palestra';
      case 'workshop':
        return 'Oficina';
      case 'presentation':
        return 'Apresentação';
      case 'event':
        return 'Evento';
      case 'break':
        return 'Intervalo';
      default:
        return type;
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Programação em Destaque</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Confira as principais atividades programadas para o evento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockSchedule.slice(0, 3).map((activity: ActivitySchedule) => (
            <Card key={activity.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                  {activity.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {activity.type}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(activity.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{activity.startTime} - {activity.endTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{activity.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {activity.description}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Ver Detalhes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="text-primary hover:text-primary/90">
            Ver Programação Completa
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SchedulePreview;