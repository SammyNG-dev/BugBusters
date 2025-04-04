import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
// import { } from "../context/UserContext";

interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
}

interface UserFormData extends UserData {
  confirmPassword: string;
}

interface UserFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const UserForm: React.FC<UserFormProps> = ({ userData, setUserData }) => {
  // const { token } = useUser();
  const [formData, setFormData] = useState<UserFormData>({
    ...userData,
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Vérification du mot de passe
    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    const { password, confirmPassword, ...dataToSend } = formData;

    if (!formData.password) {
      (dataToSend as { password?: string }).password = undefined;
    }

    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Échec de la mise à jour");

      const updatedUser: UserData = await response.json();
      setUserData(updatedUser);
      setMessage("Mise à jour réussie !");
    } catch (error) {
      setMessage(`Erreur : ${(error as Error).message}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="user-form-title">
      <h2 id="user-form-title">Modifier votre profil</h2>

      <label htmlFor="name">Nom :</label>
      <input
        id="name"
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        aria-required="true"
      />

      <label htmlFor="firstName">Prénom :</label>
      <input
        id="firstName"
        type="text"
        name="lastName"
        value={formData.lastname}
        onChange={handleChange}
        aria-required="true"
      />

      <label htmlFor="email">Email :</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        aria-required="true"
      />

      <label htmlFor="password">Nouveau mot de passe :</label>
      <input
        id="password"
        type="password"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        aria-describedby="password-help"
      />
      <p id="password-help" className="visually-hidden">
        Laissez vide si vous ne souhaitez pas changer votre mot de passe.
      </p>

      <label htmlFor="confirm-password">Confirmez le mot de passe :</label>
      <input
        id="confirm-password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword || ""}
        onChange={handleChange}
        aria-describedby="confirm-password-help"
      />
      <p id="confirm-password-help" className="visually-hidden">
        Veuillez confirmer votre nouveau mot de passe.
      </p>

      <button
        className="button-modif"
        type="submit"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Enregistrement..." : "Mettre a jour"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UserForm;
