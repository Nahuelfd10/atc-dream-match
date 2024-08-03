"use client";

import React, { useEffect, useState } from "react";
import { fetchPlayers } from "../utils/api";

interface Player {
  player_id: string;
  player_name: string;
  team_name: string;
  player_image: string;
  player_age: number;
}

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const playerNames = ["Benzema", "Messi", "Ronaldo"];
        const playersData: Player[] = [];

        for (const name of playerNames) {
          const data = await fetchPlayers(name);
          if (data && data.length > 0) {
            playersData.push(data[0]);
          }
        }

        setPlayers(playersData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar jugadores");
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  if (loading) return <p className="text-white">Cargando jugadores...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-white">Lista de Jugadores</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {players.map((player) => (
          <li
            key={player.player_id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center"
          >
            <img
              src={player.player_image}
              alt={player.player_name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-semibold">{player.player_name}</p>
              <p className="text-sm text-gray-600">
                Equipo: {player.team_name}
              </p>
              <p className="text-sm text-gray-600">Edad: {player.player_age}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
