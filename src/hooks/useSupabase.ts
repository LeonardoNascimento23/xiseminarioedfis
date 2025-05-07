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

export interface Speaker {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminLog {
  id: string;
  action: string;
  userId: string;
  createdAt: string;
}

export interface Backup {
  id: string;
  createdAt: string;
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

  const uploadImage = async (url: string, description: string, category: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: insertError } = await supabase
        .from('gallery')
        .insert({
          url,
          description,
          category
        })
        .select('*');

      if (insertError) {
        throw new Error('Erro ao salvar os dados da imagem');
      }

      await fetchImages();
      return data[0];
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

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
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setLoading(false);
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

export function useSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const { data, error } = await supabase
        .from('speakers')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setSpeakers(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar palestrantes');
    } finally {
      setLoading(false);
    }
  };

  const createSpeaker = async (speakerData: Omit<Speaker, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('speakers')
        .insert([speakerData])
        .select();

      if (error) throw error;
      await fetchSpeakers();
      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const updateSpeaker = async (id: string, speakerData: Partial<Speaker>) => {
    try {
      const { error } = await supabase
        .from('speakers')
        .update(speakerData)
        .eq('id', id);

      if (error) throw error;
      await fetchSpeakers();
    } catch (error) {
      throw error;
    }
  };

  const deleteSpeaker = async (id: string) => {
    try {
      const { error } = await supabase
        .from('speakers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchSpeakers();
    } catch (error) {
      throw error;
    }
  };

  return {
    speakers,
    loading,
    error,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
    refreshSpeakers: fetchSpeakers
  };
}

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setAlbums(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar álbuns');
    } finally {
      setLoading(false);
    }
  };

  const createAlbum = async (albumData: Omit<Album, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('albums')
        .insert([albumData])
        .select();

      if (error) throw error;
      await fetchAlbums();
      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const updateAlbum = async (id: string, albumData: Partial<Album>) => {
    try {
      const { error } = await supabase
        .from('albums')
        .update(albumData)
        .eq('id', id);

      if (error) throw error;
      await fetchAlbums();
    } catch (error) {
      throw error;
    }
  };

  const deleteAlbum = async (id: string) => {
    try {
      const { error } = await supabase
        .from('albums')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchAlbums();
    } catch (error) {
      throw error;
    }
  };

  return {
    albums,
    loading,
    error,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    refreshAlbums: fetchAlbums
  };
}

export function useAdminLogs() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar logs');
    } finally {
      setLoading(false);
    }
  };

  return {
    logs,
    loading,
    error,
    refreshLogs: fetchLogs
  };
}

export function useBackups() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBackups = async () => {
    try {
      const { data, error } = await supabase
        .from('backups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBackups(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar backups');
    } finally {
      setLoading(false);
    }
  };

  const createBackup = async () => {
    try {
      const { data, error } = await supabase
        .functions
        .invoke('create-backup');

      if (error) throw error;
      await fetchBackups();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const restoreBackup = async (backupId: string) => {
    try {
      const { error } = await supabase
        .functions
        .invoke('restore-backup', {
          body: { backupId }
        });

      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  return {
    backups,
    loading,
    error,
    createBackup,
    restoreBackup,
    refreshBackups: fetchBackups
  };
}

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (file: File, path: string): Promise<string> => {
    try {
      setLoading(true);
      setError(null);

      // Verificar se o arquivo é uma imagem
      if (!file.type.startsWith('image/')) {
        throw new Error('O arquivo deve ser uma imagem');
      }

      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      // Upload do arquivo
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        throw new Error('Erro ao fazer upload da imagem');
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Erro completo:', err);
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveNews = async (newsData: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: saveError } = await supabase
        .from('news')
        .insert([newsData])
        .select()
        .single();

      if (saveError) {
        console.error('Erro ao salvar notícia:', saveError);
        throw new Error('Erro ao salvar notícia');
      }

      return data;
    } catch (err) {
      console.error('Erro completo:', err);
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveLecture = async (lectureData: any) => {
    try {
      setLoading(true);
      setError(null);

      // Validar dados obrigatórios
      if (!lectureData.title || !lectureData.description || !lectureData.date) {
        throw new Error('Dados obrigatórios não preenchidos');
      }

      const { data, error: saveError } = await supabase
        .from('lectures')
        .insert([lectureData])
        .select()
        .single();

      if (saveError) {
        console.error('Erro ao salvar palestra:', saveError);
        throw new Error('Erro ao salvar palestra');
      }

      return data;
    } catch (err) {
      console.error('Erro completo:', err);
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveSpeaker = async (speakerData: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: saveError } = await supabase
        .from('speakers')
        .insert([speakerData])
        .select()
        .single();

      if (saveError) {
        console.error('Erro ao salvar palestrante:', saveError);
        throw new Error('Erro ao salvar palestrante');
      }

      return data;
    } catch (err) {
      console.error('Erro completo:', err);
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    uploadImage,
    saveNews,
    saveLecture,
    saveSpeaker
  };
}; 