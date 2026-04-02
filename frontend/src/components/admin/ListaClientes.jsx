import { useState } from 'react';
import { Crown, User, Mail, Calendar } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ListaClientes({ clientes, onAtualizar }) {
  const [tornandoAdmin, setTornandoAdmin] = useState(null);

  const tornarAdmin = async (clienteId, isAdmin) => {
    setTornandoAdmin(clienteId);
    try {
      await api.put(`/usuarios/${clienteId}/role`, {
        role: isAdmin ? 'CLIENTE' : 'ADMIN'
      });
      toast.success(`Usuário ${isAdmin ? 'removido do' : 'promovido a'} admin!`);
      onAtualizar();
    } catch (error) {
      toast.error('Erro ao alterar permissão');
    } finally {
      setTornandoAdmin(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuário</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cadastro</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clientes.map(cliente => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    {cliente.nome?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="font-medium text-gray-900">{cliente.nome || 'Sem nome'}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Mail size={14} />
                  <span className="text-sm">{cliente.email}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                {cliente.role === 'ADMIN' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    <Crown size={12} />
                    Administrador
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    <User size={12} />
                    Cliente
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar size={14} />
                  {new Date(cliente.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => tornarAdmin(cliente.id, cliente.role === 'ADMIN')}
                  disabled={tornandoAdmin === cliente.id}
                  className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                    cliente.role === 'ADMIN'
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  } disabled:opacity-50`}
                >
                  {tornandoAdmin === cliente.id ? (
                    '...'
                  ) : cliente.role === 'ADMIN' ? (
                    'Remover Admin'
                  ) : (
                    'Tornar Admin'
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {clientes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-gray-500">Nenhum cliente encontrado</p>
        </div>
      )}
    </div>
  );
}