export interface ImageValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateImage = async (file: File): Promise<ImageValidationResult> => {
  const errors: string[] = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  // Verificar tamanho
  if (file.size > maxSize) {
    errors.push('A imagem deve ter no máximo 10MB');
  }

  // Verificar tipo
  if (!allowedTypes.includes(file.type)) {
    errors.push('Formato de imagem não suportado. Use PNG, JPG ou GIF');
  }

  // Verificar dimensões
  try {
    const dimensions = await getImageDimensions(file);
    if (dimensions.width < 200 || dimensions.height < 200) {
      errors.push('A imagem deve ter no mínimo 200x200 pixels');
    }
    if (dimensions.width > 4000 || dimensions.height > 4000) {
      errors.push('A imagem deve ter no máximo 4000x4000 pixels');
    }
  } catch (error) {
    errors.push('Erro ao verificar dimensões da imagem');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = () => {
      reject(new Error('Erro ao carregar imagem'));
    };
    img.src = URL.createObjectURL(file);
  });
};

export const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calcular novas dimensões mantendo proporção
      let width = img.width;
      let height = img.height;
      const maxDimension = 2000;
      
      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Erro ao comprimir imagem'));
            }
          },
          file.type,
          0.8
        );
      } else {
        reject(new Error('Erro ao criar contexto do canvas'));
      }
    };
    img.onerror = () => {
      reject(new Error('Erro ao carregar imagem'));
    };
    img.src = URL.createObjectURL(file);
  });
}; 