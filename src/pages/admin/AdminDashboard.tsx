import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Image, BookOpen, Newspaper } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const menuItems = [
    {
      title: 'Gerenciar Palestras',
      description: 'Adicione, edite e remova palestras e workshops',
      icon: BookOpen,
      link: '/admin/lectures'
    },
    {
      title: 'Gerenciar Notícias',
      description: 'Publique e gerencie notícias do seminário',
      icon: Newspaper,
      link: '/admin/news'
    },
    {
      title: 'Galeria de Fotos',
      description: 'Gerencie as fotos da galeria do evento',
      icon: Image,
      link: '/admin/gallery'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="mt-2 text-gray-600">
            Gerencie todo o conteúdo do site através deste painel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <item.icon className="h-6 w-6 text-blue-700" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;