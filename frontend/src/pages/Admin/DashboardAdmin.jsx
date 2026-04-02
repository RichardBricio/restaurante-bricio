import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import AdminHeader from '../../components/admin/AdminHeader';
import { ShoppingBag, Users, Package, DollarSign, TrendingUp } from 'lucide-react';

export default function DashboardAdmin() {
  const [stats, setStats] = useState({
    totalProdutos: 0,
    totalClientes: 0,
    totalPedidos: 0,
    faturamento: 0,
    pedidosHoje: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarStats();
  }, []);

  const carregarStats = async () => {
    try {
      const [produtosRes, clientesRes, pedidosRes] = await Promise.all([
        api.get('/produtos'),
        api.get('/usuarios'),
        api.get('/pedidos')
      ]);

      const pedidos = pedidosRes.data;
      const hoje = new Date().toDateString();
      const pedidosHoje = pedidos.filter(p =>
        new Date(p.createdAt).toDateString() === hoje
      );

      const faturamento = pedidos
        .filter(p => p.status === 'FINALIZADO')
        .reduce((acc, p) => acc + p.total, 0);

      setStats({
        totalProdutos: produtosRes.data.length,
        totalClientes: clientesRes.data.length,
        totalPedidos: pedidos.length,
        faturamento: faturamento,
        pedidosHoje: pedidosHoje.length
      });
    } catch (error) {
      console.error('Erro ao carregar stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Produtos',
      value: stats.totalProdutos,
      icon: <Package size={32} />,
      color: 'bg-blue-500',
      link: '/admin/produtos'
    },
    {
      title: 'Clientes',
      value: stats.totalClientes,
      icon: <Users size={32} />,
      color: 'bg-green-500',
      link: '/admin/clientes'
    },
    {
      title: 'Pedidos Hoje',
      value: stats.pedidosHoje,
      icon: <ShoppingBag size={32} />,
      color: 'bg-orange-500',
      link: '/admin/pedidos'
    },
    {
      title: 'Faturamento',
      value: `R$ ${stats.faturamento.toFixed(2)}`,
      icon: <DollarSign size={32} />,
      color: 'bg-purple-500',
      link: '/admin/pedidos'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo ao painel administrativo</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg text-white`}>
                  {card.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Gráfico simplificado */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-green-500" />
            <h2 className="text-xl font-bold text-gray-800">Resumo do Mês</h2>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-500">Faturamento total: </p>
            <p className="text-3xl font-bold text-orange-500">R$ {stats.faturamento.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2">
              Total de {stats.totalPedidos} pedidos realizados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}