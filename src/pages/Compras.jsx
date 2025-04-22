import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Compras() {
  const [numero, setNumero] = useState("");
  const [dataCompra, setDataCompra] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [cpfCliente, setCpfCliente] = useState("");
  const [codigoCupom, setCodigoCupom] = useState("");
  const [cupons, setCupons] = useState([]);

  useEffect(() => {
    buscarCupons();
  }, []);

  async function buscarCupons() {
    try {
      const res = await api.get("/cupons");
      setCupons(res.data);
    } catch (error) {
      console.error("Erro ao buscar cupons:", error);
    }
  }

  async function registrarCompra() {
    if (!numero || !dataCompra || !valorTotal || !cpfCliente) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const dados = {
        numero: parseInt(numero),
        data_compra: dataCompra,
        valor_total: parseFloat(valorTotal),
        cpf_cliente: cpfCliente,
        codigo_cupom: codigoCupom ? parseInt(codigoCupom) : null
      };

      await api.post("/compras", dados);
      alert("Compra registrada com sucesso!");

      // limpar
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
    <div className="ml-64 p-6 bg-[#FAF9F6] min-h-screen font-serif">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Registrar Compra</h1>

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
        <div>
          <label className="block mb-1 text-sm text-gray-700">Número da Compra *</label>
          <input
            type="number"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">Data da Compra *</label>
          <input
            type="date"
            value={dataCompra}
            onChange={(e) => setDataCompra(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">Valor Total (antes do desconto) *</label>
          <input
            type="number"
            step="0.01"
            value={valorTotal}
            onChange={(e) => setValorTotal(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">CPF do Cliente *</label>
          <input
            type="text"
            value={cpfCliente}
            onChange={(e) => setCpfCliente(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm text-gray-700">Cupom (opcional)</label>
          <select
            value={codigoCupom}
            onChange={(e) => setCodigoCupom(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Nenhum cupom --</option>
            {cupons.map((cupom) => (
              <option key={cupom.codigo} value={cupom.codigo}>
                {cupom.codigo} - {cupom.descricao} (-R$ {cupom.valorDesconto.toFixed(2)})
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
