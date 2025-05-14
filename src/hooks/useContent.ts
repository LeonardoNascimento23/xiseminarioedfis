import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ContentData {
  id: string;
  title: string;
  date: string;
  author?: string;
  category?: string;
  thumbnail?: string;
  summary?: string;
  body: string;
  published: boolean;
  tags?: string[];
  created_at: string;
  [key: string]: any;
}

export function useContent(collection: string) {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(collection)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContent(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar conteúdo');
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [collection]);

  return { content, loading, error };
}

export const useContentList = (collection: string) => {
  const [contents, setContents] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContents() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(collection)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContents(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar lista de conteúdo');
      } finally {
        setLoading(false);
      }
    }

    fetchContents();
  }, [collection]);

  return { contents, loading, error };
}; 