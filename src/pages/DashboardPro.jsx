import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconShadow from "leaflet/dist/images/marker-shadow.png";

const COLORS = ["#2dd4bf", "#0ea5e9", "#facc15", "#fb7185", "#a78bfa"];

const clienteIcon = L.icon({
  iconUrl: "/icons/cliente.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
  shadowUrl: iconShadow,
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

const lojaIcon = L.icon({
  iconUrl: "/icons/loja.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const OPENCAGE_API_KEY = "b9ca2e2e830c4f27a75144c7b3b37235";

export default function DashboardPro() {
  const [resumo, setResumo] = useState({});
  const [pizzaData, setPizzaData] = useState([]);
  const [vendasMes, setVendasMes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [comparativo, setComparativo] = useState([]);
  const [ano1, setAno1] = useState(2023);
  const [ano2, setAno2] = useState(2024);
  const [mesComparado, setMesComparado] = useState("04");
  const lojaCoord = [-8.135926687318504, -34.90587539912689];

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    carregarComparativo();
  }, [ano1, ano2, mesComparado]);

  async function carregarDados() {
    try {
      const [totalClientesRes, indicacoesRes, clientesRes] = await Promise.all([
        api.get("/compras/dashboard/total-clientes"),
        api.get("/compras/dashboard/clientes-mais-indicaram"),
        api.get("/clientes")
      ]);

      setResumo({
        totalClientes: totalClientesRes.data.totalClientes,
        topIndicadores: indicacoesRes.data.length,
      });

      setClientes(clientesRes.data);

    } catch (err) {
      console.error("❌ Erro ao carregar dados principais:", err);
    }

    try {
      const vendasMesRes = await api.get("/compras/dashboard/vendas-mensais");
      const barras = Object.entries(vendasMesRes.data).map(([mes, total]) => ({ mes, total }));
      setVendasMes(barras);
    } catch (err) {
      console.warn("⚠️ Erro em vendas mensais:", err);
    }

    try {
      const categoriaRes = await api.get("/compras/dashboard/produtos-vendidos-por-categoria?ano=2024");
      const pizza = categoriaRes.data.map((cat, i) => ({
        name: cat.categoria || `Categoria ${i + 1}`,
        value: cat.total
      }));
      setPizzaData(pizza);
    } catch (err) {
      console.warn("⚠️ Erro em pizza de categorias:", err);
    }
  }

  async function carregarComparativo() {
    try {
      const mesLimite = mesComparado === "all" ? "12" : mesComparado;
      const resposta = await api.get("/compras/dashboard/comparativo-vendas", {
        params: { ano1, ano2, mes: mesLimite }
      });
      setComparativo(resposta.data);
    } catch (err) {
      console.warn("⚠️ Erro no gráfico comparativo:", err);
    }
  }

  return (
    <div className="p-6 font-serif bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Corporativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <CardResumo titulo="Total de Clientes" valor={resumo.totalClientes} cor="bg-green-100" />
        <CardResumo titulo="Top Indicadores" valor={resumo.topIndicadores} cor="bg-blue-100" />
        <CardResumo titulo="Satisfação" valor="4.7 / 5" cor="bg-yellow-100" />
        <CardResumo titulo="Ano" valor="2024" cor="bg-gray-100" />
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <select value={ano1} onChange={e => setAno1(Number(e.target.value))} className="border p-2 rounded">
            {[2022, 2023, 2024, 2025].map(ano => <option key={ano} value={ano}>{ano}</option>)}
          </select>
          <select value={ano2} onChange={e => setAno2(Number(e.target.value))} className="border p-2 rounded">
            {[2022, 2023, 2024, 2025].map(ano => <option key={ano} value={ano}>{ano}</option>)}
          </select>
          <select value={mesComparado} onChange={e => setMesComparado(e.target.value)} className="border p-2 rounded">
            <option value="all">Ano inteiro</option>
            {[
              { value: "01", label: "Janeiro" },
              { value: "02", label: "Fevereiro" },
              { value: "03", label: "Março" },
              { value: "04", label: "Abril" },
              { value: "05", label: "Maio" },
              { value: "06", label: "Junho" },
              { value: "07", label: "Julho" },
              { value: "08", label: "Agosto" },
              { value: "09", label: "Setembro" },
              { value: "10", label: "Outubro" },
              { value: "11", label: "Novembro" },
              { value: "12", label: "Dezembro" }
            ].map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Comparativo de Vendas – {mesComparado === "all" ? "Ano inteiro" : `Mês ${mesComparado}`} ({ano1} vs {ano2})
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={comparativo}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ano1" stroke="#fbbf24" name={`Ano ${ano1}`} />
            <Line type="monotone" dataKey="ano2" stroke="#3b82f6" name={`Ano ${ano2}`} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Produtos por Categoria</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pizzaData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                isAnimationActive={true}
              >
                {pizzaData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Vendas por Mês</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={vendasMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Localização da Loja e Clientes</h2>
        <MapContainer center={lojaCoord} zoom={13} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={lojaCoord} icon={lojaIcon}>
            <Popup>
              🏪 Loja Constância Aromas<br />
              R. Prof. Mário de Castro, 425 - Recife
            </Popup>
          </Marker>

          {clientes.map((cli, idx) => (
            <GeocodeMarker key={idx} cliente={cli} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

function CardResumo({ titulo, valor, cor }) {
  return (
    <div className={`rounded-lg shadow px-4 py-6 ${cor} text-center`}>
      <h3 className="text-sm text-gray-600 font-medium mb-1">{titulo}</h3>
      <p className="text-2xl font-bold text-gray-800">{valor ?? "--"}</p>
    </div>
  );
}

function GeocodeMarker({ cliente }) {
  const [pos, setPos] = useState(null);

  if (!cliente.rua || !cliente.numero || !cliente.bairro || !cliente.cidade || !cliente.cep) {
    return null;
  }

  useEffect(() => {
    const enderecoCompleto = `${cliente.rua}, ${cliente.numero}, ${cliente.bairro}, ${cliente.cidade}, ${cliente.cep}`;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(enderecoCompleto)}&key=${OPENCAGE_API_KEY}&limit=1`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results[0]) {
          const { lat, lng } = data.results[0].geometry;
          setPos([lat, lng]);
        }
      })
      .catch(err => console.warn("Erro ao geocodificar:", err));
  }, [cliente]);

  if (!pos) return null;

  return (
    <Marker position={pos} icon={clienteIcon}>
      <Popup>
        👤 {cliente.nome}<br />
        📍 {cliente.rua}, {cliente.numero}<br />
        {cliente.bairro}, {cliente.cidade} - {cliente.cep}
      </Popup>
    </Marker>
  );
}
