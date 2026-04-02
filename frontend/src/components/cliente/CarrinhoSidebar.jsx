import { useState } from 'react';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import { X, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import PagamentoPix from './PagamentoPix';
import toast from 'react-hot-toast';

export default function CarrinhoSidebar({ isOpen, onClose }) {
  const { itens, total, limparCarrinho, removerItem } = useCarrinho();
  const [showPagamento, setShowPagamento] = useState(false);

  const handleFinalizar = () => {
    if (itens.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }
    setShowPagamento(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">Meu Carrinho</h2>
          </div>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {!showPagamento ? (
          <>
            {/* Itens */}
            <div className="flex-1 overflow-y-auto p-4">
              {itens.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500">Seu carrinho está vazio</p>
                  <button
                    onClick={onClose}
                    className="mt-4 text-orange-500 hover:underline"
                  >
                    Continue comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {itens.map(item => (
                    <div key={item.id} className="flex gap-3 border-b pb-3">
                      <img
                        src={item.imagemUrl}
                        alt={item.nome}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => e.target.src = 'https://placehold.co/100x100/png?text=🍕'}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.nome}</h3>
                        <p className="text-orange-500 font-bold">R$ {item.preco.toFixed(2)}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500">Qtd: {item.quantidade}</span>
                          <button
                            onClick={() => removerItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {itens.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-orange-500">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={limparCarrinho}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={handleFinalizar}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard size={18} />
                    Finalizar
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <PagamentoPix
            itens={itens}
            total={total}
            onVoltar={() => setShowPagamento(false)}
            onSucesso={() => {
              setShowPagamento(false);
              onClose();
            }}
          />
        )}
      </div>
    </>
  );
}