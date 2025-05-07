import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface ImageUploaderProps {
  folder: 'gallery' | 'news' | 'speakers' | 'lectures';
  onUploadComplete: (url: string) => void;
  className?: string;
}

export const ImageUploader = ({ folder, onUploadComplete, className = '' }: ImageUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('O arquivo deve ter no máximo 5MB');
      }

      // Verificar tipo do arquivo
      if (!file.type.startsWith('image/')) {
        throw new Error('O arquivo deve ser uma imagem');
      }

      // Criar preview da imagem
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload da imagem
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
            </p>
            <p className="text-xs text-gray-500">PNG, JPG ou GIF (MAX. 5MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
      </div>

      {loading && (
        <div className="text-center">
          <p className="text-primary">Enviando imagem...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      {preview && (
        <div className="mt-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-w-xs mx-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}; 