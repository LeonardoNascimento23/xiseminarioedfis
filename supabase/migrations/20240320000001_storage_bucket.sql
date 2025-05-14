-- Criar bucket de imagens se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Habilitar RLS no bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública de todas as imagens
CREATE POLICY "Imagens públicas"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- Política para permitir upload de imagens para usuários autenticados
CREATE POLICY "Upload de imagens para usuários autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] IN ('gallery', 'news', 'speakers', 'lectures')
);

-- Política para permitir atualização de imagens para usuários autenticados
CREATE POLICY "Atualização de imagens para usuários autenticados"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.uid() = owner
);

-- Política para permitir deleção de imagens para usuários autenticados
CREATE POLICY "Deleção de imagens para usuários autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.uid() = owner
); 