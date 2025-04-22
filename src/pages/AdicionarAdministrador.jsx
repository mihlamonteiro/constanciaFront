import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdicionarAdministrador() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cpf: "", nome: "", data_nasc: "", telefone: "",
    rua: "", cep: "", bairro: "", numero: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const salvar = async () => {
    try {
      await api.post("/administradores", form);
      alert("Administrador cadastrado com sucesso!");
      navigate("/administradores");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      alert("Erro ao cadastrar administrador.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-serif font-bold mb-6 text-gray-800">Adicionar Administrador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["cpf", "nome", "telefone", "data_nasc", "cep", "bairro", "rua", "numero"].map((campo) => (
          <input
            key={campo}
            type={campo === "data_nasc" ? "date" : "text"}
            name={campo}
            placeholder={campo[0].toUpperCase() + campo.slice(1).replace("_", " ")}
            value={form[campo]}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={() => navigate("/administradores")} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
        <button onClick={salvar} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
      </div>
    </div>
  );
}
