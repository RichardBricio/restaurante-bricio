import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Header from '../../components/common/Header';
import { Package, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';

export default function MeusPedidos() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const response = await api.get('/pedidos/meus');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'AGUARDANDO_PAGAMENTO':
        return <Clock className="text-yellow-500" size={20} />;
      case 'PAGO':
        return <Loader className="text-blue-500 animate-spin" size={20} />;
      case 'EM_PREPARO':
        return <Package className="text-orange-500" size={20} />;
      case 'FINALIZADO':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'CANCELADO':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const getStatusText = (status) => {
    const texts = {
      'AGUARDANDO_PAGAMENTO': 'Aguardando Pagamento',
      'PAGO': 'Pagamento Confirmado',
      'EM_PREPARO': 'Em Preparo',
      'FINALIZADO': 'Finalizado',
      'CANCELADO': 'Cancelado'
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 Meus Pedidos</h1>

        {pedidos.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg">Você ainda não fez nenhum pedido</p>
            <a href="/cardapio" className="inline-block mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              Fazer primeiro pedido
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map(pedido => (
              <div key={pedido.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Pedido #{pedido.id.substring(0, 8)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(pedido.createdAt).toLocaleDateString('pt-BR')} às {new Date(pedido.createdAt).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(pedido.status)}
                    <span className="font-medium">{getStatusText(pedido.status)}</span>
                  </div>
                </div>

                <div className="border-t border-b py-3 mb-3">
                  {pedido.itens?.map(item => (
                    <div key={item.id} className="flex justify-between text-gray-700 py-1">
                      <span>{item.quantidade}x {item.produto?.nome}</span>
                      <span>R$ {(item.precoUnitario * item.quantidade).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="text-xl font-bold text-orange-500">R$ {pedido.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}