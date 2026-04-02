// backend/services/imageSearch.js
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'sua_chave_aqui';

export async function buscarImagemProduto(nomeProduto, categoria) {
  // Cria um prompt mais rico para a busca
  const termosBusca = `${nomeProduto} ${categoria} comida restaurante`;

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: termosBusca,
        per_page: 1,
        orientation: 'squarish',
        client_id: UNSPLASH_ACCESS_KEY
      }
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }

    // Fallback: imagem genérica da categoria
    return `https://source.unsplash.com/featured/?${categoria},food`;
  } catch (error) {
    console.error('Erro na busca de imagem:', error);
    return 'https://placehold.co/600x400?text=Sem+Imagem';
  }
}