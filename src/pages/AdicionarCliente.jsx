import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Trash2 } from "lucide-react";

export default function AdicionarCliente() {
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

  const [telefones, setTelefones] = useState([]);
  const [novoTelefone, setNovoTelefone] = useState("");

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

  const adicionarTelefone = () => {
    if (novoTelefone && !telefones.includes(novoTelefone)) {
      setTelefones([...telefones, novoTelefone]);
      setNovoTelefone("");
    }
  };

  const removerTelefone = (tel) => {
    setTelefones(telefones.filter(t => t !== tel));
  };

  const salvar = async () => {
    if (!cliente.cpf || !cliente.nome || !cliente.email) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await api.post("/clientes", cliente);

      for (const tel of telefones) {
        await api.post("/telefones", {
          cpfCliente: cliente.cpf,
          telefone: tel
        });
      }

      alert("Cliente adicionado com sucesso!");
      navigate("/clientes");
    } catch (erro) {
      console.error("Erro ao adicionar cliente:", erro);
      alert("Erro ao adicionar cliente: " + (erro.response?.data || erro.message));
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-6 text-gray-800">Adicionar Cliente</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={cliente.cpf}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
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

        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">Telefones</h3>

          {telefones.map((tel, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span>{tel}</span>
              <button
                onClick={() => removerTelefone(tel)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Novo telefone"
              value={novoTelefone}
              onChange={(e) => setNovoTelefone(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={adicionarTelefone}
              className="px-4 bg-green-600 text-white rounded hover:bg-green-700"
            >
              +
            </button>
          </div>
        </div>

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
            Adicionar Cliente
          </button>
        </div>
      </div>
    </div>
  );
}
