import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Pencil, Power, PowerOff, Search } from "lucide-react";
import ModalFuncionario from "../components/ModalFuncionario";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function carregarFuncionarios() {
    try {
      const resposta = await api.get("/funcionarios");
      setFuncionarios(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar funcionários:", erro);
    }
  }

  const funcionariosFiltrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(busca.toLowerCase()) ||
    f.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  async function toggleStatus(cpf, ativo) {
    try {
      if (ativo) {
        await api.put(`/funcionarios/desativar/${cpf}`);
      } else {
        await api.put(`/funcionarios/ativar/${cpf}`);
      }
      carregarFuncionarios();
    } catch (erro) {
      console.error("Erro ao alterar status:", erro);
    }
  }

  async function salvarFuncionario(dados) {
    try {
      if (funcionarioEditando) {
        await api.put("/funcionarios", dados);
      } else {
        await api.post("/funcionarios", dados);
      }
      setShowModal(false);
      carregarFuncionarios();
    } catch (erro) {
      console.error("Erro ao salvar funcionário:", erro);
      alert("Erro ao salvar funcionário.");
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800">Funcionários</h1>

        <div className="flex gap-2 items-center">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 w-full md:w-80">
            <Search className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Buscar funcionário..."
              className="flex-1 outline-none text-sm bg-transparent"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <button
          
          onClick={() => {
            setFuncionarioEditando(null);
            setShowModal(true);
          }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200"
          >
            <span className="text-sm font-medium">Adicionar Funcionario</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {funcionariosFiltrados.map((f) => (
          <div
            key={f.cpf}
            className={`group border rounded-xl p-4 shadow-sm transition-all duration-300 ${
              f.ativo ? "bg-white hover:shadow-md" : "bg-gray-100 opacity-70"
            }`}
          >
            <h2 className="text-lg font-serif font-semibold text-gray-800">{f.nome}</h2>
            <p className="text-sm text-gray-500">{f.cargo}</p>
            <p className={`text-xs font-medium mt-2 ${f.ativo ? "text-green-600" : "text-red-600"}`}>
              {f.ativo ? "Ativo" : "Inativo"}
            </p>

            <div className="mt-4 flex justify-center gap-2 transition duration-300">
              <button
                className="px-4 py-1 text-xs border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition"
                onClick={() => {
                  setFuncionarioEditando(f);
                  setShowModal(true);
                }}
                disabled={!f.ativo}
              >
                <Pencil size={16} /> Editar
              </button>
              <button
                className={`px-4 py-1 text-xs border rounded-full transition duration-200 ${
                  f.ativo
                    ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
                onClick={() => toggleStatus(f.cpf, f.ativo)}
              >
                {f.ativo ? <PowerOff size={16} /> : <Power size={16} />}
                {f.ativo ? "Desativar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalFuncionario
          funcionario={funcionarioEditando}
          onClose={() => setShowModal(false)}
          onSave={salvarFuncionario}
        />
      )}
    </div>
  );
}
