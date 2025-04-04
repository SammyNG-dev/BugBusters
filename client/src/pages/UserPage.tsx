import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import "../pages/userPage.css";
import { useNavigate, useParams } from "react-router-dom";
import AddImageForm from "../components/AddImageForm";
const API_URL = import.meta.env.VITE_API_URL;

interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  img_profile?: string;
  infos?: string;
}

const UserPage = () => {
  // const { token } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  // Récupération des données de l'utilisateurs grâce à son ID qui est récupéré soit lors du login, soit lors du chargement de l'application

  useEffect(() => {
    fetch(`${API_URL}/api/users/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setUserData(data);
      })
      .catch(() => {
        throw new Error("Une erreur est survenue");
      });
  }, [id]);

  const handleSubmit = async (updatedUserData: UserData) => {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUserData),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        data.message || "Erreur lors de la soumission des données",
      );
    }
    setUserData(updatedUserData);
    setIsEditing(false);
  };

  // Affichage des données récupérées
  return (
    <div>
      {userData &&
        (isEditing ? (
          <UserForm userData={userData} setUserData={handleSubmit} />
        ) : (
          <div id="UserPage">
            <h2 id="profil-title">Profil de l'utilisateur</h2>
            <div id="user-card">
              <article id="ul-card">
                <ul>
                  <li>Nom : {userData.lastname}</li>
                  <li>Prénom : {userData.firstname}</li>
                  <li>Email : {userData.email}</li>
                  {userData.infos && (
                    <li className="info-user">Infos : {userData.infos}</li>
                  )}
                </ul>
              </article>
              <div className="img-user">
                {userData.img_profile ? (
                  <figcaption>
                    <img
                      id="img-avatar"
                      src={`${API_URL}/assets/images/${userData.img_profile}`}
                      alt="Avatar"
                    />
                  </figcaption>
                ) : (
                  <figcaption>
                    <img
                      id="img-avatar"
                      src="\assets\images\avatar.png"
                      alt="Avatar"
                    />
                  </figcaption>
                )}
                {userData.img_profile ? null : (
                  <AddImageForm
                    submitted={(image) => {
                      fetch(`${API_URL}/api/users/${id}`, {
                        method: "put",
                        credentials: "include",
                        headers: {
                          enctype: "multipart/form-data",
                        },
                        body: image,
                      }).then((res) => {
                        if (res.status === 200) {
                          alert("Image ajoutée");
                          navigate("/user");
                        }
                      });
                    }}
                  >
                    Modif
                  </AddImageForm>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserPage;
