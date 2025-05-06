import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
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

  return (
    <Layout>
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Programação Completa</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Confira a programação detalhada do Seminário de Educação Física e planeje sua participação.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Date selector */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {uniqueDates.map((date) => (
              <button
                key={date}
                className={`p-4 text-left transition-colors duration-200 ${
                  selectedDate === date 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="flex items-center">
                  <Calendar className={`h-5 w-5 mr-2 ${selectedDate === date ? 'text-blue-700' : 'text-gray-500'}`} />
                  <div>
                    <span className="block text-sm text-gray-500">
                      {new Date(date).toLocaleDateString('pt-BR', { weekday: 'long' })}
                    </span>
                    <span className={`font-medium ${selectedDate === date ? 'text-blue-700' : 'text-gray-900'}`}>
                      {new Date(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {formatDate(selectedDate)}
            </h2>

            {sortedTimeBlocks.length > 0 ? (
              <div className="space-y-8">
                {sortedTimeBlocks.map((timeBlock) => (
                  <div key={timeBlock} className="relative">
                    <div className="flex items-center mb-4">
                      <Clock className="h-5 w-5 text-blue-700 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">{timeBlock}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {scheduleByTime[timeBlock].map((activity) => (
                        <div 
                          key={activity.id} 
                          className={`rounded-lg border-l-4 shadow-sm bg-white overflow-hidden ${getActivityTypeStyle(activity.type)}`}
                        >
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-semibold text-gray-900">{activity.title}</h4>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-20 text-gray-800 bg-gray-200">
                                {getActivityTypeText(activity.type)}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{activity.location}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{activity.startTime} - {activity.endTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Nenhuma atividade programada para esta data.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg border border-blue-100 p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Legenda</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
              <span className="text-gray-700">Palestras</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
              <span className="text-gray-700">Workshops</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-500 mr-2"></div>
              <span className="text-gray-700">Intervalos</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePage;