import { animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import "./GameListingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useIsAuthenticatedContext } from "../contexts/IsAuthenticatedContext";

const API_URL = import.meta.env.VITE_API_URL;

interface GamelistingProps {
  id: number;
  title: string;
  img: string;
  gender: string;
  editor: string;
  descrip: string;
}

function Gamelisting() {
  const [gamesListing, setGamesListing] = useState<GamelistingProps[]>([]);
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);
  const { isAuthenticated, userId, isAdmin } = useIsAuthenticatedContext();

  useEffect(() => {
    // Récupérer les jeux vidéos
    fetch(`${API_URL}/api/videogames`)
      .then((resultAPI) => resultAPI.json())
      .then((gamejson) => {
        setGamesListing(gamejson);
      });
  }, []);

  const handleCardClick = (i: number) => {
    setIndex(i);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX.current - endX.current > 50) {
      // Glisser à gauche
      handleNext();
    }
    if (startX.current - endX.current < -50) {
      // Glisser à droite
      handlePrev();
    }
  };

  const handlePrev = () => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + gamesListing.length) % gamesListing.length,
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % gamesListing.length);
  };

  const navigate = useNavigate();

  return (
    <>
      <h1 id="title-list-game">Liste des jeux de la salle d'arcade</h1>
      <div
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel">
          {gamesListing.map((game, i) => {
            let className = "card";
            if (i === index) {
              className += " active";
            } else if (i === (index + 1) % gamesListing.length) {
              className += " right";
            } else if (
              i ===
              (index - 1 + gamesListing.length) % gamesListing.length
            ) {
              className += " left";
            } else if (i === (index + 2) % gamesListing.length) {
              className += " behind";
            } else {
              className += " hidden";
            }
            return (
              <animated.div
                key={game.id}
                className={className}
                onClick={() => handleCardClick(i)}
                onTouchStart={() => handleCardClick(i)}
              >
                <img
                  src={`${API_URL}/assets/images/${game.img}`}
                  alt={game.title}
                />
                <h2>{game.title}</h2>
                <p>Genre : {game.gender}</p>
                <p>Editeur : {game.editor}</p>
                <p>Description : {game.descrip}</p>
                {isAuthenticated ? (
                  <>
                    {isAdmin ? (
                      <button
                        type="button"
                        className="delete-game"
                        onClick={() => {
                          fetch(`${API_URL}/api/videogames/${game.id}`, {
                            credentials: "include",
                            method: "delete",
                          })
                            .then((res) => {
                              if (res.status === 200) {
                                setGamesListing(
                                  gamesListing.filter((gameItem) => {
                                    game.id !== gameItem.id;
                                  }),
                                );
                                navigate("/gamelisting");
                                return res.json();
                              }
                              return res.json();
                            })
                            .then((data) => {
                              if (data.message) {
                                alert(data.message);
                              }
                            });
                        }}
                      >
                        Supprimer
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="addition-game"
                      onClick={() => {
                        fetch(`${API_URL}/api/videogames/add-favs/`, {
                          credentials: "include",
                          method: "post",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ userId, gameId: game.id }),
                        })
                          .then((res) => {
                            if (res.status === 201) {
                              return res.json();
                            }
                            return res.json();
                          })
                          .then((data) => {
                            if (data.message) {
                              alert(data.message);
                            }
                          });
                      }}
                    >
                      Ajouter aux favoris
                    </button>
                  </>
                ) : null}
              </animated.div>
            );
          })}
        </div>
        {isAuthenticated ? (
          isAdmin ? (
            <Link className="addition-game" to="/ajouter_un_jeu">
              Ajouter Jeu
            </Link>
          ) : null
        ) : null}
      </div>
    </>
  );
}

export default Gamelisting;
