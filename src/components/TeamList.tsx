"use client";

import React from "react";
import { Player } from "@/utils/recommendedPlayers";
import { mapPlayerTypeToSpanish } from "@/utils/positionMapping";

interface TeamListProps {
  teamId: number;
  teamName: string;
  players: Player[];
  editing: boolean;
  onTeamNameChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    teamId: number
  ) => void;
  onEditTeamName: (teamId: number) => void;
  onBlurTeamName: () => void;
  onRemovePlayer: (playerId: string, teamId: number) => void;
}

const TeamList: React.FC<TeamListProps> = ({
  teamId,
  teamName,
  players,
  editing,
  onTeamNameChange,
  onEditTeamName,
  onBlurTeamName,
  onRemovePlayer,
}) => {
  return (
    <div className="flex flex-col items-center bg-gray-700 bg-opacity-80 p-3 rounded-lg shadow-lg w-1/3 relative">
      {editing ? (
        <input
          type="text"
          value={teamName}
          onChange={(e) => onTeamNameChange(e, teamId)}
          onBlur={onBlurTeamName}
          className="text-lg font-bold text-white mb-1 bg-transparent border-b-2 border-white focus:outline-none"
          autoFocus
          maxLength={16} // Limita el nombre a 16 caracteres
        />
      ) : (
        <div
          className="flex items-center mb-1 group cursor-pointer"
          onClick={() => onEditTeamName(teamId)}
        >
          <h3 className="text-lg font-bold text-white mr-1">
            {teamName.length > 16
              ? teamName.substring(0, 16) + "..."
              : teamName}{" "}
            {/* Trunca el nombre si excede los 16 caracteres */}
          </h3>
          <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
            ✎
          </span>
        </div>
      )}

      <ul className="list-none text-white mb-2 w-full">
        {players.map((player, index) => (
          <li
            key={index}
            className="flex items-center justify-between mb-1 bg-gray-800 px-2 py-1 rounded-md hover:bg-gray-700 group"
          >
            <span className="inline-block w-10 h-5 bg-green-600 text-white rounded-md text-center mr-2 flex items-center justify-center text-sm">
              {mapPlayerTypeToSpanish(player.player_type)}
            </span>
            <span className="flex-1 text-xs">{player.player_name}</span>
            <button
              onClick={() => onRemovePlayer(player.player_id, teamId)}
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
      {players.length === 5 && (
        <span className="text-green-400 font-bold mt-1 text-sm">
          ¡Completo!
        </span>
      )}
    </div>
  );
};

export default TeamList;
