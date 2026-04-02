import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Header({ onAbrirCarrinho }) {
  const { user, logout } = useAuth();
  const { itens } = useCarrinho();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('👋 Até logo!');
    navigate('/login');
  };

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="text-3xl">🍔</div>
            <div>
              <h1 className="text-xl font-bold">Restaurante Bricio</h1>
              <p className="text-xs opacity-90">Sabor que emociona</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:opacity-90 transition-opacity">Início</Link>
            <Link to="/cardapio" className="hover:opacity-90 transition-opacity">Cardápio</Link>
            <Link to="/meus-pedidos" className="hover:opacity-90 transition-opacity">Meus Pedidos</Link>

            {user?.role === 'ADMIN' && (
              <Link to="/admin" className="hover:opacity-90 transition-opacity">Admin</Link>
            )}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-4">
            {/* Carrinho */}
            <button
              onClick={onAbrirCarrinho}
              className="relative hover:opacity-90 transition-opacity"
            >
              <ShoppingCart size={24} />
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItens}
                </span>
              )}
            </button>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <User size={20} />
                <span className="text-sm">{user?.displayName?.split(' ')[0] || user?.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>

            {/* Menu Mobile Button */}
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="md:hidden hover:opacity-90 transition-opacity"
            >
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuAberto && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col gap-3">
              <Link to="/" onClick={() => setMenuAberto(false)}>Início</Link>
              <Link to="/cardapio" onClick={() => setMenuAberto(false)}>Cardápio</Link>
              <Link to="/meus-pedidos" onClick={() => setMenuAberto(false)}>Meus Pedidos</Link>

              {user?.role === 'ADMIN' && (
                <Link to="/admin" onClick={() => setMenuAberto(false)}>Admin</Link>
              )}

              <div className="pt-3 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User size={20} />
                    <span className="text-sm">{user?.displayName?.split(' ')[0] || user?.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}