import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function ModalCliente({ cliente, onClose, onSave }) {
  const [dados, setDados] = useState({
    cpf: "",
    nome: "",
    email: ""
  });

  useEffect(() => {
    if (cliente) {
      setDados({
        cpf: cliente.cpf,
        nome: cliente.nome,
        email: cliente.email
      });
    }
  }, [cliente]);

  async function salvar() {
    try {
      console.log("🔍 Enviando cliente:", dados);

      let resposta;
      if (cliente) {
        resposta = await api.put("/clientes", dados);
      } else {
        resposta = await api.post("/clientes", dados);
      }

      console.log("✅ Resposta da API:", resposta.data);

      onSave(); // atualiza a lista
      onClose(); // fecha o modal
    } catch (erro) {
      console.error("❌ Erro ao salvar cliente:", erro.response?.data || erro.message);
      alert("Erro ao salvar cliente: " + (erro.response?.data || erro.message));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-2xl font-serif font-bold mb-4">
          {cliente ? "Editar Cliente" : "Adicionar Cliente"}
        </h2>

        {!cliente && (
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={dados.cpf}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-3"
          />
        )}

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={dados.nome}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={dados.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
            Cancelar
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={salvar}>
            {cliente ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
