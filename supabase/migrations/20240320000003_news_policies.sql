-- Habilitar RLS na tabela news
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública de notícias publicadas
CREATE POLICY "Leitura pública de notícias"
ON news FOR SELECT
TO public
USING (published = true);

-- Política para permitir leitura de todas as notícias para usuários autenticados
CREATE POLICY "Leitura completa para usuários autenticados"
ON news FOR SELECT
TO authenticated
USING (true);

-- Política para permitir inserção de notícias para usuários autenticados
CREATE POLICY "Inserção de notícias para usuários autenticados"
ON news FOR INSERT
TO authenticated
WITH CHECK (true);

-- Política para permitir atualização de notícias para usuários autenticados
CREATE POLICY "Atualização de notícias para usuários autenticados"
ON news FOR UPDATE
TO authenticated
USING (true);

-- Política para permitir deleção de notícias para usuários autenticados
CREATE POLICY "Deleção de notícias para usuários autenticados"
ON news FOR DELETE
TO authenticated
USING (true); 