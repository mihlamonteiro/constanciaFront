import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Compras() {
  const [numero, setNumero] = useState("");
  const [dataCompra, setDataCompra] = useState("");
  const [cpfCliente, setCpfCliente] = useState("");
  const [codigoCupom, setCodigoCupom] = useState("");

  const [clientes, setClientes] = useState([]);
  const [cupons, setCupons] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([{ codigoProduto: "", quantidade: 1 }]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    api.get("/clientes/cpfs").then(res => setClientes(res.data));
    api.get("/cupons").then(res => setCupons(res.data));
    api.get("/produtos").then(res => setProdutos(res.data));
  }, []);

  useEffect(() => {
    let total = 0;
    itens.forEach(item => {
      const p = produtos.find(prod => prod.codigo === parseInt(item.codigoProduto));
      if (p) total += p.preco * item.quantidade;
    });
    setValorTotal(total.toFixed(2));
  }, [itens, produtos]);

  const registrarCompra = async () => {
    if (!numero || !dataCompra || !cpfCliente || itens.some(i => !i.codigoProduto || i.quantidade <= 0)) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const payload = {
      numero: parseInt(numero),
      data_compra: dataCompra,
      valor_total: parseFloat(valorTotal),
      cpf_cliente: cpfCliente,
      codigo_cupom: codigoCupom ? parseInt(codigoCupom) : null,
      itens: itens.map(i => ({
        codigoProduto: parseInt(i.codigoProduto),
        quantidade: parseInt(i.quantidade)
      }))
    };

    try {
      await api.post("/compras", payload);
      alert("Compra registrada com sucesso!");
      setNumero("");
      setDataCompra("");
      setCpfCliente("");
      setCodigoCupom("");
      setItens([{ codigoProduto: "", quantidade: 1 }]);
    } catch (error) {
      console.error("Erro ao registrar compra:", error);
      alert("Erro ao registrar compra.");
    }
  };

  const updateItem = (index, field, value) => {
    const novos = [...itens];
    novos[index][field] = value;
    setItens(novos);
  };

  return (
    <div className="ml-64 p-6 bg-[#FAF9F6] min-h-screen font-serif max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registrar Compra</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm text-gray-700">Número *</label>
          <input type="number" value={numero} onChange={e => setNumero(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">Data da Compra *</label>
          <input type="date" value={dataCompra} onChange={e => setDataCompra(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">CPF do Cliente *</label>
          <select value={cpfCliente} onChange={e => setCpfCliente(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Selecione um CPF --</option>
            {clientes.map(cpf => (
              <option key={cpf} value={cpf}>{cpf}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">Cupom (opcional)</label>
          <select value={codigoCupom} onChange={e => setCodigoCupom(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Nenhum cupom --</option>
            {cupons.map(cupom => (
              <option key={cupom.codigo} value={cupom.codigo}>
                {cupom.codigo} – {cupom.descricao} (–R$ {cupom.valorDesconto.toFixed(2)})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Itens da Compra</h2>
        {itens.map((item, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
            <select value={item.codigoProduto} onChange={e => updateItem(idx, "codigoProduto", e.target.value)} className="border rounded p-2">
              <option value="">-- Produto --</option>
              {produtos.map(p => (
                <option key={p.codigo} value={p.codigo}>
                  {p.nome} (R$ {p.preco.toFixed(2)})
                </option>
              ))}
            </select>
            <input type="number" min="1" value={item.quantidade} onChange={e => updateItem(idx, "quantidade", parseInt(e.target.value))} className="border rounded p-2" />
            <div className="p-2 text-sm text-gray-600">
              {(() => {
                const prod = produtos.find(p => p.codigo === parseInt(item.codigoProduto));
                return prod ? `R$ ${(prod.preco * item.quantidade).toFixed(2)}` : "--";
              })()}
            </div>
          </div>
        ))}

        <button type="button" onClick={() => setItens([...itens, { codigoProduto: "", quantidade: 1 }])} className="mt-2 px-3 py-1 bg-blue-100 rounded text-sm">
          + Adicionar Produto
        </button>

        <p className="mt-4 font-bold text-lg">
          Total: R$ {valorTotal}
        </p>
      </div>

      <button onClick={registrarCompra} className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
        Registrar Compra
      </button>
    </div>
  );
}