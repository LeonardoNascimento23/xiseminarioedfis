-- Habilitar RLS na tabela gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública de todas as imagens
CREATE POLICY "Leitura pública de imagens"
ON gallery FOR SELECT
TO public
USING (true);

-- Política para permitir inserção de imagens para usuários autenticados
CREATE POLICY "Inserção de imagens para usuários autenticados"
ON gallery FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política para permitir atualização de imagens para usuários autenticados
CREATE POLICY "Atualização de imagens para usuários autenticados"
ON gallery FOR UPDATE
TO authenticated
USING (true);

-- Política para permitir deleção de imagens para usuários autenticados
CREATE POLICY "Deleção de imagens para usuários autenticados"
ON gallery FOR DELETE
TO authenticated
USING (true); 