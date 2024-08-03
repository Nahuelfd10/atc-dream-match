"use client";

export interface Player {
  player_id: string;
  player_name: string;
  team_name: string;
  player_image: string;
  player_age: number;
  player_type: string;
}

export const recommendedPlayers: Player[] = [
  {
    player_id: "1",
    player_name: "Lionel Messi",
    team_name: "Paris Saint-Germain",
    player_image: "https://via.placeholder.com/150",
    player_age: 34,
    player_type: "Forward",
  },
  {
    player_id: "2",
    player_name: "Cristiano Ronaldo",
    team_name: "Al Nassr",
    player_image: "https://via.placeholder.com/150",
    player_age: 36,
    player_type: "Forward",
  },
  {
    player_id: "3",
    player_name: "Neymar Jr.",
    team_name: "Paris Saint-Germain",
    player_image: "https://via.placeholder.com/150",
    player_age: 29,
    player_type: "Forward",
  },
  {
    player_id: "4",
    player_name: "Kylian Mbappe",
    team_name: "Paris Saint-Germain",
    player_image: "https://via.placeholder.com/150",
    player_age: 22,
    player_type: "Forward",
  },
  {
    player_id: "5",
    player_name: "Robert Lewandowski",
    team_name: "FC Barcelona",
    player_image: "https://via.placeholder.com/150",
    player_age: 33,
    player_type: "Forward",
  },
  {
    player_id: "6",
    player_name: "Erling Haaland",
    team_name: "Manchester City",
    player_image: "https://via.placeholder.com/150",
    player_age: 21,
    player_type: "Forward",
  },
  {
    player_id: "7",
    player_name: "Luka Modric",
    team_name: "Real Madrid",
    player_image: "https://via.placeholder.com/150",
    player_age: 35,
    player_type: "Midfield",
  },
  {
    player_id: "8",
    player_name: "Kevin De Bruyne",
    team_name: "Manchester City",
    player_image: "https://via.placeholder.com/150",
    player_age: 30,
    player_type: "Midfield",
  },
  {
    player_id: "9",
    player_name: "Mohamed Salah",
    team_name: "Liverpool",
    player_image: "https://via.placeholder.com/150",
    player_age: 29,
    player_type: "Forward",
  },
  {
    player_id: "10",
    player_name: "Harry Kane",
    team_name: "Tottenham Hotspur",
    player_image: "https://via.placeholder.com/150",
    player_age: 28,
    player_type: "Forward",
  },
];
