import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Plus, Save, Trash2 } from 'lucide-react';
import SpeakerSelector from '../../components/admin/SpeakerSelector';
import { Speaker } from '../../hooks/useSupabase';

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
  speakers: Speaker[];
}

const LectureEditor: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchLectures = async () => {
    try {
      const { data, error } = await supabase
        .from('lectures')
        .select('*, lecture_speakers(speaker:speakers(*))')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLectures(data || []);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  const handleSave = async () => {
    if (!selectedLecture) return;

    setSaving(true);
    try {
      const { speakers, ...lectureData } = selectedLecture;
      const { data, error } = await supabase
        .from('lectures')
        .upsert({
          ...lectureData,
          updated_at: new Date().toISOString()
        })
        .select();

      if (error) throw error;

      // Atualizar palestrantes
      if (data && data[0]) {
        const lectureId = data[0].id;
        // Remover palestrantes existentes
        await supabase
          .from('lecture_speakers')
          .delete()
          .eq('lecture_id', lectureId);

        // Adicionar novos palestrantes
        if (speakers.length > 0) {
          const speakerRelations = speakers.map((speaker) => ({
            lecture_id: lectureId,
            speaker_id: speaker.id
          }));

          await supabase
            .from('lecture_speakers')
            .insert(speakerRelations);
        }
      }

      await fetchLectures();
    } catch (error) {
      console.error('Error saving lecture:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta palestra?')) return;

    try {
      const { error } = await supabase
        .from('lectures')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchLectures();
      setSelectedLecture(null);
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  const createNewLecture = () => {
    const newLecture: Lecture = {
      id: '',
      title: 'Nova Palestra',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      location: '',
      image_url: '',
      max_participants: 0,
      current_participants: 0,
      learning_points: [],
      published: false,
      speakers: []
    };
    setSelectedLecture(newLecture);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Palestras</h1>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={createNewLecture}
              leftIcon={<Plus size={16} />}
            >
              Nova Palestra
            </Button>
            {selectedLecture && (
              <Button
                variant="primary"
                onClick={handleSave}
                isLoading={saving}
                leftIcon={<Save size={16} />}
              >
                Salvar
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold text-gray-900 mb-4">Palestras</h2>
            <ul className="space-y-2">
              {lectures.map((lecture) => (
                <li key={lecture.id} className="flex items-center justify-between">
                  <button
                    className={`flex-grow text-left px-3 py-2 rounded-md text-sm ${
                      selectedLecture?.id === lecture.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedLecture(lecture)}
                  >
                    {lecture.title}
                    {!lecture.published && (
                      <span className="ml-2 text-xs text-gray-500">(Rascunho)</span>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(lecture.id)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            {selectedLecture ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={selectedLecture.title}
                      onChange={(e) =>
                        setSelectedLecture({ ...selectedLecture, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Palestrantes
                    </label>
                    <SpeakerSelector
                      selectedSpeakers={selectedLecture.speakers}
                      onChange={(speakers) =>
                        setSelectedLecture({ ...selectedLecture, speakers })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data
                    </label>
                    <input
                      type="date"
                      value={selectedLecture.date}
                      onChange={(e) =>
                        setSelectedLecture({ ...selectedLecture, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horário
                    </label>
                    <input
                      type="time"
                      value={selectedLecture.time}
                      onChange={(e) =>
                        setSelectedLecture({ ...selectedLecture, time: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Local
                    </label>
                    <input
                      type="text"
                      value={selectedLecture.location}
                      onChange={(e) =>
                        setSelectedLecture({ ...selectedLecture, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL da Imagem
                    </label>
                    <input
                      type="text"
                      value={selectedLecture.image_url}
                      onChange={(e) =>
                        setSelectedLecture({ ...selectedLecture, image_url: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número Máximo de Participantes
                    </label>
                    <input
                      type="number"
                      value={selectedLecture.max_participants}
                      onChange={(e) =>
                        setSelectedLecture({
                          ...selectedLecture,
                          max_participants: parseInt(e.target.value)
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={selectedLecture.description}
                      onChange={(e) =>
                        setSelectedLecture({
                          ...selectedLecture,
                          description: e.target.value
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pontos de Aprendizagem (um por linha)
                    </label>
                    <textarea
                      value={selectedLecture.learning_points.join('\n')}
                      onChange={(e) =>
                        setSelectedLecture({
                          ...selectedLecture,
                          learning_points: e.target.value.split('\n').filter(Boolean)
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedLecture.published}
                        onChange={(e) =>
                          setSelectedLecture({
                            ...selectedLecture,
                            published: e.target.checked
                          })
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Publicado</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-500">
                  Selecione uma palestra para editar ou crie uma nova
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LectureEditor;