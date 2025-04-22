import React, { useState } from 'react';

function Modal({ produto, onClose, onSave }) {
  const [codigo, setCodigo] = useState(produto ? produto.codigo : "");
  const [nome, setNome] = useState(produto ? produto.nome : "");
  const [descricao, setDescricao] = useState(produto ? produto.descricao : "");
  const [preco, setPreco] = useState(produto ? produto.preco : "");
  const [estoque, setEstoque] = useState(produto ? produto.estoque : "");
  const [dataCadastro, setDataCadastro] = useState(produto ? produto.dataCadastro : "");
  const [cpfAdministrador, setCpfAdministrador] = useState(produto ? produto.cpfAdministrador : "");

  function handleSave() {
    const novoProduto = {
      codigo: parseInt(codigo),
      nome,
      descricao,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      dataCadastro,
      cpfAdministrador
    };
    onSave(novoProduto);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">
          {produto ? "Editar Produto" : "Adicionar Produto"}
        </h2>

        {!produto && (
          <input
            type="number"
            placeholder="Código"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        )}

        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          type="number"
          placeholder="Estoque"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data de Cadastro"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={dataCadastro}
          onChange={(e) => setDataCadastro(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF do Administrador"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={cpfAdministrador}
          onChange={(e) => setCpfAdministrador(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={onClose}>
            Cancelar
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>
            {produto ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
