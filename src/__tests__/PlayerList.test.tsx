import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlayerList from "../components/PlayerList";
import { Player, recommendedPlayers } from "@/utils/recommendedPlayers";
import { mapPlayerTypeToSpanish } from "@/utils/positionMapping";

const mockAddPlayer = jest.fn();
const mockRemovePlayer = jest.fn();

interface Team {
  id: number;
  name: string;
  players: Player[];
}

const mockTeams: Team[] = [
  { id: 1, name: "Equipo 1", players: [] },
  { id: 2, name: "Equipo 2", players: [] },
];

describe("PlayerList Component", () => {
  beforeEach(() => {
    render(
      <PlayerList
        teams={mockTeams}
        onAddPlayerToTeam={mockAddPlayer}
        onRemovePlayerFromTeam={mockRemovePlayer}
      />
    );
  });

  test("displays all recommended players initially", () => {
    recommendedPlayers.slice(0, 10).forEach((player) => {
      expect(screen.getByText(player.player_name)).toBeInTheDocument();
      const playerTypeSpanish = mapPlayerTypeToSpanish(player.player_type);
      expect(screen.getAllByText(playerTypeSpanish)[0]).toBeInTheDocument();
    });
  });

  test("pagination buttons should be enabled/disabled appropriately", () => {
    // Verificar que el botón "Anterior" está deshabilitado inicialmente
    expect(screen.getByText("Anterior")).toBeDisabled();

    // Verificar que el botón "Siguiente" está habilitado inicialmente
    expect(screen.getByText("Siguiente")).toBeEnabled();

    // Navegar a la siguiente página
    fireEvent.click(screen.getByText("Siguiente"));

    // Verificar que el botón "Anterior" está habilitado después de cambiar de página
    expect(screen.getByText("Anterior")).toBeEnabled();

    // Navegar de regreso a la página anterior
    fireEvent.click(screen.getByText("Anterior"));

    // Verificar que el botón "Anterior" está deshabilitado al regresar a la primera página
    expect(screen.getByText("Anterior")).toBeDisabled();
  });

  //TODO
  test("shows 'Equipos completos' when teams are full", () => {});
  test("shows no results message on invalid search", async () => {});
});
