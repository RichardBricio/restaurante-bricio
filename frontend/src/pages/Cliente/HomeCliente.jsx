import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Header from '../../components/common/Header';
import { Utensils, ShoppingBag, Clock, Star } from 'lucide-react';

export default function HomeCliente() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    produtos: 0,
    pedidos: 0
  });

  useEffect(() => {
    carregarStats();
  }, []);

  const carregarStats = async () => {
    try {
      const response = await api.get('/produtos');
      setStats(prev => ({ ...prev, produtos: response.data.length }));
    } catch (error) {
      console.error('Erro ao carregar stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">
            Olá, {user?.displayName || user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-lg opacity-90">
            Bem-vindo ao Restaurante Bricio. Hoje temos pratos especiais para você!
          </p>
        </div>

        {/* Cards de Ação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/cardapio" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-orange-500 mb-4">
              <Utensils size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ver Cardápio</h3>
            <p className="text-gray-600">Escolha seus pratos favoritos</p>
          </Link>

          <Link to="/meus-pedidos" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-orange-500 mb-4">
              <Clock size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Meus Pedidos</h3>
            <p className="text-gray-600">Acompanhe seus pedidos</p>
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-orange-500 mb-4">
              <Star size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Destaques</h3>
            <p className="text-gray-600">{stats.produtos} produtos disponíveis</p>
          </div>
        </div>

        {/* Promoção do Dia */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Promoção do Dia!</h3>
          <p className="text-gray-600 mb-4">Compre 2 pizzas e ganhe refrigerante grátis</p>
          <Link to="/cardapio" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Aproveitar Oferta
          </Link>
        </div>
      </div>
    </div>
  );
}