export interface ActivitySchedule {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'lecture' | 'workshop' | 'presentation' | 'event' | 'break';
  location: string;
  description: string;
  status: string;
  speaker?: string;
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

export interface Speaker {
  id: string;
  name: string;
  bio?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  description?: string;
  category?: string;
  albumId?: string;
  tags: string[];
  createdAt: string;
}

export interface AdminLog {
  id: string;
  userId: string;
  action: string;
  tableName: string;
  recordId: string;
  details: any;
  createdAt: string;
}

export interface Backup {
  id: string;
  filePath: string;
  sizeBytes: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
  completedAt?: string;
}