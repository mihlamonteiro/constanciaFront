import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Pencil, Power, PowerOff, Search } from "lucide-react";

export default function Administradores() {
  const [administradores, setAdministradores] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const res = await api.get("/administradores");
      setAdministradores(res.data);
    } catch (err) {
      console.error("Erro ao buscar administradores", err);
    }
  }

  async function toggleAtivo(cpf, ativo) {
    try {
      if (ativo) {
        await api.put(`/administradores/desativar/${cpf}`);
      } else {
        await api.put(`/administradores/ativar/${cpf}`);
      }
      carregar();
    } catch (err) {
      console.error("Erro ao ativar/desativar:", err);
    }
  }

  const filtrados = administradores.filter((adm) =>
    adm.nome.toLowerCase().includes(busca.toLowerCase()) ||
    adm.cpf.includes(busca)
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-800">Administradores</h1>

        <div className="flex gap-3">
          <div className="flex items-center border px-3 py-1 rounded-lg">
            <Search className="text-gray-500 mr-2" size={18} />
            <input
              placeholder="Buscar por nome ou CPF"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="bg-transparent outline-none text-sm"
            />
          </div>

          <button
          
            onClick={() => navigate("/administradores/adicionar")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200"
          >
            <span className="text-sm font-medium">Adicionar Administrador</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filtrados.map((adm) => (
          <div
            key={adm.cpf}
            className={`group border p-4 rounded-xl shadow transition ${
              adm.ativo ? "bg-white hover:shadow-lg" : "bg-gray-100 opacity-70"
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-800">{adm.nome}</h2>
            <p className="text-sm text-gray-500">CPF: {adm.cpf}</p>
            <p className={`text-xs font-medium mt-1 ${adm.ativo ? "text-green-600" : "text-red-600"}`}>
              {adm.ativo ? "Ativo" : "Inativo"}
            </p>

            <div className="mt-4 flex justify-center gap-2 transition">
              <button
                onClick={() => navigate(`/administradores/editar/${adm.cpf}`)}
                className="px-3 py-1 text-xs border border-gray-800 rounded text-gray-800 hover:bg-gray-800 hover:text-white"
                disabled={!adm.ativo}
              >
                <Pencil size={14} /> Editar
              </button>
              <button
                onClick={() => toggleAtivo(adm.cpf, adm.ativo)}
                className={`px-3 py-1 text-xs border rounded ${
                  adm.ativo
                    ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                {adm.ativo ? <PowerOff size={14} /> : <Power size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
