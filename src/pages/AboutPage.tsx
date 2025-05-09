import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';

const AboutPage: React.FC = () => {
  const [content, setContent] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('title, content')
          .eq('slug', 'about')
          .eq('published', true)
          .single();

        if (error) throw error;
        setContent(data);
      } catch (error) {
        console.error('Error fetching about page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-primary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {content?.title || 'Sobre o Seminário'}
          </h1>
          <p className="text-yellow-100 text-lg max-w-3xl mx-auto">
            Conheça mais sobre nossa missão, valores e história
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="prose prose-lg prose-primary max-w-none">
            {content ? (
              <ReactMarkdown>{content.content}</ReactMarkdown>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-primary mb-2">
                  Conteúdo não encontrado
                </h3>
                <p className="text-gray-600">
                  O conteúdo desta página ainda não foi publicado.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AboutPage;