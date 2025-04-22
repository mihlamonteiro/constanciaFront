import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdicionarProduto() {
  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    dataCadastro: "", // formato yyyy-MM-dd
    cpfAdministrador: ""
  });

  const navigate = useNavigate();

  const adicionarProduto = async () => {
    console.log("Produto sendo enviado:", produto); // Debug

    try {
      const resposta = await api.post("/produtos", produto);
      console.log("Resposta da API:", resposta.data);
      navigate("/produtos");
    } catch (erro) {
      if (erro.response) {
        console.error("Erro na resposta da API:", erro.response.data);
        alert("Erro ao adicionar produto: " + erro.response.data);
      } else if (erro.request) {
        console.error("Sem resposta da API:", erro.request);
        alert("Erro: sem resposta da API.");
      } else {
        console.error("Erro desconhecido:", erro.message);
        alert("Erro desconhecido ao adicionar produto.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-serif font-bold text-gray-800">Adicionar Novo Produto</h1>

      <div className="mt-4">
        <label className="block text-sm text-gray-700">Código</label>
        <input
          type="number"
          name="codigo"
          value={produto.codigo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Nome</label>
        <input
          type="text"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Descrição</label>
        <textarea
          name="descricao"
          value={produto.descricao}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Preço</label>
        <input
          type="number"
          step="0.01"
          name="preco"
          value={produto.preco}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Estoque</label>
        <input
          type="number"
          name="estoque"
          value={produto.estoque}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Data de Cadastro</label>
        <input
          type="date"
          name="dataCadastro"
          value={produto.dataCadastro}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">CPF do Administrador</label>
        <input
          type="text"
          name="cpfAdministrador" // <- CAMPO CORRETO agora
          value={produto.cpfAdministrador}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded"
            onClick={() => navigate("/produtos")}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={adicionarProduto}
          >
            Adicionar Produto
          </button>
        </div>
      </div>
    </div>
  );
}
