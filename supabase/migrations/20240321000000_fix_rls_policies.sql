-- Habilitar RLS nas tabelas
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Políticas para a tabela news
CREATE POLICY "Permitir leitura pública de notícias"
  ON news FOR SELECT
  USING (true);

CREATE POLICY "Permitir inserção de notícias para usuários autenticados"
  ON news FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir atualização de notícias para usuários autenticados"
  ON news FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir deleção de notícias para usuários autenticados"
  ON news FOR DELETE
  USING (auth.role() = 'authenticated');

-- Políticas para a tabela gallery
CREATE POLICY "Permitir leitura pública de imagens"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Permitir inserção de imagens para usuários autenticados"
  ON gallery FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir atualização de imagens para usuários autenticados"
  ON gallery FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir deleção de imagens para usuários autenticados"
  ON gallery FOR DELETE
  USING (auth.role() = 'authenticated');

-- Políticas para o storage
CREATE POLICY "Permitir acesso público às imagens"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Permitir upload de imagens para usuários autenticados"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Permitir deleção de imagens para usuários autenticados"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'images' AND
    auth.role() = 'authenticated'
  ); 