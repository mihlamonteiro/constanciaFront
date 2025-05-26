import React from "react";
import "./Home.css";
import flor from '../src/flor.png'; // coloque a imagem em src/assets

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* 🌸 Logo Flor */}
      <img src={flor} alt="Flor Constância" className="w-50 h-32 mb-4" />

      {/* Título com estilo brilhante */}
      <span className="shiny">
        <h1 className="bemvindo">Bem-vindo à Constância Aromas Decor</h1>
      </span>
    </div>
  );
}
