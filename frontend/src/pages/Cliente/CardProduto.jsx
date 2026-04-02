import { ShoppingCart, Minus, Plus } from 'lucide-react';

export default function CardProduto({ produto, quantidade, onAdicionar, onRemover }) {
  const estaDisponivel = !produto.temEstoque || produto.quantidade > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={produto.imagemUrl}
          alt={produto.nome}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {!estaDisponivel && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg transform -rotate-12 border-2 border-white px-4 py-2 rounded">
              ESGOTADO 😢
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{produto.nome}</h3>
          <span className="text-orange-500 font-bold text-lg">
            R$ {produto.preco.toFixed(2)}
          </span>
        </div>

        {produto.descricao && (
          <p className="text-gray-600 text-sm mb-4">{produto.descricao}</p>
        )}

        {produto.temEstoque && produto.quantidade <= 5 && produto.quantidade > 0 && (
          <p className="text-yellow-600 text-xs mb-2 animate-pulse">
            ⚡ Últimas {produto.quantidade} unidades!
          </p>
        )}

        <div className="flex justify-between items-center mt-4">
          {quantidade > 0 ? (
            <div className="flex items-center gap-3 bg-orange-100 rounded-lg p-1">
              <button
                onClick={onRemover}
                className="bg-orange-500 text-white p-1 rounded-md hover:bg-orange-600 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-gray-800 w-8 text-center">{quantidade}</span>
              <button
                onClick={onAdicionar}
                disabled={!estaDisponivel}
                className="bg-orange-500 text-white p-1 rounded-md hover:bg-orange-600 transition-colors disabled:bg-gray-400"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAdicionar}
              disabled={!estaDisponivel}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              Adicionar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}