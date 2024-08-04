"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MatchSetup from "@/components/MatchSetup";

export default function Home() {
  const [isMatchVisible, setIsMatchVisible] = useState(false);

  const showMatchSetup = () => {
    setIsMatchVisible(true);

    setTimeout(() => {
      const matchSection = document.getElementById("match-setup");
      if (matchSection) {
        matchSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      <div className="relative w-full h-screen flex-shrink-0">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/footballMovie.mp4" type="video/mp4" />
          Tu navegador no soporta video en HTML5.
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900 z-1"></div>

        {/* Título Principal */}
        <motion.h1
          className="relative z-10 text-6xl font-extrabold text-center text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            paddingTop: "15vh",
            lineHeight: "1.2",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          ¡Bienvenido al <span className="text-green-400">ATC Dream Match</span>
          !
        </motion.h1>

        {/* Contenido Principal */}
        <motion.div
          className="relative z-10 w-full flex flex-col items-center justify-center text-center text-white p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p
            className="mb-4 text-xl font-semibold tracking-wider"
            style={{
              paddingTop: "5vh",
              lineHeight: "1.2",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            ¿Has soñado con un partido de fútbol donde se enfrenten tus
            jugadores favoritos?
          </p>
          <p className="mb-8 text-xl font-bold uppercase tracking-wider">
            Crea dos equipos de 5 jugadores cada uno, en donde{" "}
            <span className="text-green-400 font-extrabold">
              tu mente será el límite
            </span>
            .
          </p>
        </motion.div>

        {/* Botón Principal */}
        <motion.div
          className="relative z-10 mt-10 flex justify-center"
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.button
            onClick={showMatchSetup}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg text-xl transform hover:scale-105 transition-transform"
          >
            Crear el partido de mis sueños
          </motion.button>
        </motion.div>
      </div>

      {/* Sección de Configuración del Partido */}
      {isMatchVisible && (
        <div
          id="match-setup"
          className="w-full flex-shrink-0 flex items-center justify-center min-h-screen bg-gray-900 pt-10"
        >
          <MatchSetup />
        </div>
      )}
    </div>
  );
}
