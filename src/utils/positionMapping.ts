"use client";

export const mapPlayerTypeToSpanish = (playerType: string): string => {
  switch (playerType) {
    case "Forward":
      return "DEL";
    case "Midfield":
      return "MED";
    case "Defender":
      return "DEF";
    case "Goalkeepers":
      return "ARQ";
    default:
      return "N/A";
  }
};
