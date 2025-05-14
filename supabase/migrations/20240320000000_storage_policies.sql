-- Habilitar RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Política para permitir upload de imagens para usuários autenticados
CREATE POLICY "Usuários autenticados podem fazer upload de imagens"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = 'gallery'
);

-- Política para permitir leitura pública das imagens
CREATE POLICY "Qualquer um pode ver as imagens"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Política para permitir que usuários autenticados atualizem suas próprias imagens
CREATE POLICY "Usuários autenticados podem atualizar suas imagens"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.uid() = owner
);

-- Política para permitir que usuários autenticados deletem suas próprias imagens
CREATE POLICY "Usuários autenticados podem deletar suas imagens"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.uid() = owner
); 