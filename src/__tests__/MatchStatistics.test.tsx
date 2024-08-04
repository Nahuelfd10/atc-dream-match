import React from "react";
import { render, screen } from "@testing-library/react";
import MatchStatistics from "../components/MatchStatistics";

// Datos de prueba simulados
const mockStats = {
  team1: "Equipo A",
  team2: "Equipo B",
  score1: 3,
  score2: 1,
  statistics: {
    possession: [60, 40],
    totalShots: [15, 8],
    shotsOnTarget: [10, 3],
    tackles: [20, 18],
    fouls: [12, 15],
    bookings: [2, 3],
    corners: [5, 4],
    offsides: [2, 1],
  },
};

describe("Componente MatchStatistics", () => {
  it("renderiza las estadísticas correctamente", () => {
    render(<MatchStatistics stats={mockStats} />);

    // Verifica si los nombres de los equipos se renderizan
    expect(screen.getByText("Equipo A")).toBeInTheDocument();
    expect(screen.getByText("Equipo B")).toBeInTheDocument();

    // Verifica si los puntajes se renderizan correctamente
    expect(screen.getByText("3 - 1")).toBeInTheDocument();

    // Usa selectores de consulta para asegurar el contexto de cada número
    const totalShotsTeam1 = screen.getAllByText("15")[0]; // Primer "15" para Tiros Totales del Equipo 1
    expect(totalShotsTeam1).toBeInTheDocument();

    const totalShotsTeam2 = screen.getAllByText("8")[0]; // Tiros Totales del Equipo 2
    expect(totalShotsTeam2).toBeInTheDocument();

    const shotsOnTargetTeam1 = screen.getAllByText("10")[0]; // Tiros a Puerta del Equipo 1
    expect(shotsOnTargetTeam1).toBeInTheDocument();

    const shotsOnTargetTeam2 = screen.getAllByText("3")[0]; // Tiros a Puerta del Equipo 2
    expect(shotsOnTargetTeam2).toBeInTheDocument();

    const tacklesTeam1 = screen.getAllByText("20")[0]; // Entradas del Equipo 1
    expect(tacklesTeam1).toBeInTheDocument();

    const tacklesTeam2 = screen.getAllByText("18")[0]; // Entradas del Equipo 2
    expect(tacklesTeam2).toBeInTheDocument();

    const foulsTeam1 = screen.getAllByText("12")[0]; // Faltas del Equipo 1
    expect(foulsTeam1).toBeInTheDocument();

    const foulsTeam2 = screen.getAllByText("15")[1]; // Segundo "15" para Faltas del Equipo 2
    expect(foulsTeam2).toBeInTheDocument();

    const bookingsTeam1 = screen.getAllByText("2")[0]; // Primer "2" para Tarjetas del Equipo 1
    expect(bookingsTeam1).toBeInTheDocument();

    const bookingsTeam2 = screen.getAllByText("3")[1]; // Segundo "3" para Tarjetas del Equipo 2
    expect(bookingsTeam2).toBeInTheDocument();

    const cornersTeam1 = screen.getAllByText("5")[0]; // Córners del Equipo 1
    expect(cornersTeam1).toBeInTheDocument();

    const cornersTeam2 = screen.getAllByText("4")[0]; // Córners del Equipo 2
    expect(cornersTeam2).toBeInTheDocument();

    const offsidesTeam1 = screen.getAllByText("2")[1]; // Segundo "2" para Fuera de Juego del Equipo 1
    expect(offsidesTeam1).toBeInTheDocument();

    const offsidesTeam2 = screen.getAllByText("1")[0]; // Fuera de Juego del Equipo 2
    expect(offsidesTeam2).toBeInTheDocument();

    // Posesión
    expect(screen.getByText("60%")).toBeInTheDocument(); // Posesión del Equipo 1
    expect(screen.getByText("40%")).toBeInTheDocument(); // Posesión del Equipo 2
  });

  it("muestra el ganador correctamente", () => {
    render(<MatchStatistics stats={mockStats} />);

    // Verifica si la insignia del ganador se muestra correctamente
    expect(screen.getByText("🏆 Ganador")).toBeInTheDocument();
    expect(screen.getByText("Equipo A")).toBeInTheDocument();
  });

  it("no muestra un ganador cuando los puntajes son iguales", () => {
    const drawStats = {
      ...mockStats,
      score1: 2,
      score2: 2,
    };

    render(<MatchStatistics stats={drawStats} />);

    // Verifica si no se muestra la insignia del ganador
    expect(screen.queryByText("🏆 Ganador")).not.toBeInTheDocument();
  });
});
