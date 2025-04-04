type GameDatas = {
  title: string;
  gender: string;
  editor: string;
  descrip: string;
};

type NewGameFormProps = {
  defaultValue: GameDatas;
  children: React.ReactNode;
  submitted: (gameDatas: FormData) => void;
};

function NewGameForm({ defaultValue, children, submitted }: NewGameFormProps) {
  return (
    // Contrairement aux autres formulaires, celui-là inclus l'ajout d'une image.
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const gameFormDatas = new FormData(event.currentTarget);

        submitted(gameFormDatas);
      }}
    >
      <label htmlFor="game-title">Nom du jeu :</label>
      <input
        id="game-title"
        type="text"
        name="title"
        defaultValue={defaultValue.title}
        required
      />
      <label htmlFor="game-gender">Genre :</label>
      <input
        id="game-gender"
        type="text"
        name="gender"
        defaultValue={defaultValue.gender}
        required
      />
      <label htmlFor="game-editor">Editeur :</label>
      <input
        id="game-editor"
        type="text"
        name="editor"
        defaultValue={defaultValue.editor}
        required
      />
      <label htmlFor="game-description">Description :</label>
      <input
        id="game-description"
        type="text"
        name="descrip"
        defaultValue={defaultValue.descrip}
        required
      />
      <label htmlFor="game-image">Ajouter l'image :</label>
      <input id="game-image" type="file" name="img" required />
      <button type="submit" className="addition-game">
        {children}
      </button>
    </form>
  );
}

export default NewGameForm;
