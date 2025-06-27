import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteGame from "../components/FavoriteGame";
import { useIsAuthenticatedContext } from "../contexts/IsAuthenticatedContext";
import "./FavoritesGamesPage.css";

const API_URL = import.meta.env.VITE_API_URL;

type FavoritesGames = {
  id: number;
  title: string;
  img: string;
  gender: string;
  editor: string;
  descrip: string;
};

function FavoritesGamesPage() {
  const [favoritesGames, setFavoritesGames] = useState<FavoritesGames[] | []>(
    [],
  );

  const { isAuthenticated } = useIsAuthenticatedContext();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/videogames/get-favs/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          alert(data.message);
          navigate("/");
        } else {
          setFavoritesGames(data);
        }
      })
      .catch((err) => console.log("Erreur :", err));
  }, [id, navigate]);

  return isAuthenticated ? (
    favoritesGames.length > 0 ? (
      favoritesGames.map((favoriteGame) => (
        <div className="game-card-container" key={favoriteGame.id}>
          <article className="game-card">
            <FavoriteGame game={favoriteGame} />
            <button
              className="pixel-nav"
              type="button"
              onClick={() =>
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/videogames/delete-fav/${favoriteGame.id}`,
                  {
                    credentials: "include",
                    method: "delete",
                  },
                )
                  .then((res) => {
                    if (res.status === 200) {
                      setFavoritesGames(
                        favoritesGames.filter(
                          (game) => favoriteGame.id !== game.id,
                        ),
                      );
                      return res.json();
                    }
                    return res.json();
                  })
                  .then((data) => {
                    if (data.message) {
                      alert(data.message);
                    }
                  })
              }
            >
              Retirer des favoris
            </button>
          </article>
        </div>
      ))
    ) : (
      <div className="no-content">
        <h1>Aucun jeu en favoris</h1>
      </div>
    )
  ) : (
    <div className="no-content">
      <h1>Comment ça se fait que soyez arrivé jusque là ?</h1>
    </div>
  );
}

export default FavoritesGamesPage;
