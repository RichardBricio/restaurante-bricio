import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Package, Users, ShoppingBag, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logout realizado');
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { path: '/admin/produtos', icon: <Package size={18} />, label: 'Produtos' },
    { path: '/admin/clientes', icon: <Users size={18} />, label: 'Clientes' },
    { path: '/admin/pedidos', icon: <ShoppingBag size={18} />, label: 'Pedidos' }
  ];

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-2 hover:opacity-90">
            <div className="text-2xl">👨‍🍳</div>
            <div>
              <h1 className="font-bold">Admin Bricio</h1>
              <p className="text-xs text-gray-400">Painel de Controle</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Sair</span>
            </button>

            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="md:hidden"
            >
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuAberto && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuAberto(false)}
                className="flex items-center gap-3 py-2 hover:text-orange-400 transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}