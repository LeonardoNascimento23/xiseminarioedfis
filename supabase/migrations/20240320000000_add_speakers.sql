-- Criar tabela de palestrantes
CREATE TABLE IF NOT EXISTS speakers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar tabela de relação entre palestras e palestrantes
CREATE TABLE IF NOT EXISTS lecture_speakers (
  lecture_id UUID REFERENCES lectures(id) ON DELETE CASCADE,
  speaker_id UUID REFERENCES speakers(id) ON DELETE CASCADE,
  PRIMARY KEY (lecture_id, speaker_id)
);

-- Remover colunas antigas da tabela de palestras
ALTER TABLE lectures
  DROP COLUMN IF EXISTS speaker,
  DROP COLUMN IF EXISTS speaker_bio;

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_lecture_speakers_lecture_id ON lecture_speakers(lecture_id);
CREATE INDEX IF NOT EXISTS idx_lecture_speakers_speaker_id ON lecture_speakers(speaker_id);
CREATE INDEX IF NOT EXISTS idx_speakers_name ON speakers(name);

-- Adicionar RLS (Row Level Security)
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lecture_speakers ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso
CREATE POLICY "Permitir leitura pública de palestrantes"
  ON speakers FOR SELECT
  USING (true);

CREATE POLICY "Permitir leitura pública de relações palestra-palestrante"
  ON lecture_speakers FOR SELECT
  USING (true);

CREATE POLICY "Permitir inserção de palestrantes para usuários autenticados"
  ON speakers FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir atualização de palestrantes para usuários autenticados"
  ON speakers FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir deleção de palestrantes para usuários autenticados"
  ON speakers FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir inserção de relações palestra-palestrante para usuários autenticados"
  ON lecture_speakers FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Permitir deleção de relações palestra-palestrante para usuários autenticados"
  ON lecture_speakers FOR DELETE
  USING (auth.role() = 'authenticated'); 