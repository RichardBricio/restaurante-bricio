// Admin/PedidosAdmin.jsx
export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);

  const alterarStatus = async (pedidoId, novoStatus) => {
    await fetch(`/api/pedidos/${pedidoId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: novoStatus })
    });
    // recarregar lista
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos para preparo</h1>
      {pedidos.filter(p => p.status !== 'FINALIZADO').map(pedido => (
        <div key={pedido.id} className="border p-4 mb-2 rounded shadow">
          <p>Cliente: {pedido.user.name}</p>
          <p>Total: R$ {pedido.total}</p>
          <p>Status atual: {pedido.status}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => alterarStatus(pedido.id, 'EM_PREPARO')} className="bg-yellow-500 p-1">Preparar</button>
            <button onClick={() => alterarStatus(pedido.id, 'FINALIZADO')} className="bg-green-500 p-1">Finalizar</button>
            <button onClick={() => alterarStatus(pedido.id, 'CANCELADO')} className="bg-red-500 p-1">Cancelar</button>
          </div>
        </div>
      ))}
    </div>
  );
}