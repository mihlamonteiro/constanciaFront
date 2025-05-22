import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditarProduto() {
  const { codigo } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarProduto() {
      try {
        const resposta = await api.get(`/produtos/${codigo}`);
        setProduto(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar produto:", erro);
      }
    }

    if (codigo) {
      carregarProduto();
    }
  }, [codigo]);

  async function salvarEdicao() {
    try {
      const formData = new FormData();
      formData.append("produto", new Blob([JSON.stringify(produto)], { type: "application/json" }));
      if (imagem) {
        formData.append("imagem", imagem);
      }

      await api.put(`/produtos/${codigo}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      navigate("/produtos");
    } catch (erro) {
      console.error("Erro ao editar produto:", erro);
    }
  }

  if (!produto) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-serif font-bold text-gray-800">Editar Produto</h1>

      <div className="mt-4">
        <label className="block text-sm text-gray-700">Nome</label>
        <input
          type="text"
          value={produto.nome}
          onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Descrição</label>
        <textarea
          value={produto.descricao}
          onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Preço</label>
        <input
          type="number"
          value={produto.preco}
          onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Estoque</label>
        <input
          type="number"
          value={produto.estoque}
          onChange={(e) => setProduto({ ...produto, estoque: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block text-sm text-gray-700">Imagem Atual</label>
        <div className="mb-4">
          <img
            src={produto.nomeImagem ? `http://localhost:8080/uploads/${produto.nomeImagem}` : "/default-image.jpg"}
            alt="Imagem atual do produto"
            className="w-32 h-32 object-cover rounded border"
          />
        </div>

        <label className="block text-sm text-gray-700">Nova Imagem (opcional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
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
            onClick={salvarEdicao}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
