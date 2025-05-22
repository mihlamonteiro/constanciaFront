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
    dataCadastro: "",
    cpfAdministrador: ""
  });
  const [imagem, setImagem] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const adicionarProduto = async () => {
    if (!imagem) {
      alert("Selecione uma imagem para o produto.");
      return;
    }

    const formData = new FormData();
    formData.append("produto", new Blob([JSON.stringify(produto)], { type: "application/json" }));
    formData.append("imagem", imagem);

    try {
      await api.post("/produtos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Produto adicionado com sucesso!");
      navigate("/produtos");
    } catch (erro) {
      console.error("Erro ao adicionar produto:", erro);
      alert("Erro ao adicionar produto: " + (erro.response?.data || erro.message));
    }
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
          name="cpfAdministrador"
          value={produto.cpfAdministrador}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Imagem do Produto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImagemChange}
          className="w-full mb-4"
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
