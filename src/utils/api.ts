// src/utils/api.ts
import axios from "axios";

const API_KEY =
  "b22a41d654d0a553627ac9427816fdea3b596ae50fef4e0294037d838c37cf6d";
const API_URL = "https://apiv3.apifootball.com/";

export const fetchPlayers = async (playerName?: string) => {
  try {
    const params: Record<string, string> = {
      action: "get_players",
      APIkey: API_KEY,
    };

    // Si se proporciona un nombre de jugador, añadirlo a los parámetros
    if (playerName) {
      params["player_name"] = playerName;
    }

    const response = await axios.get(API_URL, { params });
    console.log("Respuesta completa de la API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    throw error;
  }
};
