"use client";

export const mapPlayerTypeToSpanish = (playerType: string): string => {
  switch (playerType) {
    case "Forwards":
      return "DEL";
    case "Midfielders":
      return "MED";
    case "Defenders":
      return "DEF";
    case "Goalkeepers":
      return "ARQ";
    case "Coach":
      return "TEC";
    default:
      return "N/A";
  }
};
