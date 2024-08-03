"use client";

import React, { useState } from "react";
import PlayerList from "@/components/PlayerList";

interface Team {
  id: number;
  name: string;
  players: string[];
}

const MatchSetup: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Equipo 1", players: [] },
    { id: 2, name: "Equipo 2", players: [] },
  ]);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);

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

  const removePlayerFromTeam = (playerName: string, teamId: number) => {
    const teamIndex = teams.findIndex((team) => team.id === teamId);
    if (teamIndex === -1) return;

    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players = updatedTeams[teamIndex].players.filter(
      (player) => player !== playerName
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
    const allPlayers = [
      "Lionel Messi",
      "Cristiano Ronaldo",
      "Neymar Jr.",
      "Kylian Mbappe",
      "Robert Lewandowski",
      "Erling Haaland",
      "Luka Modric",
      "Kevin De Bruyne",
      "Mohamed Salah",
      "Harry Kane",
    ];

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

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-white">Dream Match</h2>

      <div
        className="flex justify-between items-center w-full mt-6 mb-4 relative bg-cover bg-center rounded-lg p-8"
        style={{
          backgroundImage: "url('/cancha3d.gif')",
          height: "300px",
        }}
      >
        <div className="flex space-x-8 w-full">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex flex-col items-center bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg w-1/2 relative"
            >
              {editingTeamId === team.id ? (
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => handleTeamNameChange(e, team.id)}
                  onBlur={handleTeamNameBlur}
                  className="text-xl font-bold text-white mb-2 bg-transparent border-b-2 border-white focus:outline-none"
                  autoFocus
                />
              ) : (
                <h3
                  className="text-xl font-bold text-white mb-2 cursor-pointer"
                  onClick={() => handleEditTeamName(team.id)}
                >
                  {team.name}
                </h3>
              )}

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

          <span className="text-3xl font-bold text-white absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2">
            VS
          </span>
        </div>
      </div>

      <div className="w-full mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Lista de Jugadores</h2>
          <button
            onClick={generateRandomTeams}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Añadir aleatoriamente
            <span className="ml-2">🔀</span>
          </button>
        </div>
        <PlayerList
          teams={teams}
          onAddPlayerToTeam={addPlayerToTeam}
          onRemovePlayerFromTeam={removePlayerFromTeam}
        />
      </div>
    </div>
  );
};

export default MatchSetup;
