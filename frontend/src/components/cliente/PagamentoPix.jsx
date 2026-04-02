import { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import { ArrowLeft, Copy, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PagamentoPix({ itens, total, onVoltar, onSucesso }) {
  const { user } = useAuth();
  const { limparCarrinho } = useCarrinho();
  const [loading, setLoading] = useState(false);
  const [pedido, setPedido] = useState(null);

  const handleGerarPix = async () => {
    setLoading(true);
    try {
      const response = await api.post('/pedidos', {
        userId: user?.uid,
        itens: itens.map(item => ({
          produtoId: item.id,
          quantidade: item.quantidade,
          precoUnitario: item.preco
        }))
      });

      setPedido(response.data);
      toast.success('Pedido gerado! Aguardando pagamento...');
    } catch (error) {
      toast.error('Erro ao gerar pedido: ' + error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const copiarCodigoPix = () => {
    navigator.clipboard.writeText(pedido.pix.copiaCola);
    toast.success('Código PIX copiado!');
  };

  const simularPagamento = () => {
    toast.success('🎉 Pagamento confirmado! Pedido enviado para a cozinha.');
    limparCarrinho();
    onSucesso();
  };

  if (!pedido) {
    return (
      <div className="flex-1 p-4">
        <button onClick={onVoltar} className="flex items-center gap-2 text-gray-600 mb-4 hover:text-orange-500">
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-gray-800">Resumo do Pedido</h3>
          <p className="text-gray-600 mt-2">Total: R$ {total.toFixed(2)}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2">Itens:</h4>
          {itens.map(item => (
            <div key={item.id} className="flex justify-between text-sm py-1">
              <span>{item.quantidade}x {item.nome}</span>
              <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleGerarPix}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader className="animate-spin" /> : <CheckCircle size={20} />}
          Gerar QR Code PIX
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <button onClick={onVoltar} className="flex items-center gap-2 text-gray-600 mb-4 hover:text-orange-500">
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="text-center mb-6">
        <div className="text-6xl mb-4">📱</div>
        <h3 className="text-xl font-bold text-gray-800">Pagamento via PIX</h3>
        <p className="text-sm text-gray-600 mt-1">Escaneie o QR Code ou copie o código</p>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
        {pedido.pix.qrCodeBase64 && (
          <img
            src={pedido.pix.qrCodeBase64}
            alt="QR Code PIX"
            className="w-48 h-48 mx-auto mb-4"
          />
        )}

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-xs text-gray-600 mb-2 break-all">{pedido.pix.copiaCola}</p>
          <button
            onClick={copiarCodigoPix}
            className="w-full bg-orange-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600"
          >
            <Copy size={16} />
            Copiar código PIX
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 p-3 rounded-lg mb-4 text-sm text-yellow-800">
        ⚡ Após o pagamento, clique em "Confirmar Pagamento" para enviar seu pedido
      </div>

      <button
        onClick={simularPagamento}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all"
      >
        ✅ Confirmar Pagamento
      </button>
    </div>
  );
}