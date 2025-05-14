import { useNews } from '../hooks/useSupabase';
import { supabase } from '../lib/supabase';
import { useState } from 'react';

export function TestPage() {
  const { createNews } = useNews();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/test'
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      setMessage('Link de acesso enviado para seu email! Verifique sua caixa de entrada.');
    } catch (error) {
      console.error('Erro no envio do link:', error);
      setError(error instanceof Error ? error.message : 'Erro ao enviar link de acesso');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestNews = async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Você precisa estar logado para criar uma notícia');
      }

      const testNews = {
        title: "Notícia de Teste",
        content: "Esta é uma notícia de teste para verificar o funcionamento do sistema.",
        summary: "Resumo da notícia de teste",
        date: new Date().toISOString(),
        author: "Sistema",
        category: "Teste",
        image_url: "https://picsum.photos/800/400",
        tags: ["teste", "sistema"],
        published: true
      };

      const result = await createNews(testNews);
      console.log('Notícia criada:', result);
      setMessage('Notícia criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar notícia:', error);
      setError(error instanceof Error ? error.message : 'Erro ao criar notícia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleMagicLink} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar Link de Acesso'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      <button
        onClick={handleCreateTestNews}
        disabled={loading}
        className="w-full bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Criando...' : 'Criar Notícia de Teste'}
      </button>
    </div>
  );
} 