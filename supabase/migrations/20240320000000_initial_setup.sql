-- Criar tabela de palestrantes
CREATE TABLE IF NOT EXISTS public.speakers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    bio TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar tabela de notícias
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    author TEXT NOT NULL,
    category TEXT,
    image_url TEXT,
    tags TEXT[],
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar tabela de palestras
CREATE TABLE IF NOT EXISTS public.lectures (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    speaker_id UUID REFERENCES public.speakers(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER NOT NULL,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar bucket para imagens
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Configurar políticas de segurança para o bucket de imagens
CREATE POLICY "Imagens públicas" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Upload de imagens autenticado" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'images' AND auth.role() = 'authenticated'
);

-- Configurar políticas de segurança para a tabela de notícias
CREATE POLICY "Notícias públicas" ON public.news FOR SELECT USING (true);
CREATE POLICY "Inserir notícias autenticado" ON public.news FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Atualizar notícias autenticado" ON public.news FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletar notícias autenticado" ON public.news FOR DELETE USING (auth.role() = 'authenticated');

-- Configurar políticas de segurança para a tabela de palestrantes
CREATE POLICY "Palestrantes públicos" ON public.speakers FOR SELECT USING (true);
CREATE POLICY "Inserir palestrantes autenticado" ON public.speakers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Atualizar palestrantes autenticado" ON public.speakers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletar palestrantes autenticado" ON public.speakers FOR DELETE USING (auth.role() = 'authenticated');

-- Configurar políticas de segurança para a tabela de palestras
CREATE POLICY "Palestras públicas" ON public.lectures FOR SELECT USING (true);
CREATE POLICY "Inserir palestras autenticado" ON public.lectures FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Atualizar palestras autenticado" ON public.lectures FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletar palestras autenticado" ON public.lectures FOR DELETE USING (auth.role() = 'authenticated'); 