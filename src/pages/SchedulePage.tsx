import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { mockSchedule } from '../data/mockData';
import { ActivitySchedule } from '../types';

const SchedulePage: React.FC = () => {
  const uniqueDates = Array.from(new Set(mockSchedule.map(item => item.date)));
  const [selectedDate, setSelectedDate] = useState(uniqueDates[0]);

  // Filter schedule items for selected date
  const filteredSchedule = mockSchedule.filter(item => item.date === selectedDate);

  // Group activities by time block
  const scheduleByTime = filteredSchedule.reduce((acc, item) => {
    const timeBlock = `${item.startTime}-${item.endTime}`;
    if (!acc[timeBlock]) {
      acc[timeBlock] = [];
    }
    acc[timeBlock].push(item);
    return acc;
  }, {} as Record<string, ActivitySchedule[]>);

  // Sort time blocks
  const sortedTimeBlocks = Object.keys(scheduleByTime).sort();

  // Format date for display
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
        return 'bg-blue-600 border-blue-700';
      case 'workshop':
        return 'bg-green-600 border-green-700';
      case 'break':
        return 'bg-gray-500 border-gray-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  // Get activity type text
  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'Palestra';
      case 'workshop':
        return 'Workshop';
      case 'break':
        return 'Intervalo';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Em andamento') {
      return 'bg-primary border-primary-dark';
    }
    return 'bg-gray-200 border-gray-300';
  };

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Programação do Evento</h1>
          <p className="text-gray-100 text-lg max-w-3xl mx-auto">
            Confira a programação completa do seminário
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Datas</h3>
              <div className="space-y-2">
                {uniqueDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      selectedDate === date ? 'bg-primary/10 text-primary' : 'text-gray-500'
                    }`}
                  >
                    <Calendar className={`h-5 w-5 mr-2 ${selectedDate === date ? 'text-primary' : 'text-gray-500'}`} />
                    <span className={`font-medium ${selectedDate === date ? 'text-primary' : 'text-gray-900'}`}>
                      {date}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-8">
              {scheduleByTime[selectedDate].map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-600">{event.startTime} - {event.endTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  {event.speaker && (
                    <div className="flex items-center text-gray-600">
                      <User className="h-5 w-5 mr-2" />
                      <span>{event.speaker}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="mt-4 flex items-center">
                    <div className={`h-2 w-24 rounded-full ${getStatusColor(event.status)}`}></div>
                    <span className="ml-2 text-sm text-gray-500">{event.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Legenda</h3>
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
              <span className="text-gray-600">Em andamento</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
              <span className="text-gray-600">Aguardando</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePage;