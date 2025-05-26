{/*import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Heart } from "lucide-react";

export default function Avaliacoes() {
  const [compras, setCompras] = useState([]);
  const [compraSelecionada, setCompraSelecionada] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [nota, setNota] = useState(0);

  useEffect(() => {
    carregarComprasSemAvaliacao();
  }, []);

  async function carregarComprasSemAvaliacao() {
    try {
      const res = await api.get("/compras");
      const semNota = res.data.filter(c => !c.nota || c.nota === 0);
      setCompras(semNota);
    } catch (err) {
      console.error("Erro ao buscar compras:", err);
    }
  }

  async function enviarAvaliacao() {
    if (!compraSelecionada || nota === 0 || avaliacao.trim() === "") {
      alert("Preencha todos os campos antes de enviar.");
      return;
    }

    try {
      await api.put(`/compras/avaliar/${compraSelecionada}`, {
        avaliacao,
        nota,
        data_avaliacao: new Date()
      });
      alert("Avaliação enviada com sucesso!");
      setAvaliacao("");
      setNota(0);
      setCompraSelecionada("");
      carregarComprasSemAvaliacao();
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
      alert("Erro ao enviar avaliação.");
    }
  }

  return (
    <div className="ml-64 p-6 bg-[#FAF9F6] min-h-screen font-serif">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Avaliar Compra</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-700">Selecione a compra</label>
        <select
          value={compraSelecionada}
          onChange={(e) => setCompraSelecionada(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">-- Selecione --</option>
          {compras.map((compra) => (
            <option key={compra.numero} value={compra.numero}>
              Compra #{compra.numero} - R$ {compra.valor_total.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-700">Sua avaliação</label>
        <textarea
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm text-gray-700">Nota</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Heart
              key={n}
              size={28}
              className={`cursor-pointer transition ${
                n <= nota ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setNota(n)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={enviarAvaliacao}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        Enviar Avaliação
      </button>
    </div>
  );
}*/}
