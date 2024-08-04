"use client";

import React, { useState } from "react";
import PlayerList from "@/components/PlayerList";
import { Player, recommendedPlayers } from "@/utils/recommendedPlayers";
import TeamList from "@/components/TeamList";

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
          height: "320px",
          width: "115%",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-between w-full px-12">
          {teams.map((team) => (
            <TeamList
              key={team.id}
              teamId={team.id}
              teamName={team.name}
              players={team.players}
              editing={editingTeamId === team.id}
              onTeamNameChange={handleTeamNameChange}
              onEditTeamName={handleEditTeamName}
              onBlurTeamName={handleTeamNameBlur}
              onRemovePlayer={removePlayerFromTeam}
            />
          ))}

          <span
            className="text-7xl font-bold text-white absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2"
            style={{
              lineHeight: "1.2",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
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
