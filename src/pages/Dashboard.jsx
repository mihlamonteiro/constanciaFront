// src/components/Dashboard.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function Dashboard() {
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [comprasData, setComprasData] = useState([]);
  const [avaliacoesData, setAvaliacoesData] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const resCompras = await api.get(
          `/compras/dashboard/compras-por-mes?ano=${anoSelecionado}`
        );
        console.log("compras raw:", resCompras.data);
        setComprasData(resCompras.data);
      } catch (err) {
        console.error("Erro ao buscar médias de compras:", err);
      }

      try {
        const resAvali = await api.get(
          `/compras/dashboard/avaliacoes-por-mes?ano=${anoSelecionado}`
        );
        console.log("avaliações raw:", resAvali.data);
        setAvaliacoesData(resAvali.data);
      } catch (err) {
        console.error("Erro ao buscar médias de avaliações:", err);
      }
    }

    carregar();
  }, [anoSelecionado]);

  const anos = [2023, 2024, 2025];

  return (
    <div className="ml-64 p-6 bg-[#FAF9F6] min-h-screen font-serif">
      {/* cabeçalho com seletor de ano */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard de Médias</h1>
        <select
          value={anoSelecionado}
          onChange={(e) => setAnoSelecionado(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* gráfico de média de compras */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Média de Compras por Mês
          </h2>
          {comprasData.length === 0 ? (
            <p className="text-center text-gray-500">
              Sem dados de compras para {anoSelecionado}
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={comprasData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="media"
                  stroke="#38a169"
                  name="Média (R$)"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* gráfico de média de avaliações */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Média de Avaliações por Mês
          </h2>
          {avaliacoesData.length === 0 ? (
            <p className="text-center text-gray-500">
              Sem dados de avaliações para {anoSelecionado}
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={avaliacoesData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="mes" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mediaNota"
                  stroke="#f6ad55"
                  name="Nota média"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
