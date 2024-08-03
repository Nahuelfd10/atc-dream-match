"use client";

import React, { useState } from "react";
import MatchSetup from "@/components/MatchSetup";

export default function Home() {
  const [isMatchVisible, setIsMatchVisible] = useState(false);

  const handleCreateMatch = () => {
    setIsMatchVisible(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/footballMovie.mp4" type="video/mp4" />
        Tu navegador no soporta video en HTML5.
      </video>

      {/* Efecto bordes de la pantalla */}
      <div className="absolute top-0 left-0 w-full h-full z-5 pointer-events-none shadow-vignette"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center text-white p-6 bg-black bg-opacity-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">
          ¡Bienvenido al ATC Dream Match!
        </h1>
        <p className="mb-8 text-lg">
          ¿Alguna vez soñaste con ver un partido de fútbol en donde se enfrenten
          tus jugadores favoritos? Imaginate poder armar dos equipos de 5
          jugadores cada uno, en donde no tengas ninguna limitación... posición,
          presupuesto, contrato, club, edad... tu mente es tu límite.
        </p>
        {!isMatchVisible && (
          <button
            onClick={handleCreateMatch}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Crear el Partido de mis Sueños
          </button>
        )}
        {isMatchVisible && <MatchSetup />}
      </div>
    </div>
  );
}
