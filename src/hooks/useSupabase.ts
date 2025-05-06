import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface News {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  image_url: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lecture {
  id: string;
  title: string;
  speaker: string;
  speaker_bio: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  max_participants: number;
  current_participants: number;
  learning_points: string[];
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  description: string;
  category: string;
  created_at: string;
}

export function useNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar notícias');
    } finally {
      setLoading(false);
    }
  };

  const createNews = async (newsData: Omit<News, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([newsData])
        .select();

      if (error) throw error;
      await fetchNews();
      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const updateNews = async (id: string, newsData: Partial<News>) => {
    try {
      const { error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', id);

      if (error) throw error;
      await fetchNews();
    } catch (error) {
      throw error;
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchNews();
    } catch (error) {
      throw error;
    }
  };

  return {
    news,
    loading,
    error,
    createNews,
    updateNews,
    deleteNews,
    refreshNews: fetchNews
  };
}

export function useLectures() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const { data, error } = await supabase
        .from('lectures')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setLectures(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar palestras');
    } finally {
      setLoading(false);
    }
  };

  const createLecture = async (lectureData: Omit<Lecture, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('lectures')
        .insert([lectureData])
        .select();

      if (error) throw error;
      await fetchLectures();
      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const updateLecture = async (id: string, lectureData: Partial<Lecture>) => {
    try {
      const { error } = await supabase
        .from('lectures')
        .update(lectureData)
        .eq('id', id);

      if (error) throw error;
      await fetchLectures();
    } catch (error) {
      throw error;
    }
  };

  const deleteLecture = async (id: string) => {
    try {
      const { error } = await supabase
        .from('lectures')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchLectures();
    } catch (error) {
      throw error;
    }
  };

  return {
    lectures,
    loading,
    error,
    createLecture,
    updateLecture,
    deleteLecture,
    refreshLectures: fetchLectures
  };
}

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar imagens');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, description: string, category: string) => {
    try {
      // Verifica se o arquivo é uma imagem
      if (!file.type.startsWith('image/')) {
        throw new Error('O arquivo deve ser uma imagem');
      }

      // Verifica o tamanho do arquivo (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('O arquivo deve ter no máximo 10MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // Upload do arquivo para o storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        throw new Error('Erro ao fazer upload da imagem');
      }

      // Obtém a URL pública da imagem
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Insere o registro na tabela gallery
      const { data, error: insertError } = await supabase
        .from('gallery')
        .insert([{
          url: publicUrl,
          description,
          category
        }])
        .select();

      if (insertError) {
        console.error('Erro ao inserir:', insertError);
        throw new Error('Erro ao salvar os dados da imagem');
      }

      await fetchImages();
      return data[0];
    } catch (error) {
      console.error('Erro completo:', error);
      throw error;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      // Primeiro, obtém a URL da imagem
      const { data: image, error: fetchError } = await supabase
        .from('gallery')
        .select('url')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Extrai o caminho do arquivo da URL
      const filePath = image.url.split('/').pop();
      if (!filePath) throw new Error('URL da imagem inválida');

      // Remove o arquivo do storage
      const { error: deleteStorageError } = await supabase.storage
        .from('images')
        .remove([`gallery/${filePath}`]);

      if (deleteStorageError) {
        console.error('Erro ao deletar do storage:', deleteStorageError);
      }

      // Remove o registro da tabela
      const { error: deleteError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchImages();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      throw error;
    }
  };

  return {
    images,
    loading,
    error,
    uploadImage,
    deleteImage,
    refreshImages: fetchImages
  };
} 