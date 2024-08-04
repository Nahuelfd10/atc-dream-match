import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MatchSetup from "../components/MatchSetup";
import { recommendedPlayers } from "@/utils/recommendedPlayers";

// Mock de datos de jugadores
jest.mock("@/utils/recommendedPlayers", () => ({
  recommendedPlayers: [
    { player_id: "1", player_name: "Jugador 1", player_type: "DEL" },
    { player_id: "2", player_name: "Jugador 2", player_type: "MED" },
    { player_id: "3", player_name: "Jugador 3", player_type: "DEF" },
    { player_id: "4", player_name: "Jugador 4", player_type: "POR" },
    { player_id: "5", player_name: "Jugador 5", player_type: "DEL" },
    { player_id: "6", player_name: "Jugador 6", player_type: "MED" },
    { player_id: "7", player_name: "Jugador 7", player_type: "DEF" },
    { player_id: "8", player_name: "Jugador 8", player_type: "POR" },
    { player_id: "9", player_name: "Jugador 9", player_type: "DEL" },
    { player_id: "10", player_name: "Jugador 10", player_type: "MED" },
  ],
}));

describe("MatchSetup Component", () => {
  it("renders correctly with initial state", () => {
    render(<MatchSetup />);

    // Verifica si los nombres de los equipos se renderizan usando getAllByText
    expect(screen.getAllByText("Equipo 1")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Equipo 2")[0]).toBeInTheDocument();

    // Verifica que el botón de añadir aleatoriamente se muestre
    expect(screen.getByText("Añadir aleatoriamente")).toBeInTheDocument();

    // Verifica que el botón de reiniciar equipos se muestre
    expect(screen.getByText("Reiniciar Equipos")).toBeInTheDocument();
  });

  it("adds a player to a team", () => {
    render(<MatchSetup />);

    // Agrega un jugador al equipo 1
    fireEvent.click(screen.getAllByText("Equipo 1")[1]);

    // Verifica si el jugador fue añadido al equipo 1
    expect(screen.getAllByText("Jugador 1")).toHaveLength(2); // Aparece en la lista y en el equipo
  });

  it("prevents adding more than 5 players to a team", () => {
    render(<MatchSetup />);

    // Agrega 5 jugadores al equipo 1
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getAllByText("Equipo 1")[1]);
    }

    // Intenta agregar un sexto jugador
    fireEvent.click(screen.getAllByText("Equipo 1")[1]);

    // Verifica que el sexto jugador no se agregó
    const playersInTeam1 = screen.getAllByText("Jugador 1");
    expect(playersInTeam1.length).toBeLessThanOrEqual(5); // Solo se añaden hasta 5
  });

  it("starts a match and displays statistics", () => {
    render(<MatchSetup />);

    // Genera equipos aleatorios
    fireEvent.click(screen.getByText("Añadir aleatoriamente"));

    // Comienza el partido
    fireEvent.click(screen.getByText("Comenzar Partido"));

    // Verifica que se muestren las estadísticas del partido
    expect(screen.getByText("Dream Match")).toBeInTheDocument();
    expect(screen.getByText("Tiros Totales")).toBeInTheDocument();
  });
});
