import type { FC } from "react";
import "./RankingPage.css";

interface Player {
  id: number;
  name: string;
  score: number;
}

const classPlayers: Player[] = [
  { id: 1, name: "Matthieu", score: 1500 },
  { id: 2, name: "François-Athanase", score: 1400 },
  { id: 3, name: "Charles-Henri", score: 1300 },
  { id: 4, name: "Jean-Jacques", score: 1200 },
  { id: 5, name: "Marco", score: 1100 },
];

const RankingPage: FC = () => {
  return (
    <div>
      <h1 id="title-rank">Classement des meilleurs joueurs</h1>
      <ul id="ranking">
        {classPlayers.map((player, index) => (
          <li className="rank" key={player.id}>
            <strong>{index + 1}</strong> <span>{player.name}</span>
            <span>{player.score} points</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingPage;
