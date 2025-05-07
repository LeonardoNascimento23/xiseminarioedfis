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
        return 'bg-primary/10 text-primary';
      case 'workshop':
        return 'bg-secondary/10 text-secondary';
      case 'break':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Programação</h2>
          <p className="mt-4 text-lg text-gray-600">
            Confira os destaques da nossa programação
          </p>
        </div>

        {/* Date selector tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b">
          {uniqueDates.map((date) => (
            <button
              key={date}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 relative
                ${selectedDate === date 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setSelectedDate(date)}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>

        {/* Schedule timeline */}
        <div className="space-y-8">
          {filteredSchedule.map((event, index) => (
            <div key={event.id} className="relative">
              <div className="flex items-start">
                <div className="hidden sm:block w-24 flex-shrink-0 text-right">
                  <span className={`font-semibold ${index === 0 ? 'text-primary' : 'text-gray-900'}`}>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>

                <div className="flex-grow ml-4 sm:ml-6">
                  <div className="border-l-4 border-gray-200 pl-4 sm:pl-6 pb-8">
                    <div className="relative">
                      <div className="absolute left-0 top-5 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                      <div className="sm:hidden mb-2">
                        <span className="text-primary font-semibold">{event.startTime} - {event.endTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      {event.speaker && (
                        <p className="text-gray-600 mt-1">{event.speaker}</p>
                      )}
                      <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${getActivityTypeStyle(event.type)}`}>
                        {event.type === 'lecture' ? 'Palestra' : event.type === 'workshop' ? 'Workshop' : 'Intervalo'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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