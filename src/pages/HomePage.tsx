import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedLectures from '../components/home/FeaturedLectures';
import LatestNews from '../components/home/LatestNews';
import SpeakersHighlight from '../components/home/SpeakersHighlight';
import SchedulePreview from '../components/home/SchedulePreview';
import { mockLectures, mockNewsArticles, mockSchedule } from '../data/mockData';

const SectionDivider: React.FC<{ icon: string; alt: string }> = ({ icon, alt }) => (
  <div className="relative py-16">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-200"></div>
    </div>
    <div className="relative flex justify-center">
      <div className="bg-white px-6">
        <img src={icon} alt={alt} className="w-24 h-24" />
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      
      <SectionDivider 
        icon="/images/professor.svg" 
        alt="Ilustração de professor" 
      />
      <FeaturedLectures lectures={mockLectures} />
      
      <SectionDivider 
        icon="/images/calendar.svg" 
        alt="Ilustração de calendário" 
      />
      <SchedulePreview schedule={mockSchedule} />
      
      <SectionDivider 
        icon="/images/conference.svg" 
        alt="Ilustração de conferência" 
      />
      <SpeakersHighlight lectures={mockLectures} />
      
      <SectionDivider 
        icon="/images/newsletter.svg" 
        alt="Ilustração de newsletter" 
      />
      <LatestNews news={mockNewsArticles} />
    </Layout>
  );
};

export default HomePage;