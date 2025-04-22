import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Produtos from './pages/Produtos'; // Página de Produtos
import Clientes from './pages/Clientes'; // Página de Clientes
import Funcionarios from './pages/Funcionarios'; // Página de Funcionários
import Cupons from './pages/Cupons'; // Página de Cupons
import Header from './components/Sidebar'; // Cabeçalho com a navegação
import EditarProduto from './pages/EditarProduto'; 
import AdicionarProduto from "./pages/AdicionarProduto"; // Página para Adicionar Produto
import EditarCliente from "./pages/EditarCliente";
import AdicionarCliente from "./pages/AdicionarCliente";
import AdicionarCupom from "./pages/AdicionarCupom";
import EditarCupom from "./pages/EditarCupom";
import Administradores from "./pages/Administradores";
import AdicionarAdministrador from "./pages/AdicionarAdministrador";
import EditarAdministrador from "./pages/EditarAdministrador";
import Indica from "./pages/Indica";
import Compras from "./pages/Compras";
import Avaliacoes from "./pages/Avaliacoes";
import Dashboard from "./pages/Dashboard";
import VisualizarCompras from "./pages/VisualizarCompras";




function App() {
  return (
    <Router>
      <div className="flex">
        <Header /> {/* Sidebar fixa */}
        <div className="ml-64 w-full p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/cupons" element={<Cupons />} />
            <Route path="/produtos/editar/:codigo" element={<EditarProduto />} />
            <Route path="/produtos/adicionar" element={<AdicionarProduto />} />
            <Route path="/clientes/editar/:cpf" element={<EditarCliente />} />
            <Route path="/clientes/adicionar" element={<AdicionarCliente />} />
            <Route path="/cupons/adicionar" element={<AdicionarCupom />} />
            <Route path="/cupons/editar/:codigo" element={<EditarCupom />} />
            <Route path="/administradores" element={<Administradores />} />
            <Route path="/administradores/adicionar" element={<AdicionarAdministrador />} />
            <Route path="/administradores/editar/:cpf" element={<EditarAdministrador />} />
            <Route path="/indicacoes" element={<Indica />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/avaliacoes" element={<Avaliacoes />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compras/historico" element={<VisualizarCompras />} />

            
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
