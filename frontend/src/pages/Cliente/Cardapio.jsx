import { useState, useEffect } from 'react';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Header from '../../components/common/Header';
import CarrinhoSidebar from '../../components/cliente/CarrinhoSidebar';
import FiltroCategorias from '../../components/cliente/FiltroCategorias';
import CardProduto from '../../components/cliente/CardProduto';

export default function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const { user } = useAuth();
  const { itens, adicionarItem, removerItem } = useCarrinho();

  useEffect(() => {
    carregarProdutos();
  }, [categoriaSelecionada]);

  const carregarProdutos = async () => {
    try {
      const params = categoriaSelecionada !== 'todos' ? { categoria: categoriaSelecionada } : {};
      const response = await api.get('/produtos', { params });
      setProdutos(response.data);
    } catch (error) {
      toast.error('Erro ao carregar cardápio');
    }
  };

  const quantidadeNoCarrinho = (produtoId) => {
    const item = itens.find(i => i.produtoId === produtoId);
    return item ? item.quantidade : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAbrirCarrinho={() => setCarrinhoAberto(true)} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🍕 Cardápio Digital
          </h1>
          <p className="text-gray-600">
            Escolha seus pratos favoritos e faça seu pedido!
          </p>
        </div>

        <FiltroCategorias
          categoriaAtual={categoriaSelecionada}
          onMudarCategoria={setCategoriaSelecionada}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {produtos.map(produto => (
            <CardProduto
              key={produto.id}
              produto={produto}
              quantidade={quantidadeNoCarrinho(produto.id)}
              onAdicionar={() => adicionarItem(produto)}
              onRemover={() => removerItem(produto.id)}
            />
          ))}
        </div>

        {produtos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria</p>
          </div>
        )}
      </div>

      <CarrinhoSidebar
        isOpen={carrinhoAberto}
        onClose={() => setCarrinhoAberto(false)}
      />
    </div>
  );
}