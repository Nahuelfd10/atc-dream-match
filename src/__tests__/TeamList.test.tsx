import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TeamList from "../components/TeamList";
import { Player } from "@/utils/recommendedPlayers";
import { mapPlayerTypeToSpanish } from "@/utils/positionMapping";

// Mock players
// Mock players con campos completos
const mockPlayers: Player[] = [
  {
    player_id: "1",
    player_name: "Lionel Messi",
    player_type: "DEL",
    team_name: "PSG",
    player_image: "messi.png",
    player_age: 34,
  },
  {
    player_id: "2",
    player_name: "Cristiano Ronaldo",
    player_type: "DEL",
    team_name: "Manchester United",
    player_image: "ronaldo.png",
    player_age: 36,
  },
  {
    player_id: "3",
    player_name: "Neymar Jr.",
    player_type: "DEL",
    team_name: "PSG",
    player_image: "neymar.png",
    player_age: 29,
  },
  {
    player_id: "4",
    player_name: "Kylian Mbappe",
    player_type: "DEL",
    team_name: "PSG",
    player_image: "mbappe.png",
    player_age: 22,
  },
  {
    player_id: "5",
    player_name: "Robert Lewandowski",
    player_type: "DEL",
    team_name: "Bayern Munich",
    player_image: "lewandowski.png",
    player_age: 33,
  },
];

const mockOnTeamNameChange = jest.fn();
const mockOnEditTeamName = jest.fn();
const mockOnBlurTeamName = jest.fn();
const mockOnRemovePlayer = jest.fn();

describe("TeamList Component", () => {
  it("allows editing of team name", () => {
    render(
      <TeamList
        teamId={1}
        teamName="Equipo de Ensueño"
        players={mockPlayers}
        editing={true}
        onTeamNameChange={mockOnTeamNameChange}
        onEditTeamName={mockOnEditTeamName}
        onBlurTeamName={mockOnBlurTeamName}
        onRemovePlayer={mockOnRemovePlayer}
      />
    );

    // Verifica que el input de edición esté presente
    const input = screen.getByDisplayValue("Equipo de Ensueño");
    expect(input).toBeInTheDocument();

    // Simula el cambio de nombre del equipo
    fireEvent.change(input, { target: { value: "Nuevo Nombre" } });
    expect(mockOnTeamNameChange).toHaveBeenCalledWith(expect.anything(), 1);
  });

  it("triggers team name edit on click", () => {
    render(
      <TeamList
        teamId={1}
        teamName="Equipo de Ensueño"
        players={mockPlayers}
        editing={false}
        onTeamNameChange={mockOnTeamNameChange}
        onEditTeamName={mockOnEditTeamName}
        onBlurTeamName={mockOnBlurTeamName}
        onRemovePlayer={mockOnRemovePlayer}
      />
    );

    // Simula el click para editar el nombre del equipo
    fireEvent.click(screen.getByText("✎"));
    expect(mockOnEditTeamName).toHaveBeenCalledWith(1);
  });

  it("shows '¡Completo!' message when team is full", () => {
    render(
      <TeamList
        teamId={1}
        teamName="Equipo Completo"
        players={mockPlayers}
        editing={false}
        onTeamNameChange={mockOnTeamNameChange}
        onEditTeamName={mockOnEditTeamName}
        onBlurTeamName={mockOnBlurTeamName}
        onRemovePlayer={mockOnRemovePlayer}
      />
    );

    // Verifica que el mensaje "¡Completo!" se muestre cuando el equipo está lleno
    expect(screen.getByText("¡Completo!")).toBeInTheDocument();
  });

  it("removes a player from the team", () => {
    render(
      <TeamList
        teamId={1}
        teamName="Equipo Completo"
        players={mockPlayers}
        editing={false}
        onTeamNameChange={mockOnTeamNameChange}
        onEditTeamName={mockOnEditTeamName}
        onBlurTeamName={mockOnBlurTeamName}
        onRemovePlayer={mockOnRemovePlayer}
      />
    );

    // Simula la eliminación de un jugador
    const removeButton = screen.getAllByText("✖")[0];
    fireEvent.click(removeButton);
    expect(mockOnRemovePlayer).toHaveBeenCalledWith(
      mockPlayers[0].player_id,
      1
    );
  });
});
