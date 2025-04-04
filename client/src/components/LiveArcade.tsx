import { useEffect, useState } from "react";
import PacmanGame from "./Pacmangame";
const API_URL = import.meta.env.VITE_API_URL;

interface ListArcadeProps {
  id: number;
  title: string;
  img: string;
}

function LiveArcade() {
  const [games, setGames] = useState<ListArcadeProps[]>([]);

  //effectuer une requête à l'API
  useEffect(() => {
    fetch(`${API_URL}/api/videogames`)
      .then((resultAPI) => {
        return resultAPI.json();
      })
      .then((gamejson) => {
        setGames(gamejson);
      });
  }, []);

  return (
    // Affichage des jeux en top
    <div>
      <h1 id="top">Top 5 des jeux de nos arcadeurs</h1>
      {games.length > 0 && (
        <ul id="list">
          {games.slice(0, 5).map((game: ListArcadeProps) => (
            <li key={game.id}>
              <img
                src={`${API_URL}/assets/images/${game.img}`}
                alt={game.title}
                width={140}
              />
            </li>
          ))}
        </ul>
      )}
      {/* Affichage de la borne d'arcade */}
      <div className="arcade-machine">
        <div>
          <div className="top" />
        </div>
        <div className="screen-container">
          <div className="screen">
            <PacmanGame />
          </div>
          <div className="joystick">
            <div className="stick" />
          </div>
          <div className="board">
            <div className="button button-a" />
            <div className="button button-b" />
            <div className="button button-c" />
            <div className="button button-e" />
            <div className="button button-f" />
            <div className="button button-g" />
          </div>
          <div className="bottom" />
        </div>
      </div>
    </div>
  );
}
export default LiveArcade;
