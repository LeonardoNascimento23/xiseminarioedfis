import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import { AuthProvider } from '@/context/AuthContext';
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
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/noticias"
        element={
          <ProtectedRoute>
            <Layout>
              <NewsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/galeria"
        element={
          <ProtectedRoute>
            <Layout>
              <GalleryPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;