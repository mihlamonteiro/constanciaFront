import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Pencil, Trash2, Search } from "lucide-react";
import ModalCliente from "../components/ModalCliente";
import { useNavigate } from "react-router-dom";


export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    try {
      const resposta = await api.get("/clientes");
      setClientes(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar clientes:", erro);
    }
  }

  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.email.toLowerCase().includes(busca.toLowerCase())
  );

  async function salvarCliente(dados) {
    try {
      if (clienteEditando) {
        await api.put("/clientes", dados);
      } else {
        await api.post("/clientes", dados);
      }
      setShowModal(false);
      carregarClientes();
    } catch (erro) {
      console.error("Erro ao salvar cliente:", erro);
      alert("Erro ao salvar cliente.");
    }
  }

  async function excluirCliente(cpf) {
    try {
      await api.delete(`/clientes/${cpf}`);
      carregarClientes();
    } catch (erro) {
      console.error("Erro ao excluir cliente:", erro);
      alert("Erro ao excluir cliente.");
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800">Clientes</h1>

        <div className="flex gap-2 items-center">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 w-full md:w-80">
            <Search className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="flex-1 outline-none text-sm bg-transparent"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <button
          
            onClick={() => navigate("/clientes/adicionar")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200"
          >
            <span className="text-sm font-medium">Adicionar Cliente</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {clientesFiltrados.map((c) => (
          <div
            key={c.cpf}
            className="group bg-white border border-gray-200 shadow-sm rounded-xl p-4 transition-all duration-300 hover:shadow-md"
          >
            <h2 className="text-lg font-serif font-semibold text-gray-800">{c.nome}</h2>
            <p className="text-sm text-gray-500">{c.email}</p>
            <p className="text-sm text-gray-500">Telefone: (editável no modal)</p>

            <div className="mt-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
              <button
                className="px-4 py-1 text-xs border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition"
                onClick={() => navigate(`/clientes/editar/${c.cpf}`)}

              >
                <Pencil size={16} /> Editar
              </button>
              <button
                className="px-4 py-1 text-xs border border-red-600 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition"
                onClick={() => excluirCliente(c.cpf)}
              >
                <Trash2 size={16} /> Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalCliente
          cliente={clienteEditando}
          onClose={() => setShowModal(false)}
          onSave={salvarCliente}
        />
      )}
    </div>
  );
}
