"use client";

import React, { useState } from "react";
import PlayerList from "@/components/PlayerList";

interface Team {
  id: number;
  name: string;
  players: string[];
}

const MatchSetup: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState<string>("");

  const createTeam = () => {
    if (teams.length >= 2) {
      alert("No puedes crear más de dos equipos.");
      return;
    }

    if (newTeamName.trim() === "") {
      alert("El nombre del equipo no puede estar vacío.");
      return;
    }

    const newTeam: Team = {
      id: Date.now(),
      name: newTeamName,
      players: [],
    };

    setTeams([...teams, newTeam]);
    setNewTeamName("");
  };

  const addPlayerToTeam = (playerName: string, teamId: number) => {
    const teamIndex = teams.findIndex((team) => team.id === teamId);
    if (teamIndex === -1) return;

    if (teams[teamIndex].players.length >= 5) {
      alert("Un equipo no puede tener más de 5 jugadores.");
      return;
    }

    if (teams.some((team) => team.players.includes(playerName))) {
      alert("Este jugador ya está en un equipo.");
      return;
    }

    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players.push(playerName);

    setTeams(updatedTeams);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-white">
        Crear el Partido de tus Sueños
      </h2>
      <div className="flex justify-center items-center space-x-6">
        {teams.length < 2 && (
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Nombre del equipo"
              className="border border-gray-300 rounded py-2 px-3 mb-2 w-64"
            />
            <button
              onClick={createTeam}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Crear Equipo
            </button>
          </div>
        )}

        <div className="flex flex-row items-center space-x-8">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex flex-col items-center bg-gray-700 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-white mb-2">{team.name}</h3>
              <ul className="list-disc text-white mb-2">
                {team.players.map((player, index) => (
                  <li key={index}>{player}</li>
                ))}
              </ul>
              {team.players.length === 5 && (
                <span className="text-green-400 font-bold mt-2">
                  ¡Completo!
                </span>
              )}
            </div>
          ))}

          {teams.length === 2 && (
            <span className="text-3xl font-bold text-white">VS</span>
          )}
        </div>
      </div>

      {teams.length === 2 && (
        <div className="w-full mt-6">
          <PlayerList teams={teams} onAddPlayerToTeam={addPlayerToTeam} />
        </div>
      )}
    </div>
  );
};

export default MatchSetup;
