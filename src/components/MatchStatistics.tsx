"use client";

import React from "react";

interface MatchStatisticsProps {
  stats: any;
}

const MatchStatistics: React.FC<MatchStatisticsProps> = ({ stats }) => {
  const { team1, team2, score1, score2, statistics } = stats;

  // Determinar el equipo ganador
  const winner = score1 > score2 ? team1 : score2 > score1 ? team2 : null;

  // Asegurar que la posesión sume 100%
  const possession1 = statistics.possession[0];
  const possession2 = 100 - possession1;

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
      <div className="relative mb-4 block md:hidden">
        {winner && (
          <div
            className={`text-green-400 font-bold text-lg mb-2 ${
              winner === team1 ? "text-left" : "text-right"
            }`}
          >
            Ganador 🏆
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold">{team1}</span>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold mx-2">
              {score1} - {score2}
            </span>
          </div>

          <div className="flex items-center justify-end">
            <span className="text-xl font-bold">{team2}</span>
          </div>
        </div>
      </div>

      <div className="relative hidden md:flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold">{team1}</span>
          {winner === team1 && (
            <span className="flex items-center text-green-400 font-bold ml-2">
              🏆 Ganador
            </span>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">
            {score1} - {score2}
          </span>
        </div>

        <div className="flex items-center justify-end">
          {winner === team2 && (
            <span className="flex items-center text-green-400 font-bold mr-2">
              🏆 Ganador
            </span>
          )}
          <span className="text-2xl font-bold">{team2}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4 text-center text-xs md:text-sm">
        <div className="text-lg md:text-2xl font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          {statistics.totalShots[0]}
        </div>
        <div className="font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          Tiros Totales
        </div>
        <div className="text-lg md:text-2xl font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          {statistics.totalShots[1]}
        </div>

        <div className="text-lg md:text-2xl font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          {statistics.shotsOnTarget[0]}
        </div>
        <div className="font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          Tiros a Puerta
        </div>
        <div className="text-lg md:text-2xl font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          {statistics.shotsOnTarget[1]}
        </div>

        <div className="text-lg md:text-2xl font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          {statistics.tackles[0]}
        </div>
        <div className="font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          Entradas
        </div>
        <div className="text-lg md:text-2xl font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          {statistics.tackles[1]}
        </div>

        <div className="text-lg md:text-2xl font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          {statistics.fouls[0]}
        </div>
        <div className="font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          Faltas
        </div>
        <div className="text-lg md:text-2xl font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          {statistics.fouls[1]}
        </div>

        <div className="text-lg md:text-2xl font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          {statistics.bookings[0]}
        </div>
        <div className="font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          Tarjetas
        </div>
        <div className="text-lg md:text-2xl font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          {statistics.bookings[1]}
        </div>

        <div className="text-lg md:text-2xl font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          {statistics.corners[0]}
        </div>
        <div className="font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          Córners
        </div>
        <div className="text-lg md:text-2xl font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          {statistics.corners[1]}
        </div>

        <div className="text-lg md:text-2xl font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          {statistics.offsides[0]}
        </div>
        <div className="font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          Fuera de Juego
        </div>
        <div className="text-lg md:text-2xl font-bold bg-gray-700 py-1 rounded flex items-center justify-center">
          {statistics.offsides[1]}
        </div>

        <div className="text-lg md:text-2xl font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          {possession1}%
        </div>
        <div className="font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          Posesión %
        </div>
        <div className="text-lg md:text-2xl font-bold bg-gray-600 py-1 rounded flex items-center justify-center">
          {possession2}%
        </div>
      </div>
    </div>
  );
};

export default MatchStatistics;
