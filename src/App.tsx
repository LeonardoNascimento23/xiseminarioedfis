import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LecturesPage from './pages/LecturesPage';
import LectureDetailsPage from './pages/LectureDetailsPage';
import NewsPage from './pages/NewsPage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import SchedulePage from './pages/SchedulePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import LectureEditor from './pages/admin/LectureEditor';
import NewsEditor from './pages/admin/NewsEditor';
import GalleryEditor from './pages/admin/GalleryEditor';
import AdminDashboard from './pages/admin/AdminDashboard';
import RegistrationPage from './pages/RegistrationPage';
import GalleryPage from './pages/GalleryPage';
import { AuthProvider } from '@/context/AuthContext';
import { NoticiasPage } from './pages/NoticiasPage';
import { NoticiaDetailPage } from './pages/NoticiaDetailPage';
import { Router } from './Router';

// Configurar flags futuras do React Router
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <BrowserRouter {...router}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;