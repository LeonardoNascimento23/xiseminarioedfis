import React from 'react';
import { Lecture } from '../../types';

interface SpeakersHighlightProps {
  lectures: Lecture[];
}

const SpeakersHighlight: React.FC<SpeakersHighlightProps> = ({ lectures }) => {
  // Extract unique speakers from lectures
  const speakers = Array.from(
    new Set(
      lectures.map(lecture => ({
        name: lecture.speaker,
        bio: lecture.speakerBio,
        imageUrl: lecture.imageUrl
      }))
    )
  ).slice(0, 4); // Limit to 4 speakers

  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Palestrantes de Destaque</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos especialistas que estarão compartilhando conhecimento e experiência em nosso seminário.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <div 
              key={index} 
              className="text-center group"
            >
              <div className="relative mx-auto w-40 h-40 mb-4 rounded-full overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={speaker.imageUrl} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{speaker.name}</h3>
              <p className="mt-2 text-gray-600 text-sm line-clamp-3">{speaker.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersHighlight;