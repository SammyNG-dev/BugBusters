interface NewImageProps {
  children: React.ReactNode;
  submitted: (data: FormData) => void;
}

function AddImageForm({ children, submitted }: NewImageProps) {
  return (
    <form
      onSubmit={(event) => {
        const imageData = new FormData(event.currentTarget);
        submitted(imageData);
      }}
    >
      <label htmlFor="new-image">Modif Avatar</label>
      <input type="file" id="new-image" name="img_profile" />
      <button className="button-modif" type="submit">
        {children}
      </button>
    </form>
  );
}

export default AddImageForm;
