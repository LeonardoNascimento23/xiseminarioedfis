export interface ActivitySchedule {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'event' | 'presentation' | 'workshop';
  location: string;
}

export interface EventInfo {
  title: string;
  description: string;
  registrationDeadline: string;
  contact: {
    email: string;
    phone: string;
  };
  organizers: {
    name: string;
    role: string;
    course: string;
    institution: string;
  }[];
  logos: {
    ufgd: string;
    faed: string;
    edFisica: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Lecture {
  id: string;
  title: string;
  speaker: string;
  speakerBio?: string;
  speakerImage?: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  maxParticipants: number;
  currentParticipants: number;
  learningPoints?: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary?: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  tags?: string[];
  relatedArticles?: string[];
}