import { Package, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';

export default function TabelaPedidos({ pedidos, onStatusChange }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'AGUARDANDO_PAGAMENTO': return <Clock className="text-yellow-500" size={18} />;
      case 'PAGO': return <Loader className="text-blue-500 animate-spin" size={18} />;
      case 'EM_PREPARO': return <Package className="text-orange-500" size={18} />;
      case 'FINALIZADO': return <CheckCircle className="text-green-500" size={18} />;
      case 'CANCELADO': return <XCircle className="text-red-500" size={18} />;
      default: return <Package size={18} />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'AGUARDANDO_PAGAMENTO': 'bg-yellow-100 text-yellow-800',
      'PAGO': 'bg-blue-100 text-blue-800',
      'EM_PREPARO': 'bg-orange-100 text-orange-800',
      'FINALIZADO': 'bg-green-100 text-green-800',
      'CANCELADO': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100';
  };

  const statusOptions = [
    { value: 'AGUARDANDO_PAGAMENTO', label: 'Aguardando Pagamento' },
    { value: 'PAGO', label: 'Pagamento Confirmado' },
    { value: 'EM_PREPARO', label: 'Em Preparo' },
    { value: 'FINALIZADO', label: 'Finalizado' },
    { value: 'CANCELADO', label: 'Cancelado' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pedido</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Itens</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pedidos.map(pedido => (
            <tr key={pedido.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-gray-900">#{pedido.id.substring(0, 8)}</div>
                <div className="text-xs text-gray-500">
                  {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-900">{pedido.usuario?.nome || 'Cliente'}</div>
                <div className="text-xs text-gray-500">{pedido.usuario?.email}</div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-600">
                  {pedido.itens?.map(item => (
                    <div key={item.id}>{item.quantidade}x {item.produto?.nome}</div>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm font-bold text-orange-600">R$ {pedido.total.toFixed(2)}</div>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(pedido.status)}`}>
                  {getStatusIcon(pedido.status)}
                  {statusOptions.find(s => s.value === pedido.status)?.label}
                </span>
              </td>
              <td className="px-4 py-3">
                <select
                  value={pedido.status}
                  onChange={(e) => onStatusChange(pedido.id, e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}