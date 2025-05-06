-- Adicionar tabela de palestrantes
CREATE TABLE IF NOT EXISTS speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Adicionar tabela de relação entre palestras e palestrantes
CREATE TABLE IF NOT EXISTS lecture_speakers (
  lecture_id uuid REFERENCES lectures(id) ON DELETE CASCADE,
  speaker_id uuid REFERENCES speakers(id) ON DELETE CASCADE,
  PRIMARY KEY (lecture_id, speaker_id)
);

-- Adicionar tabela de álbuns para a galeria
CREATE TABLE IF NOT EXISTS albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Modificar tabela gallery para incluir álbum e tags
ALTER TABLE gallery
ADD COLUMN album_id uuid REFERENCES albums(id) ON DELETE SET NULL,
ADD COLUMN tags text[] DEFAULT '{}';

-- Adicionar tabela de logs administrativos
CREATE TABLE IF NOT EXISTS admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Adicionar tabela de backups
CREATE TABLE IF NOT EXISTS backups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path text NOT NULL,
  size_bytes bigint NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  completed_at timestamptz
);

-- Habilitar RLS nas novas tabelas
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lecture_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE backups ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para speakers
CREATE POLICY "Public can view speakers"
  ON speakers
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage speakers"
  ON speakers
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Políticas de segurança para lecture_speakers
CREATE POLICY "Public can view lecture_speakers"
  ON lecture_speakers
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage lecture_speakers"
  ON lecture_speakers
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Políticas de segurança para albums
CREATE POLICY "Public can view albums"
  ON albums
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage albums"
  ON albums
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Políticas de segurança para admin_logs
CREATE POLICY "Admins can view admin_logs"
  ON admin_logs
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "System can insert admin_logs"
  ON admin_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Políticas de segurança para backups
CREATE POLICY "Admins can manage backups"
  ON backups
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Função para registrar logs administrativos
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO admin_logs (user_id, action, table_name, record_id, details)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    CASE
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END,
    CASE
      WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
      ELSE row_to_json(NEW)
    END
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers para registrar logs
CREATE TRIGGER log_lectures_changes
  AFTER INSERT OR UPDATE OR DELETE ON lectures
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_news_changes
  AFTER INSERT OR UPDATE OR DELETE ON news
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_gallery_changes
  AFTER INSERT OR UPDATE OR DELETE ON gallery
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_speakers_changes
  AFTER INSERT OR UPDATE OR DELETE ON speakers
  FOR EACH ROW EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER log_albums_changes
  AFTER INSERT OR UPDATE OR DELETE ON albums
  FOR EACH ROW EXECUTE FUNCTION log_admin_action(); 