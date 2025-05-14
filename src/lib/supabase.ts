import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL e Anon Key são necessários');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para verificar se é admin
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.email === 'xiseminarioedfis@gmail.com';
};

// Função para enviar magic link
export const sendMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + '/admin'
    }
  });
  return { error };
};

// Função para fazer logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};