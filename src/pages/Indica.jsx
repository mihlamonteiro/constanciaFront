// src/components/Indica.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Trash2 } from "lucide-react";

export default function Indica() {
  const [indicacoes, setIndicacoes] = useState([]);
  const [cpfIndicador, setCpfIndicador] = useState("");
  const [cpfIndicado, setCpfIndicado] = useState("");
  const [cpfs, setCpfs] = useState([]);
  const [loadingCpfs, setLoadingCpfs] = useState(true);
  const [errorCpfs, setErrorCpfs] = useState(false);

  useEffect(() => {
    carregarIndicacoes();
    fetchCpfs();
  }, []);

  const carregarIndicacoes = async () => {
    try {
      const resposta = await api.get("/indicacoes");
      setIndicacoes(resposta.data);
    } catch (err) {
      console.error("Erro ao carregar indicações:", err);
    }
  };

  const fetchCpfs = async () => {
    try {
      const res = await api.get("/clientes/cpfs");
      setCpfs(res.data);
    } catch (err) {
      console.error("Erro ao carregar CPFs:", err);
      setErrorCpfs(true);
    } finally {
      setLoadingCpfs(false);
    }
  };

  const indicar = async () => {
    if (!cpfIndicador || !cpfIndicado) {
      alert("Informe ambos os CPFs.");
      return;
    }

    try {
      await api.post("/indicacoes", { cpfIndicador, cpfIndicado });
      setCpfIndicador("");
      setCpfIndicado("");
      carregarIndicacoes();
    } catch (err) {
      alert(err.response?.data || "Erro ao registrar indicação.");
    }
  };

  const remover = async (cpfIndicador, cpfIndicado) => {
    try {
      await api.delete("/indicacoes", {
        data: { cpfIndicador, cpfIndicado },
      });
      carregarIndicacoes();
    } catch (err) {
      console.error("Erro ao remover indicação:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-6 text-gray-800">
        Indicações de Clientes
      </h1>

      <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
        {/* Dropdown CPF Indicador */}
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-700">
            Cliente Indicador *
          </label>
          {loadingCpfs ? (
            <p>Carregando CPFs...</p>
          ) : errorCpfs ? (
            <p className="text-red-600">Erro ao carregar CPFs</p>
          ) : (
            <select
              value={cpfIndicador}
              onChange={(e) => setCpfIndicador(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">-- Selecione um CPF --</option>
              {cpfs.map((cpf) => (
                <option key={cpf} value={cpf}>
                  {cpf}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Dropdown CPF Indicado */}
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-700">
            Cliente Indicado *
          </label>
          {loadingCpfs ? (
            <p>Carregando CPFs...</p>
          ) : errorCpfs ? (
            <p className="text-red-600">Erro ao carregar CPFs</p>
          ) : (
            <select
              value={cpfIndicado}
              onChange={(e) => setCpfIndicado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">-- Selecione um CPF --</option>
              {cpfs.map((cpf) => (
                <option key={cpf} value={cpf}>
                  {cpf}
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          onClick={indicar}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200"
        >
          <span className="text-sm font-medium">Indicar</span>
        </button>
      </div>

      {/* Lista só de clientes indicados */}
      <div className="mt-8 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Clientes Indicados
        </h2>
        {indicacoes.length === 0 ? (
          <p className="text-sm text-gray-500">
            Nenhuma indicação registrada.
          </p>
        ) : (
          <ul className="list-disc pl-5 text-sm text-gray-800">
            {indicacoes.map((i, idx) => (
              <li key={idx}>{i.cpfIndicado || i.cpf_indicado}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Lista completa com botão de excluir */}
      <div className="space-y-3">
        {indicacoes.map((i, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border p-3 rounded shadow-sm"
          >
            <span className="text-sm text-gray-700">
              <strong>{i.cpfIndicador || i.cpf_indicador}</strong> indicou{" "}
              <strong>{i.cpfIndicado || i.cpf_indicado}</strong>
            </span>
            <button
              onClick={() => remover(i.cpfIndicador, i.cpfIndicado)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
