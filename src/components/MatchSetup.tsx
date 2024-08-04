"use client";

import React, { useState } from "react";
import PlayerList from "@/components/PlayerList";
import { mapPlayerTypeToSpanish } from "@/utils/positionMapping";
import { recommendedPlayers, Player } from "@/utils/recommendedPlayers";

interface Team {
  id: number;
  name: string;
  players: Player[];
}

const MatchSetup: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Equipo 1", players: [] },
    { id: 2, name: "Equipo 2", players: [] },
  ]);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);

  const addPlayerToTeam = (player: Player, teamId: number) => {
    const teamIndex = teams.findIndex((team) => team.id === teamId);
    if (teamIndex === -1) return;

    if (teams[teamIndex].players.length >= 5) {
      alert("Un equipo no puede tener más de 5 jugadores.");
      return;
    }

    if (
      teams.some((team) =>
        team.players.some((p) => p.player_id === player.player_id)
      )
    ) {
      alert("Este jugador ya está en un equipo.");
      return;
    }

    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players.push(player);

    setTeams(updatedTeams);
  };

  const removePlayerFromTeam = (playerId: string, teamId: number) => {
    const teamIndex = teams.findIndex((team) => team.id === teamId);
    if (teamIndex === -1) return;

    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players = updatedTeams[teamIndex].players.filter(
      (player) => player.player_id !== playerId
    );

    setTeams(updatedTeams);
  };

  const handleTeamNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    teamId: number
  ) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        return { ...team, name: event.target.value };
      }
      return team;
    });

    setTeams(updatedTeams);
  };

  const handleEditTeamName = (teamId: number) => {
    setEditingTeamId(teamId);
  };

  const handleTeamNameBlur = () => {
    setEditingTeamId(null);
  };

  const generateRandomTeams = () => {
    const allPlayers = [...recommendedPlayers];

    for (let i = allPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPlayers[i], allPlayers[j]] = [allPlayers[j], allPlayers[i]];
    }

    const team1 = allPlayers.slice(0, 5);
    const team2 = allPlayers.slice(5, 10);

    setTeams([
      { id: 1, name: "Equipo 1", players: team1 },
      { id: 2, name: "Equipo 2", players: team2 },
    ]);
  };

  const resetTeams = () => {
    setTeams([
      { id: 1, name: "Equipo 1", players: [] },
      { id: 2, name: "Equipo 2", players: [] },
    ]);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-white">Dream Match</h2>

      <div
        className="flex justify-between items-center w-full mt-6 mb-4 relative bg-cover bg-center rounded-lg p-5"
        style={{
          backgroundImage: "url('/cancha3d.gif')",
          height: "240px",
          width: "100%",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-between w-full px-12">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex flex-col items-center bg-gray-700 bg-opacity-80 p-3 rounded-lg shadow-lg w-1/3 relative"
            >
              {editingTeamId === team.id ? (
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => handleTeamNameChange(e, team.id)}
                  onBlur={handleTeamNameBlur}
                  className="text-lg font-bold text-white mb-1 bg-transparent border-b-2 border-white focus:outline-none"
                  autoFocus
                />
              ) : (
                <h3
                  className="text-lg font-bold text-white mb-1 cursor-pointer"
                  onClick={() => handleEditTeamName(team.id)}
                >
                  {team.name}
                </h3>
              )}

              <ul className="list-none text-white mb-2 w-full">
                {team.players.map((player, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between mb-1 bg-gray-800 px-2 py-1 rounded-md hover:bg-gray-700 group"
                  >
                    <span className="inline-block w-10 h-5 bg-green-600 text-white rounded-md text-center mr-2 flex items-center justify-center text-sm">
                      {mapPlayerTypeToSpanish(player.player_type)}
                    </span>
                    <span className="flex-1 text-xs">{player.player_name}</span>
                    <button
                      onClick={() =>
                        removePlayerFromTeam(player.player_id, team.id)
                      }
                      className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
              {team.players.length === 5 && (
                <span className="text-green-400 font-bold mt-1 text-sm">
                  ¡Completo!
                </span>
              )}
            </div>
          ))}

          <span className="text-2xl font-bold text-white absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2">
            VS
          </span>
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-white">Lista de Jugadores</h2>
          <div className="flex space-x-2">
            <button
              onClick={generateRandomTeams}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              Añadir aleatoriamente
              <span className="ml-2">🔀</span>
            </button>
            <button
              onClick={resetTeams}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              Reiniciar Equipos
              <span className="ml-2">🔄</span>
            </button>
          </div>
        </div>
        <PlayerList
          teams={teams}
          onAddPlayerToTeam={(player: Player, teamId: number) => {
            addPlayerToTeam(player, teamId);
          }}
          onRemovePlayerFromTeam={removePlayerFromTeam}
        />
      </div>
    </div>
  );
};

export default MatchSetup;
