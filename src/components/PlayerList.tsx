"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchPlayers } from "@/utils/api";
import { debounce } from "lodash";
import Modal from "@/components/Modal";
import { recommendedPlayers } from "@/utils/recommendedPlayers";
import { mapPlayerTypeToSpanish } from "@/utils/positionMapping";

interface Player {
  player_id: string;
  player_name: string;
  team_name: string;
  player_image: string;
  player_age: number;
  player_type: string;
}

interface PlayerListProps {
  onAddPlayerToTeam: (playerName: string, teamId: number) => void;
  onRemovePlayerFromTeam: (playerName: string, teamId: number) => void;
  teams: { id: number; name: string; players: string[] }[];
}

const PlayerList: React.FC<PlayerListProps> = ({
  onAddPlayerToTeam,
  onRemovePlayerFromTeam,
  teams,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const playersPerPage = 10;

  useEffect(() => {
    if (searchQuery === "") {
      setDisplayedPlayers(recommendedPlayers);
      setCurrentPage(0);
    }
  }, [searchQuery]);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === "") {
        setDisplayedPlayers(recommendedPlayers);
        setCurrentPage(0);
      } else {
        setIsLoading(true);
        try {
          const results = await fetchPlayers(query);
          const mappedPlayers = results.map((player: any) => ({
            player_id: player.player_id,
            player_name: player.player_name,
            team_name: player.team_name,
            player_image:
              player.player_image || "https://via.placeholder.com/150",
            player_age: player.player_age,
            player_type: player.player_type,
          }));
          setDisplayedPlayers(mappedPlayers);
          setCurrentPage(0);
        } catch (error) {
          console.error("Error fetching players:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }, 500),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const getPlayerTeam = (playerName: string) => {
    for (const team of teams) {
      if (team.players.includes(playerName)) {
        return team;
      }
    }
    return null;
  };

  const paginatedPlayers = displayedPlayers.slice(
    currentPage * playersPerPage,
    currentPage * playersPerPage + playersPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * playersPerPage < displayedPlayers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddPlayer = (playerName: string, teamId: number) => {
    const teamIndex = teams.findIndex((team) => team.id === teamId);
    if (teamIndex === -1) return;

    if (teams[teamIndex].players.length >= 5) {
      setModalMessage(`El equipo ${teams[teamIndex].name} ya está completo.`);
      setIsModalOpen(true);
      return;
    }

    if (teams.some((team) => team.players.includes(playerName))) {
      setModalMessage(`Este jugador ya está en un equipo.`);
      setIsModalOpen(true);
      return;
    }

    onAddPlayerToTeam(playerName, teamId);
  };

  const areTeamsFull =
    teams.every((team) => team.players.length >= 5) &&
    displayedPlayers.every(
      (player) =>
        !teams.some((team) => team.players.includes(player.player_name))
    );

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-white">Lista de Jugadores</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar jugador..."
        className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Tabla de Jugadores */}
      <table className="table-auto w-full bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Equipo</th>
            <th className="px-4 py-2 text-left">Añadir a equipo</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-white">
                Buscando jugadores...
              </td>
            </tr>
          ) : paginatedPlayers.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-white">
                No hay resultados.
              </td>
            </tr>
          ) : (
            paginatedPlayers.map((player) => {
              const playerTeam = getPlayerTeam(player.player_name);
              return (
                <tr key={player.player_id} className="border-t border-gray-600">
                  <td className="px-4 py-2 text-gray-300 flex items-center">
                    <span className="inline-block w-12 h-6 bg-gray-700 text-white rounded-md text-center mr-2 flex items-center justify-center">
                      {mapPlayerTypeToSpanish(player.player_type)}
                    </span>
                    {player.player_name}
                  </td>
                  <td className="px-4 py-2 text-gray-300 text-left">
                    {player.team_name}
                  </td>
                  <td className="px-4 py-2 flex justify-start items-center">
                    {playerTeam ? (
                      <>
                        <span className="text-green-400">
                          Jugando en {playerTeam.name}
                        </span>
                        <button
                          onClick={() =>
                            onRemovePlayerFromTeam(
                              player.player_name,
                              playerTeam.id
                            )
                          }
                          className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          ✖
                        </button>
                      </>
                    ) : areTeamsFull ? (
                      <span className="text-red-400">Equipos completos</span>
                    ) : (
                      teams.map((team) => (
                        <button
                          key={team.id}
                          onClick={() =>
                            handleAddPlayer(player.player_name, team.id)
                          }
                          disabled={team.players.length >= 5}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 disabled:opacity-50"
                        >
                          {team.name}
                        </button>
                      ))
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Controles de paginación */}
      {!isLoading && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              (currentPage + 1) * playersPerPage >= displayedPlayers.length
            }
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default PlayerList;
