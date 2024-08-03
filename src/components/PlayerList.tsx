"use client";

import React from "react";

interface Player {
  player_id: string;
  player_name: string;
  team_name: string;
  player_image: string;
  player_age: number;
}

interface PlayerListProps {
  onAddPlayerToTeam: (playerName: string, teamId: number) => void;
  teams: { id: number; name: string; players: string[] }[];
}

const PlayerList: React.FC<PlayerListProps> = ({
  onAddPlayerToTeam,
  teams,
}) => {
  const famousPlayers: Player[] = [
    {
      player_id: "1",
      player_name: "Lionel Messi",
      team_name: "Paris Saint-Germain",
      player_image: "https://via.placeholder.com/150",
      player_age: 34,
    },
    {
      player_id: "2",
      player_name: "Cristiano Ronaldo",
      team_name: "Al Nassr",
      player_image: "https://via.placeholder.com/150",
      player_age: 36,
    },
    {
      player_id: "3",
      player_name: "Neymar Jr.",
      team_name: "Paris Saint-Germain",
      player_image: "https://via.placeholder.com/150",
      player_age: 29,
    },
    {
      player_id: "4",
      player_name: "Kylian Mbappe",
      team_name: "Paris Saint-Germain",
      player_image: "https://via.placeholder.com/150",
      player_age: 22,
    },
    {
      player_id: "5",
      player_name: "Robert Lewandowski",
      team_name: "FC Barcelona",
      player_image: "https://via.placeholder.com/150",
      player_age: 33,
    },
    {
      player_id: "6",
      player_name: "Erling Haaland",
      team_name: "Manchester City",
      player_image: "https://via.placeholder.com/150",
      player_age: 21,
    },
    {
      player_id: "7",
      player_name: "Luka Modric",
      team_name: "Real Madrid",
      player_image: "https://via.placeholder.com/150",
      player_age: 35,
    },
    {
      player_id: "8",
      player_name: "Kevin De Bruyne",
      team_name: "Manchester City",
      player_image: "https://via.placeholder.com/150",
      player_age: 30,
    },
    {
      player_id: "9",
      player_name: "Mohamed Salah",
      team_name: "Liverpool",
      player_image: "https://via.placeholder.com/150",
      player_age: 29,
    },
    {
      player_id: "10",
      player_name: "Harry Kane",
      team_name: "Tottenham Hotspur",
      player_image: "https://via.placeholder.com/150",
      player_age: 28,
    },
  ];

  const getPlayerTeam = (playerName: string) => {
    for (const team of teams) {
      if (team.players.includes(playerName)) {
        return team.name;
      }
    }
    return null;
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-white">Lista de Jugadores</h2>

      {/* Tabla de Jugadores */}
      <table className="table-auto w-full bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Equipo</th>
            <th className="px-4 py-2 text-left">Edad</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {famousPlayers.map((player) => {
            const playerTeam = getPlayerTeam(player.player_name);
            return (
              <tr key={player.player_id} className="border-t border-gray-600">
                <td className="px-4 py-2 text-gray-300">
                  {player.player_name}
                </td>
                <td className="px-4 py-2 text-gray-300">{player.team_name}</td>
                <td className="px-4 py-2 text-gray-300">{player.player_age}</td>
                <td className="px-4 py-2">
                  {playerTeam ? (
                    <span className="text-green-400">
                      Jugador de equipo {playerTeam}
                    </span>
                  ) : (
                    teams.map((team) => (
                      <button
                        key={team.id}
                        onClick={() =>
                          onAddPlayerToTeam(player.player_name, team.id)
                        }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Añadir a {team.name}
                      </button>
                    ))
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
