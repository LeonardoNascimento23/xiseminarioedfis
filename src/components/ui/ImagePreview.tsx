import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { validateImage, compressImage } from '../../lib/imageValidation';
import { cn } from '../../lib/utils';

interface ImagePreviewProps {
  onImageSelect: (file: File) => void;
  onError: (errors: string[]) => void;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  onImageSelect,
  onError,
  className
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImage = useCallback(async (file: File) => {
    try {
      const validation = await validateImage(file);
      if (!validation.isValid) {
        onError(validation.errors);
        return;
      }

      const compressedFile = await compressImage(file);
      onImageSelect(compressedFile);

      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      onError(['Erro ao processar imagem']);
    }
  }, [onImageSelect, onError]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImage(file);
    }
  }, [handleImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImage(file);
    }
  }, [handleImage]);

  const handleRemove = useCallback(() => {
    setPreview(null);
    onImageSelect(null as any);
  }, [onImageSelect]);

  return (
    <div
      className={cn(
        'relative border-2 border-dashed rounded-lg p-4 transition-colors',
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Upload de arquivo</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-sm text-gray-500 mt-1">
              ou arraste e solte
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF até 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 