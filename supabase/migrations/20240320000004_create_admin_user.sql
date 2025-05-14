-- Criar usuário administrador
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
);

-- Criar perfil do administrador
INSERT INTO public.profiles (
  id,
  name,
  email,
  role
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@example.com'),
  'Administrador',
  'admin@example.com',
  'admin'
);

-- Garantir que o usuário tenha acesso às tabelas
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated; 