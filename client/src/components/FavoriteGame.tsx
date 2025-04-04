const API_URL = import.meta.env.VITE_API_URL;

interface GameProps {
  game: {
    id: number;
    title: string;
    img: string;
    gender: string;
    editor: string;
    descrip: string;
  };
}

function FavoriteGame({ game }: GameProps) {
  return (
    <>
      <img
        className="favorite-game-img"
        src={`${API_URL}/assets/images/${game.img}`}
        alt={game.title}
      />
      <h2>{game.title}</h2>
      <p>{game.descrip}</p>
    </>
  );
}

export default FavoriteGame;
