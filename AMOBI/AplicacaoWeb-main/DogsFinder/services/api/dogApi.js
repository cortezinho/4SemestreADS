import axios from 'axios';

const API_BASE_URL = 'https://dog.ceo/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Função para buscar uma única imagem
export const getSingleDogImage = async () => {
  try {
    const response = await api.get('/breeds/image/random');
    
    if (response.data.status === 'success') {
      return {
        success: true,
        imageUrl: response.data.message,
        error: null
      };
    } else {
      return {
        success: false,
        imageUrl: null,
        error: 'Falha na resposta da API'
      };
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return {
      success: false,
      imageUrl: null,
      error: 'Erro ao conectar com a API'
    };
  }
};

// Função para buscar múltiplas imagens de forma sequencial
export const getMultipleDogImages = async (count) => {
  const imageUrls = [];
  const errors = [];

  for (let i = 0; i < count; i++) {
    try {
      const result = await getSingleDogImage();
      if (result.success) {
        imageUrls.push(result.imageUrl);
      } else {
        errors.push(`Imagem ${i + 1}: ${result.error}`);
      }
      
      // Pequena pausa para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      errors.push(`Imagem ${i + 1}: ${error.message}`);
    }
  }

  if (imageUrls.length > 0) {
    return {
      success: true,
      imageUrls: imageUrls,
      error: errors.length > 0 ? errors.join(', ') : null
    };
  } else {
    return {
      success: false,
      imageUrls: [],
      error: errors.join(', ') || 'Falha ao buscar todas as imagens'
    };
  }
};

export default api;