import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import FormProduto from '../../components/admin/FormProduto';

export default function GerenciarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    }
  };

  const handleSalvar = async (produtoData) => {
    try {
      if (produtoEditando) {
        await api.put(`/produtos/${produtoEditando.id}`, produtoData);
        toast.success('✅ Produto atualizado com sucesso!');
      } else {
        await api.post('/produtos', produtoData);
        toast.success('🎉 Produto criado! A IA buscou uma imagem incrível pra ele.');
      }
      carregarProdutos();
      setShowForm(false);
      setProdutoEditando(null);
    } catch (error) {
      toast.error('Erro ao salvar produto');
    }
  };

  const handleExcluir = async (id, nome) => {
    if (confirm(`Tem certeza que quer excluir "${nome}"?`)) {
      try {
        await api.delete(`/produtos/${id}`);
        toast.success('🗑️ Produto excluído');
        carregarProdutos();
      } catch (error) {
        toast.error('Erro ao excluir');
      }
    }
  };

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🍔 Gerenciar Produtos
        </h1>
        <button
          onClick={() => {
            setProdutoEditando(null);
            setShowForm(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome ou categoria..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Tabela de produtos */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {produtosFiltrados.map(produto => (
              <tr key={produto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={produto.imagemUrl} alt={produto.nome} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4 font-medium">{produto.nome}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                    {produto.categoria}
                  </span>
                </td>
                <td className="px-6 py-4">R$ {produto.preco.toFixed(2)}</td>
                <td className="px-6 py-4">
                  {produto.temEstoque ? (
                    <span className={`text-sm ${produto.quantidade <= 5 ? 'text-red-500 font-bold' : 'text-green-600'}`}>
                      {produto.quantidade} unidades
                    </span>
                  ) : (
                    <span className="text-gray-400">Sem controle</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setProdutoEditando(produto);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleExcluir(produto.id, produto.nome)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal do formulário */}
      {showForm && (
        <FormProduto
          produto={produtoEditando}
          onSalvar={handleSalvar}
          onCancelar={() => {
            setShowForm(false);
            setProdutoEditando(null);
          }}
        />
      )}
    </div>
  );
}