-- Habilitar a extensão pgcrypto se ainda não estiver habilitada
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criar a tabela de perfis se não existir
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  PRIMARY KEY (id)
);

-- Habilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se necessário
DO $$ 
BEGIN
    -- Remover políticas existentes
    DROP POLICY IF EXISTS "Perfis públicos" ON public.profiles;
    DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios perfis" ON public.profiles;
    DROP POLICY IF EXISTS "Usuários podem inserir seus próprios perfis" ON public.profiles;
END $$;

-- Criar novas políticas
CREATE POLICY "Perfis públicos"
ON public.profiles FOR SELECT
TO public
USING (true);

CREATE POLICY "Usuários podem atualizar seus próprios perfis"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seus próprios perfis"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Criar ou atualizar usuário admin
DO $$ 
DECLARE
    admin_id UUID;
BEGIN
    -- Verificar se o usuário admin já existe
    SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@example.com';
    
    IF admin_id IS NULL THEN
        -- Criar novo usuário admin
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'admin@example.com',
            crypt('admin123', gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            '{"name":"Administrador"}',
            now(),
            now(),
            '',
            '',
            '',
            ''
        ) RETURNING id INTO admin_id;
    END IF;

    -- Inserir ou atualizar perfil do admin
    INSERT INTO public.profiles (id, name, email, role)
    VALUES (admin_id, 'Administrador', 'admin@example.com', 'admin')
    ON CONFLICT (id) DO UPDATE
    SET name = 'Administrador',
        email = 'admin@example.com',
        role = 'admin',
        updated_at = now();
END $$;

-- Garantir que o usuário tenha acesso às tabelas
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated; 