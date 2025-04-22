import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Plus } from "lucide-react";


export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await api.get("/produtos");
        setProdutos(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
      }
    }

    carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  async function deletarProduto(codigo) {
    try {
      await api.delete(`/produtos/${codigo}`);
      setProdutos(produtos.filter((produto) => produto.codigo !== codigo));
    } catch (erro) {
      console.error("Erro ao deletar produto:", erro);
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800">Produtos Disponíveis</h1>
        <div className="flex gap-2 items-center">
          <button
          
            onClick={() => navigate("/produtos/adicionar")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200"
          >
            <span className="text-sm font-medium">Adicionar Produto</span>
          </button>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 w-full md:w-80">
            <Search className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Buscar produto..."
              className="flex-1 outline-none text-sm bg-transparent"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {produtosFiltrados.map((produto) => (
          <div
            key={produto.codigo}
            className="group bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={produto.imagem || "/default-image.jpg"}
              alt={produto.nome}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-sm">
              <h2 className="text-base font-semibold text-gray-800">{produto.nome}</h2>
              <p className="text-xs text-gray-500 line-clamp-2">{produto.descricao}</p>
              <p className="text-base font-bold text-yellow-600 mt-1">
                R$ {produto.preco.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">Estoque: {produto.estoque}</p>
              <div className="mt-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <button
                  className="px-4 py-1 text-xs border border-gray-800 rounded-full text-gray-800 hover:bg-gray-800 hover:text-white flex items-center gap-1 transition duration-200"
                  onClick={() => navigate(`/produtos/editar/${produto.codigo}`)}
                >
                  <Pencil size={16} /> Editar
                </button>
                <button
                  className="px-4 py-1 text-xs border border-red-600 rounded-full text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-1 transition duration-200"
                  onClick={() => deletarProduto(produto.codigo)}
                >
                  <Trash2 size={16} /> Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}