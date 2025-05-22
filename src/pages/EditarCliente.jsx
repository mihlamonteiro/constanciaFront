import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EditarCliente() {
  const { cpf } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    cpf: "",
    nome: "",
    email: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    cep: ""
  });

  useEffect(() => {
    async function fetchCliente() {
      try {
        const res = await api.get(`/clientes/${cpf}`);
        setCliente(res.data);
      } catch (err) {
        alert("Erro ao buscar cliente.");
      }
    }
    fetchCliente();
  }, [cpf]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleCepBlur = () => {
    if (cliente.cep.length === 8 || cliente.cep.length === 9) {
      fetch(`https://viacep.com.br/ws/${cliente.cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setCliente(prev => ({
              ...prev,
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade
            }));
          } else {
            alert("CEP não encontrado.");
          }
        })
        .catch(() => alert("Erro ao buscar o CEP."));
    }
  };

  const salvar = async () => {
    try {
      await api.put("/clientes", cliente);
      alert("Cliente atualizado com sucesso!");
      navigate("/clientes");
    } catch (err) {
      alert("Erro ao atualizar cliente.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-6 text-gray-800">Editar Cliente</h1>
      <div className="space-y-4">
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={cliente.cpf}
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={cliente.nome}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={cliente.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="cep"
          placeholder="CEP"
          value={cliente.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="rua"
          placeholder="Rua"
          value={cliente.rua}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="numero"
          placeholder="Número"
          value={cliente.numero}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={cliente.bairro}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={cliente.cidade}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/clientes")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={salvar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
