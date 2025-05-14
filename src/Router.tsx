import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LecturesPage from './pages/LecturesPage';
import LectureDetailsPage from './pages/LectureDetailsPage';
import SchedulePage from './pages/SchedulePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import LectureEditor from './pages/admin/LectureEditor';
import NewsEditor from './pages/admin/NewsEditor';
import GalleryEditor from './pages/admin/GalleryEditor';
import RegistrationPage from './pages/RegistrationPage';
import GalleryPage from './pages/GalleryPage';
import { NoticiasPage } from './pages/NoticiasPage';
import { NoticiaDetailPage } from './pages/NoticiaDetailPage';
import { TestPage } from './pages/TestPage';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/oficinas" element={<LecturesPage />} />
      <Route path="/oficinas/:id" element={<LectureDetailsPage />} />
      <Route path="/noticias" element={<NoticiasPage />} />
      <Route path="/noticias/:slug" element={<NoticiaDetailPage />} />
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
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
} 