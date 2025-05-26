import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search, RefreshCw } from "lucide-react";

export default function Cupons() {
  const [cupons, setCupons] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregarCupons();
  }, []);

  const carregarCupons = async () => {
    try {
      const resposta = await api.get("/cupons");
      setCupons(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar cupons:", erro);
    }
  };

  const excluirCupom = async (codigo) => {
    if (!window.confirm("Tem certeza que deseja excluir este cupom?")) return;

    try {
      await api.delete(`/cupons/${codigo}`);
      carregarCupons();
    } catch (erro) {
      console.error("Erro ao excluir cupom:", erro);
      alert("Erro ao excluir cupom.");
    }
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return "--";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const hoje = new Date();

  const cuponsFiltrados = cupons.filter((cupom) =>
    cupom.descricao?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800">Cupons de Desconto</h1>

        <div className="flex gap-2 items-center">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 w-full md:w-80">
            <Search className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Buscar cupom..."
              className="flex-1 outline-none text-sm bg-transparent"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <button
            onClick={carregarCupons}
            className="px-3 py-2 bg-yellow-400 rounded-lg text-white hover:bg-yellow-500 transition"
            title="Recarregar Cupons"
          >
            <RefreshCw size={20} />
          </button>
          <button
            onClick={() => navigate("/cupons/adicionar")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200"
          >
            <span className="text-sm font-medium">Adicionar Cupom</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cuponsFiltrados.map((cupom) => {
          const vencimento = new Date(cupom.dataVencimento);
          const expirado = vencimento < hoje;
          return (
            <div
              key={cupom.codigo}
              className={`group bg-white border ${
                expirado ? "border-red-500" : "border-gray-200"
              } shadow-sm rounded-xl p-4 transition-all duration-300 hover:shadow-md`}
            >
              <h2 className="text-lg font-serif font-semibold text-gray-800">
                Código: {cupom.codigo}
              </h2>
              <p className="text-sm text-gray-600">{cupom.descricao}</p>
              <p className="text-sm text-gray-500 mt-1 italic">
                Desconto: {formatarMoeda(cupom.valorDesconto)}
              </p>
              <p className="text-sm text-gray-500">Início: {formatarData(cupom.dataInicio)}</p>
              <p className="text-sm text-gray-500">
                Vencimento:{" "}
                <span className={expirado ? "text-red-600 font-semibold" : ""}>
                  {formatarData(cupom.dataVencimento)}
                </span>
              </p>

              <div className="mt-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <button
                  onClick={() => navigate(`/cupons/editar/${cupom.codigo}`)}
                  className="px-4 py-1 text-xs border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition"
                >
                  <Pencil size={16} /> Editar
                </button>
                <button
                  onClick={() => excluirCupom(cupom.codigo)}
                  className="px-4 py-1 text-xs border border-red-600 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition"
                >
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
