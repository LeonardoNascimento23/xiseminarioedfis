-- Atualizar a tabela de galeria para incluir o caminho do arquivo
ALTER TABLE gallery
ADD COLUMN file_path TEXT;

-- Criar índice para melhorar a performance de busca
CREATE INDEX idx_gallery_category ON gallery(category);

-- Adicionar restrições de integridade
ALTER TABLE gallery
ALTER COLUMN description SET NOT NULL,
ALTER COLUMN category SET NOT NULL,
ALTER COLUMN file_path SET NOT NULL;

-- Adicionar validação de URL
ALTER TABLE gallery
ADD CONSTRAINT valid_url CHECK (url ~ '^https?://');

-- Adicionar validação de categoria
ALTER TABLE gallery
ADD CONSTRAINT valid_category CHECK (category IN ('Eventos', 'Oficinas', 'Palestras', 'Exposições', 'Outros'));

-- Adicionar trigger para limpeza automática
CREATE OR REPLACE FUNCTION cleanup_deleted_images()
RETURNS TRIGGER AS $$
BEGIN
  -- Deletar arquivo do storage
  DELETE FROM storage.objects
  WHERE bucket_id = 'images'
  AND name = OLD.file_path;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cleanup_images_on_delete
  AFTER DELETE ON gallery
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_deleted_images(); 