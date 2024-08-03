"use client";

import React, { useState } from "react";
import PlayerList from "@/components/PlayerList";
import TeamManagement from "@/components/TeamManagement";

export default function Home() {
  const [showPlayers, setShowPlayers] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        ¡Bienvenido al ATC Dream Match!
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowPlayers(!showPlayers)}
      >
        {showPlayers ? "Ocultar Jugadores" : "Mostrar Jugadores"}
      </button>
      {showPlayers && <PlayerList />}
      <TeamManagement />
    </div>
  );
}
