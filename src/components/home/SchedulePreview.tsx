import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import { ActivitySchedule } from '../../types';
import Button from '../ui/Button';

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
      case 'break':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Programação do Evento</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Confira a programação completa do nosso seminário e planeje sua participação.
          </p>
        </div>

        {/* Date selector tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b">
          {uniqueDates.map((date) => (
            <button
              key={date}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 relative
                ${selectedDate === date 
                  ? 'text-blue-700 border-b-2 border-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setSelectedDate(date)}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>

        {/* Schedule timeline */}
        <div className="relative">
          <div className="border-l-4 border-blue-200 ml-4 sm:ml-6 pb-8">
            {filteredSchedule.map((item, index) => (
              <div key={item.id} className="relative pl-8 sm:pl-10 py-4">
                <div className="absolute left-0 top-5 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-700"></div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  <span className="text-blue-700 font-semibold mr-4 mb-2 sm:mb-0">
                    {item.startTime} - {item.endTime}
                  </span>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-full transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full uppercase ${getActivityTypeStyle(item.type)}`}>
                        {item.type === 'lecture' ? 'Palestra' : item.type === 'workshop' ? 'Workshop' : 'Intervalo'}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 text-sm">
                      <div className="flex items-center mr-4 mb-2 sm:mb-0">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.startTime} - {item.endTime}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/programacao">
            <Button variant="primary">
              Ver Programação Completa
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SchedulePreview;