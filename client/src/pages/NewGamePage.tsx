import { useNavigate } from "react-router-dom";
import NewGameForm from "../components/NewGameForm";
import { useIsAuthenticatedContext } from "../contexts/IsAuthenticatedContext";

function NewGamePage() {
  const { isAuthenticated } = useIsAuthenticatedContext();

  const navigate = useNavigate();
  const newGame = {
    title: "",
    gender: "",
    editor: "",
    descrip: "",
  };
  return isAuthenticated ? (
    <NewGameForm
      defaultValue={newGame}
      submitted={(gameDatas) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/videogames`, {
          method: "post",
          headers: {
            enctype: "multipart/form-data",
          },
          body: gameDatas,
        }).then((res) => {
          if (res.status === 201) {
            alert("Jeu ajouté avec succès !");
            navigate("/gamelisting");
          } else {
            alert("Echec lors de l'ajout du jeu.");
          }
        });
      }}
    >
      Ajouter jeu
    </NewGameForm>
  ) : (
    <div id="unauthorized">
      <img
        id="img-unauthorized"
        src="\public\assets\images\unauthorized.png"
        alt="unauthorized"
      />
      <p>Vous n'êtes pas autorisé à accéder à cette page !</p>
    </div>
  );
}

export default NewGamePage;
