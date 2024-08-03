"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MatchSetup from "@/components/MatchSetup";

export default function Home() {
  const [isMatchVisible, setIsMatchVisible] = useState(false);

  const handleCreateMatch = () => {
    setIsMatchVisible(true);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center ${
        isMatchVisible ? "bg-gray-800" : "bg-transparent"
      } overflow-hidden`}
    >
      {/* Video de fondo */}
      {!isMatchVisible && (
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/footballMovie.mp4" type="video/mp4" />
          Tu navegador no soporta video en HTML5.
        </video>
      )}

      {/* Efecto bordes de la pantalla */}
      {!isMatchVisible && (
        <div className="absolute top-0 left-0 w-full h-full z-5 pointer-events-none shadow-vignette"></div>
      )}

      {/* Titulo principal */}
      {!isMatchVisible && (
        <motion.h1
          className="relative z-10 text-4xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ¡Bienvenido al ATC Dream Match!
        </motion.h1>
      )}

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center text-white p-6 bg-black bg-opacity-50 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {!isMatchVisible && (
          <>
            <p className="mb-8 text-lg">
              ¿Alguna vez soñaste con ver un partido de fútbol en donde se
              enfrenten tus jugadores favoritos? Imaginate poder armar dos
              equipos de 5 jugadores cada uno, en donde no tengas ninguna
              limitación... posición, presupuesto, contrato, club, edad... tu
              mente es tu límite.
            </p>
            <motion.button
              onClick={handleCreateMatch}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Crear el Partido de mis Sueños
            </motion.button>
          </>
        )}
        {isMatchVisible && <MatchSetup />}
      </motion.div>
    </div>
  );
}
