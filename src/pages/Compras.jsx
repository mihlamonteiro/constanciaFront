// src/components/RegistrarCompra.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function RegistrarCompra() {
  const [numero, setNumero] = useState("");
  const [dataCompra, setDataCompra] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [cpfCliente, setCpfCliente] = useState("");
  const [codigoCupom, setCodigoCupom] = useState("");

  const [clientes, setClientes] = useState([]);
  const [cupons, setCupons] = useState([]);

  useEffect(() => {
    // buscar lista de CPFs
    api.get("/clientes/cpfs")
      .then(res => setClientes(res.data))
      .catch(err => console.error("Erro ao buscar CPFs:", err));

    // buscar lista de cupons
    api.get("/cupons")
      .then(res => setCupons(res.data))
      .catch(err => console.error("Erro ao buscar cupons:", err));
  }, []);

  async function registrarCompra() {
    if (!numero || !dataCompra || !valorTotal || !cpfCliente) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const payload = {
      numero: parseInt(numero, 10),
      data_compra: dataCompra,
      valor_total: parseFloat(valorTotal),
      cpf_cliente: cpfCliente,
      codigo_cupom: codigoCupom ? parseInt(codigoCupom, 10) : null
    };

    try {
      await api.post("/compras", payload);
      alert("Compra registrada com sucesso!");
      // limpar campos
      setNumero("");
      setDataCompra("");
      setValorTotal("");
      setCpfCliente("");
      setCodigoCupom("");
    } catch (error) {
      console.error("Erro ao registrar compra:", error);
      alert("Erro ao registrar compra.");
    }
  }

  return (
    <div className="ml-64 p-6 bg-[#FAF9F6] min-h-screen font-serif max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registrar Compra</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Número */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">Número *</label>
          <input
            type="number"
            value={numero}
            onChange={e => setNumero(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Data da Compra */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">Data da Compra *</label>
          <input
            type="date"
            value={dataCompra}
            onChange={e => setDataCompra(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Valor Total */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">Valor Total (R$) *</label>
          <input
            type="number"
            step="0.01"
            value={valorTotal}
            onChange={e => setValorTotal(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* CPF do Cliente */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">CPF do Cliente *</label>
          <select
            value={cpfCliente}
            onChange={e => setCpfCliente(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Selecione um CPF --</option>
            {clientes.map(cpf => (
              <option key={cpf} value={cpf}>
                {cpf}
              </option>
            ))}
          </select>
        </div>

        {/* Cupom (opcional) */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">Cupom (opcional)</label>
          <select
            value={codigoCupom}
            onChange={e => setCodigoCupom(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Nenhum cupom --</option>
            {cupons.map(cupom => (
              <option key={cupom.codigo} value={cupom.codigo}>
                {cupom.codigo} – {cupom.descricao} (–R$ {cupom.valorDesconto.toFixed(2)})
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={registrarCompra}
        className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        Registrar Compra
      </button>
    </div>
  );
}
