import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { supabase } from '../lib/supabase';
import { Speaker } from '../hooks/useSupabase';

interface Lecture {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  max_participants: number;
  current_participants: number;
  learning_points: string[];
  published: boolean;
  lecture_speakers: {
    speaker: Speaker;
  }[];
}

const Lectures: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const { data, error } = await supabase
        .from('lectures')
        .select('*, lecture_speakers(speaker:speakers(*))')
        .eq('published', true)
        .order('date', { ascending: true });

      if (error) throw error;
      setLectures(data || []);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Carregando palestras...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Palestras</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {lecture.image_url && (
                <img
                  src={lecture.image_url}
                  alt={lecture.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {lecture.title}
                </h2>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Data:</span>{' '}
                    {new Date(lecture.date).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Horário:</span> {lecture.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Local:</span> {lecture.location}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Palestrantes:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {lecture.lecture_speakers.map(({ speaker }) => (
                      <div
                        key={speaker.id}
                        className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {speaker.image_url && (
                          <img
                            src={speaker.image_url}
                            alt={speaker.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                        <span className="text-sm">{speaker.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{lecture.description}</p>

                {lecture.learning_points.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      O que você vai aprender:
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {lecture.learning_points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    {lecture.current_participants} / {lecture.max_participants}{' '}
                    participantes
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Lectures; 