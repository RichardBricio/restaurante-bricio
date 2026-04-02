import { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

export default function FormProduto({ produto, onSalvar, onCancelar }) {
  const [form, setForm] = useState({
    nome: produto?.nome || '',
    categoria: produto?.categoria || 'Pizzas',
    preco: produto?.preco || '',
    descricao: produto?.descricao || '',
    temEstoque: produto?.temEstoque ?? true,
    quantidade: produto?.quantidade || ''
  });
  const [loading, setLoading] = useState(false);

  const categorias = ['Pizzas', 'Bebidas', 'Sobremesas', 'Lanches', 'Porções', 'Saladas'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSalvar(form);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {produto ? '✏️ Editar Produto' : '🆕 Novo Produto'}
          </h2>
          <button onClick={onCancelar} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input
              type="text"
              required
              value={form.nome}
              onChange={e => setForm({...form, nome: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Ex: Pizza Margherita"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
            <select
              required
              value={form.categoria}
              onChange={e => setForm({...form, categoria: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$) *</label>
            <input
              type="number"
              step="0.01"
              required
              value={form.preco}
              onChange={e => setForm({...form, preco: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              value={form.descricao}
              onChange={e => setForm({...form, descricao: e.target.value})}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Descreva o produto..."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.temEstoque}
                onChange={e => setForm({...form, temEstoque: e.target.checked})}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Controlar estoque?</span>
            </label>
          </div>

          {form.temEstoque && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade em estoque</label>
              <input
                type="number"
                min="0"
                required={form.temEstoque}
                value={form.quantidade}
                onChange={e => setForm({...form, quantidade: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 flex items-start gap-2">
            <ImageIcon size={18} className="flex-shrink-0 mt-0.5" />
            <span>💡 A imagem do produto será buscada automaticamente por IA baseada no nome e categoria!</span>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Salvando...' : (produto ? 'Atualizar' : 'Criar Produto')}
            </button>
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}