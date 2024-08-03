"use client";

import React, { useState } from "react";

interface Team {
  id: number;
  name: string;
  players: string[];
}

const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState<string>("");
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

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

  const deleteTeam = (id: number) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  const startEditing = (team: Team) => {
    setEditingTeam(team);
    setNewTeamName(team.name);
  };

  const saveEdit = () => {
    if (!editingTeam) return;

    if (newTeamName.trim() === "") {
      alert("El nombre del equipo no puede estar vacío.");
      return;
    }

    setTeams(
      teams.map((team) =>
        team.id === editingTeam.id ? { ...team, name: newTeamName } : team
      )
    );

    setEditingTeam(null);
    setNewTeamName("");
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Gestionar Equipos</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Nombre del equipo"
          className="border border-gray-300 rounded py-2 px-3 mr-2"
        />
        <button
          onClick={editingTeam ? saveEdit : createTeam}
          className={`${
            editingTeam
              ? "bg-yellow-500 hover:bg-yellow-700"
              : "bg-green-500 hover:bg-green-700"
          } text-white font-bold py-2 px-4 rounded`}
        >
          {editingTeam ? "Guardar" : "Crear Equipo"}
        </button>
        {editingTeam && (
          <button
            onClick={() => setEditingTeam(null)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cancelar
          </button>
        )}
      </div>
      <ul>
        {teams.map((team) => (
          <li key={team.id} className="flex justify-between items-center mb-2">
            <span>{team.name}</span>
            <div>
              <button
                onClick={() => startEditing(team)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => deleteTeam(team.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManagement;
