import React, { useState, useEffect } from "react";

export default function ModalFuncionario({ funcionario, onClose, onSave }) {
  const [dados, setDados] = useState({
    cpf: "",
    nome: "",
    cargo: "",
    data_nasc: "",
    telefone: "",
    cep: "",
    bairro: "",
    numero: "",
    rua: "",
    cpf_administrador: ""
  });

  useEffect(() => {
    if (funcionario) {
      setDados(funcionario);
    }
  }, [funcionario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const handleSubmit = () => {
    onSave(dados);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-2xl font-serif font-bold mb-4">
          {funcionario ? "Editar Funcionário" : "Adicionar Funcionário"}
        </h2>

        {!funcionario && (
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={dados.cpf}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-3"
          />
        )}

        <input type="text" name="nome" placeholder="Nome" value={dados.nome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-3" />
        <input type="text" name="cargo" placeholder="Cargo" value={dados.cargo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-3" />
        <input type="date" name="data_nasc" value={dados.data_nasc} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-3" />
        <input type="text" name="telefone" placeholder="Telefone" value={dados.telefone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-3" />
        <input type="text" name="cep" placeholder="CEP" value={dados.cep} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-3" />
        <input type="text" name="bairro" placeholder="Bairro" value={dados.bairro} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-3" />
        <input type="text" name="numero" placeholder="Número" value={dados.numero} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-3" />
        <input type="text" name="rua" placeholder="Rua" value={dados.rua} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-3" />
        <input type="text" name="cpf_administrador" placeholder="CPF do Administrador" value={dados.cpf_administrador} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" />

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>Cancelar</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
            {funcionario ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
