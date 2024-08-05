"use client";

import React, { useState, useCallback, useEffect } from "react";
import { fetchPlayers } from "@/utils/api";
import { debounce } from "lodash";
import Modal from "@/components/Modal";
import { recommendedPlayers, Player } from "@/utils/recommendedPlayers";
import { mapPlayerTypeToSpanish } from "@/utils/positionMapping";

interface PlayerListProps {
  onAddPlayerToTeam: (player: Player, teamId: number) => void;
  onRemovePlayerFromTeam: (playerId: string, teamId: number) => void;
  teams: { id: number; name: string; players: Player[] }[];
}

const PlayerList: React.FC<PlayerListProps> = ({
  onAddPlayerToTeam,
  onRemovePlayerFromTeam,
  teams,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayedPlayers, setDisplayedPlayers] =
    useState<Player[]>(recommendedPlayers);
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

          if (mappedPlayers.length > 0) {
            setDisplayedPlayers(mappedPlayers);
          } else {
            setDisplayedPlayers([]);
          }

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

  const clearSearch = () => {
    setSearchQuery("");
    setDisplayedPlayers(recommendedPlayers);
    setCurrentPage(0);
  };

  const getPlayerTeam = (playerId: string) => {
    for (const team of teams) {
      if (team.players.some((player) => player.player_id === playerId)) {
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

  const isNextPageAvailable =
    (currentPage + 1) * playersPerPage < displayedPlayers.length;
  const isPrevPageAvailable = currentPage > 0;

  const handleAddPlayer = (player: Player, teamId: number) => {
    const teamIndex = teams.findIndex((team) => team.id === teamId);
    if (teamIndex === -1) return;

    if (teams[teamIndex].players.length >= 5) {
      setModalMessage(`El equipo ${teams[teamIndex].name} ya está completo.`);
      setIsModalOpen(true);
      return;
    }

    if (
      teams.some((team) =>
        team.players.some((p) => p.player_id === player.player_id)
      )
    ) {
      setModalMessage(`Este jugador ya está en un equipo.`);
      setIsModalOpen(true);
      return;
    }

    onAddPlayerToTeam(player, teamId);
  };

  const areTeamsFull = teams.every((team) => team.players.length >= 5);

  return (
    <div className="w-full max-w-4xl pb-20">
      <h2 className="text-2xl font-bold mb-4 text-white">Lista de Jugadores</h2>

      {/* Barra de búsqueda */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar jugador..."
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-2 text-white bg-gray-700 rounded-full p-2 hover:bg-gray-600 focus:outline-none"
            title="Clear search"
            style={{ lineHeight: "0.75rem" }}
          >
            &times;
          </button>
        )}
      </div>

      <table className="table-auto w-full bg-gray-800 rounded-lg shadow-md overflow-hidden block md:hidden">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2 text-left">Jugador</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={2} className="text-center py-4 text-white">
                Buscando jugadores...
              </td>
            </tr>
          ) : searchQuery && paginatedPlayers.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center py-4 text-white">
                No hay resultados.
              </td>
            </tr>
          ) : (
            paginatedPlayers.map((player) => {
              const playerTeam = getPlayerTeam(player.player_id);
              const isPlayerOnTeam = playerTeam !== null;

              return (
                <tr key={player.player_id} className="border-t border-gray-600">
                  <td className="px-4 py-2 text-gray-300 flex flex-col items-center">
                    <div className="flex justify-between w-full">
                      <span className="inline-block w-12 h-6 bg-green-600 text-white rounded-md text-center mr-2 flex items-center justify-center">
                        {mapPlayerTypeToSpanish(player.player_type)}
                      </span>
                      <span className="flex-1 text-left">
                        {player.player_name}
                      </span>
                      <span className="text-gray-400">{player.team_name}</span>
                    </div>
                    <div className="flex justify-center w-full mt-2">
                      {isPlayerOnTeam ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 text-center">
                            Jugando en {playerTeam!.name}
                          </span>
                          <button
                            onClick={() =>
                              onRemovePlayerFromTeam(
                                player.player_id,
                                playerTeam!.id
                              )
                            }
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-1.5 rounded-sm text-xs"
                          >
                            ✖
                          </button>
                        </div>
                      ) : areTeamsFull ? (
                        <span className="text-red-400 text-center">
                          Equipos completos
                        </span>
                      ) : (
                        <div className="flex space-x-2">
                          {teams.map((team) => (
                            <button
                              key={team.id}
                              onClick={() => handleAddPlayer(player, team.id)}
                              disabled={team.players.length >= 5}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded text-xs disabled:opacity-50"
                            >
                              {team.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <table className="table-auto w-full bg-gray-800 rounded-lg shadow-md overflow-hidden hidden md:table">
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
          ) : searchQuery && paginatedPlayers.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-white">
                No hay resultados.
              </td>
            </tr>
          ) : (
            paginatedPlayers.map((player) => {
              const playerTeam = getPlayerTeam(player.player_id);
              const isPlayerOnTeam = playerTeam !== null;

              return (
                <tr key={player.player_id} className="border-t border-gray-600">
                  <td className="px-4 py-2 text-gray-300 flex items-center">
                    <span className="inline-block w-12 h-6 bg-green-600 text-white rounded-md text-center mr-2 flex items-center justify-center">
                      {mapPlayerTypeToSpanish(player.player_type)}
                    </span>
                    {player.player_name}
                  </td>
                  <td className="px-4 py-2 text-gray-300 text-left">
                    {player.team_name}
                  </td>
                  <td className="px-4 py-2 flex justify-start items-center">
                    {isPlayerOnTeam ? (
                      <>
                        <span className="text-green-400">
                          Jugando en {playerTeam!.name}
                        </span>
                        <button
                          onClick={() =>
                            onRemovePlayerFromTeam(
                              player.player_id,
                              playerTeam!.id
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
                          onClick={() => handleAddPlayer(player, team.id)}
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
            disabled={!isPrevPageAvailable}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={!isNextPageAvailable}
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
