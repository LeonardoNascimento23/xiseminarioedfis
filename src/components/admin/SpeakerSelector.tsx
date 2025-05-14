import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Speaker } from '../../hooks/useSupabase';
import { Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SpeakerSelectorProps {
  selectedSpeakers: Speaker[];
  onChange: (speakers: Speaker[]) => void;
}

const SpeakerSelector: React.FC<SpeakerSelectorProps> = ({
  selectedSpeakers,
  onChange
}) => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSpeaker, setNewSpeaker] = useState<Partial<Speaker>>({
    name: '',
    bio: '',
    image_url: ''
  });

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const { data, error } = await supabase
        .from('speakers')
        .select('*')
        .order('name');

      if (error) throw error;
      setSpeakers(data || []);
    } catch (error) {
      console.error('Error fetching speakers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSpeaker = async () => {
    if (!newSpeaker.name) return;

    try {
      const { data, error } = await supabase
        .from('speakers')
        .insert([newSpeaker])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        onChange([...selectedSpeakers, data[0]]);
        setSpeakers([...speakers, data[0]]);
        setNewSpeaker({ name: '', bio: '', image_url: '' });
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error adding speaker:', error);
    }
  };

  const handleRemoveSpeaker = (speakerId: string) => {
    onChange(selectedSpeakers.filter((s) => s.id !== speakerId));
  };

  if (loading) {
    return <div>Carregando palestrantes...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {selectedSpeakers.map((speaker) => (
          <div
            key={speaker.id}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
          >
            <span className="text-sm">{speaker.name}</span>
            <button
              onClick={() => handleRemoveSpeaker(speaker.id)}
              className="text-gray-500 hover:text-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <select
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
          onChange={(e) => {
            const speaker = speakers.find((s) => s.id === e.target.value);
            if (speaker && !selectedSpeakers.find((s) => s.id === speaker.id)) {
              onChange([...selectedSpeakers, speaker]);
            }
          }}
          value=""
        >
          <option value="">Selecione um palestrante existente</option>
          {speakers
            .filter((s) => !selectedSpeakers.find((selected) => selected.id === s.id))
            .map((speaker) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.name}
              </option>
            ))}
        </select>

        <Button
          variant="outline"
          onClick={() => setShowModal(true)}
          leftIcon={<Plus size={16} />}
        >
          Novo Palestrante
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Novo Palestrante</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={newSpeaker.name}
                  onChange={(e) =>
                    setNewSpeaker({ ...newSpeaker, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografia
                </label>
                <textarea
                  value={newSpeaker.bio}
                  onChange={(e) =>
                    setNewSpeaker({ ...newSpeaker, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  value={newSpeaker.image_url}
                  onChange={(e) =>
                    setNewSpeaker({ ...newSpeaker, image_url: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddSpeaker}
                  disabled={!newSpeaker.name}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakerSelector; 