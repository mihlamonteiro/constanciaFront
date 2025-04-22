import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Heart } from "lucide-react";

export default function VisualizarCompras() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    buscarCompras();
  }, []);

  async function buscarCompras() {
    try {
      const res = await api.get("/compras");
      setCompras(res.data);
    } catch (err) {
      console.error("Erro ao buscar compras:", err);
    }
  }

  const formatarData = (data) => {
    return data ? new Date(data).toLocaleDateString("pt-BR") : "--";
  };

  return (
    <div className="ml-64 p-6 bg-[#FAF9F6] min-h-screen font-serif">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Histórico de Compras</h1>

      <div className="grid gap-4 max-w-4xl">
        {compras.length === 0 ? (
          <p className="text-gray-600">Nenhuma compra registrada.</p>
        ) : (
          compras.map((c) => (
            <div
              key={c.numero}
              className="bg-white border border-gray-200 shadow-sm rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Compra #{c.numero}
                </h2>
                <span className="text-sm text-gray-500">{formatarData(c.data_compra)}</span>
              </div>

              <p className="text-sm text-gray-600 mt-1">Cliente: {c.cpf_cliente}</p>
              <p className="text-sm text-gray-600">
                Valor total: <strong>R$ {c.valor_total.toFixed(2)}</strong>
              </p>

              {c.codigo_cupom && (
                <p className="text-sm text-gray-500">Cupom aplicado: #{c.codigo_cupom}</p>
              )}

              {c.nota > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Heart
                        key={n}
                        size={18}
                        className={`${
                          n <= c.nota
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm mt-1 text-gray-600">
                    Avaliação: {c.avaliacao || "Sem comentário"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Avaliado em: {formatarData(c.data_avaliacao)}
                  </p>
                </div>
              )}

              {c.nota === 0 && (
                <p className="text-sm text-gray-400 italic mt-2">Ainda não avaliada</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
