import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CarrinhoProvider } from './contexts/CarrinhoContext';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import HomeCliente from './pages/Cliente/HomeCliente';
import Cardapio from './pages/Cliente/Cardapio';
import MeusPedidos from './pages/Cliente/MeusPedidos';
import DashboardAdmin from './pages/Admin/DashboardAdmin';
import GerenciarProdutos from './pages/Admin/GerenciarProdutos';
import GerenciarClientes from './pages/Admin/GerenciarClientes';
import PedidosAdmin from './pages/Admin/PedidosAdmin';

import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarrinhoProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                iconTheme: { primary: '#4ade80', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            {/* Rotas do Cliente */}
            <Route path="/" element={<PrivateRoute><HomeCliente /></PrivateRoute>} />
            <Route path="/cardapio" element={<PrivateRoute><Cardapio /></PrivateRoute>} />
            <Route path="/meus-pedidos" element={<PrivateRoute><MeusPedidos /></PrivateRoute>} />

            {/* Rotas do Admin */}
            <Route path="/admin" element={<PrivateRoute adminOnly><DashboardAdmin /></PrivateRoute>} />
            <Route path="/admin/produtos" element={<PrivateRoute adminOnly><GerenciarProdutos /></PrivateRoute>} />
            <Route path="/admin/clientes" element={<PrivateRoute adminOnly><GerenciarClientes /></PrivateRoute>} />
            <Route path="/admin/pedidos" element={<PrivateRoute adminOnly><PedidosAdmin /></PrivateRoute>} />
          </Routes>
        </CarrinhoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;