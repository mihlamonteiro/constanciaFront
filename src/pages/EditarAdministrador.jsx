import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditarAdministrador() {
  const { cpf } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cpf: "", nome: "", data_nasc: "", telefone: "",
    rua: "", cep: "", bairro: "", numero: "", ativo: true
  });

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get(`/administradores/${cpf}`);
        setForm(res.data);
      } catch (err) {
        console.error("Erro ao buscar administrador:", err);
        alert("Erro ao carregar administrador.");
        navigate("/administradores");
      }
    }

    carregar();
  }, [cpf, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const salvar = async () => {
    try {
      await api.put("/administradores", form);
      alert("Administrador atualizado com sucesso!");
      navigate("/administradores");
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Erro ao atualizar administrador.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-serif font-bold mb-6 text-gray-800">Editar Administrador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["nome", "telefone", "data_nasc", "cep", "bairro", "rua", "numero"].map((campo) => (
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

        <input
          type="text"
          name="cpf"
          value={form.cpf}
          disabled
          className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-500 col-span-full"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={() => navigate("/administradores")} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
        <button onClick={salvar} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
      </div>
    </div>
  );
}
