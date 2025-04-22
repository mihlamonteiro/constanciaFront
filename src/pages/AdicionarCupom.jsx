import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdicionarCupom() {
  const navigate = useNavigate();
  const [cupom, setCupom] = useState({
    codigo: "",
    dataInicio: "",
    dataVencimento: "",
    valorDesconto: "",
    descricao: "",
    condicoesUso: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCupom({ ...cupom, [name]: value });
  };

  const salvar = async () => {
    try {
      await api.post("/cupons", cupom);
      alert("Cupom adicionado com sucesso!");
      navigate("/cupons");
    } catch (erro) {
      console.error("Erro ao adicionar cupom:", erro);
      alert("Erro ao adicionar cupom: " + (erro.response?.data || erro.message));
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-6 text-gray-800">Adicionar Cupom</h1>

      <div className="space-y-4">
        <input type="number" name="codigo" placeholder="Código" value={cupom.codigo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="date" name="dataInicio" placeholder="Data Início" value={cupom.dataInicio} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="date" name="dataVencimento" placeholder="Data Vencimento" value={cupom.dataVencimento} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" step="0.01" name="valorDesconto" placeholder="Valor de Desconto" value={cupom.valorDesconto} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <textarea name="descricao" placeholder="Descrição" value={cupom.descricao} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <textarea name="condicoesUso" placeholder="Condições de Uso" value={cupom.condicoesUso} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />

        <div className="flex justify-between mt-6">
          <button onClick={() => navigate("/cupons")} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
          <button onClick={salvar} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Adicionar</button>
        </div>
      </div>
    </div>
  );
}
