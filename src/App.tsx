import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/oficinas" element={<LecturesPage />} />
          <Route path="/oficinas/:id" element={<LectureDetailsPage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:id" element={<NewsDetailsPage />} />
          <Route path="/programacao" element={<SchedulePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/lectures" element={<LectureEditor />} />
          <Route path="/admin/news" element={<NewsEditor />} />
          <Route path="/admin/gallery" element={<GalleryEditor />} />
          <Route path="/inscricao" element={<RegistrationPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;