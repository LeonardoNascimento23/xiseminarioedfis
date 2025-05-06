import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedLectures from '../components/home/FeaturedLectures';
import LatestNews from '../components/home/LatestNews';
import SpeakersHighlight from '../components/home/SpeakersHighlight';
import SchedulePreview from '../components/home/SchedulePreview';
import StatsSection from '../components/home/StatsSection';
import CallToAction from '../components/home/CallToAction';
import { mockLectures, mockNewsArticles, mockSchedule } from '../data/mockData';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedLectures lectures={mockLectures} />
      <StatsSection />
      <SchedulePreview schedule={mockSchedule} />
      <SpeakersHighlight lectures={mockLectures} />
      <LatestNews news={mockNewsArticles} />
      <CallToAction />
    </Layout>
  );
};

export default HomePage;