import React from "react";

interface TeamCardProps {
  name: string;
  players: string[];
  onEdit: () => void;
  onDelete: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  players,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <ul className="mt-2">
        {players.map((player, index) => (
          <li key={index} className="text-gray-700">
            {player}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button className="text-blue-500" onClick={onEdit}>
          Editar
        </button>
        <button className="text-red-500" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
