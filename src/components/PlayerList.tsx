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

  if (loading) return <p>Cargando jugadores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Jugadores</h2>
      <ul className="list-disc list-inside">
        {players.map((player) => (
          <li key={player.player_id} className="mb-4">
            <img
              src={player.player_image}
              alt={player.player_name}
              width={50}
            />
            <p>Nombre: {player.player_name}</p>
            <p>Equipo: {player.team_name}</p>
            <p>Edad: {player.player_age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
