import { useState, useEffect } from 'react';
import api from '../../services/api';
import AdminHeader from '../../components/admin/AdminHeader';
import ListaClientes from '../../components/admin/ListaClientes';
import { Search, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GerenciarClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const response = await api.get('/usuarios');
      setClientes(response.data);
    } catch (error) {
      toast.error('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.email.toLowerCase().includes(busca.toLowerCase())
  );

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">👥 Clientes</h1>
            <p className="text-gray-600">Gerencie os clientes da sua loja</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-lg">
            <Users className="text-orange-500" size={24} />
          </div>
        </div>

        {/* Busca */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-500 text-sm">Total de Clientes</p>
            <p className="text-2xl font-bold text-gray-800">{clientes.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-500 text-sm">Administradores</p>
            <p className="text-2xl font-bold text-gray-800">
              {clientes.filter(c => c.role === 'ADMIN').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-500 text-sm">Clientes Comuns</p>
            <p className="text-2xl font-bold text-gray-800">
              {clientes.filter(c => c.role === 'CLIENTE').length}
            </p>
          </div>
        </div>

        <ListaClientes clientes={clientesFiltrados} onAtualizar={carregarClientes} />
      </div>
    </div>
  );
}