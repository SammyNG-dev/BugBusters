import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useIsAuthenticatedContext } from "../contexts/IsAuthenticatedContext";
import DecoPacmanHeader from "./DecoPacmanHeader";
import "../components/DecoPacman.css";

function Header() {
  const { isAuthenticated, setIsAuthenticated, userId } =
    useIsAuthenticatedContext();
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <Link to={"/"}>
        <img
          id="img-logo"
          src="\assets\images\Wildy-gamy-logo.png"
          alt="Logo"
        />
      </Link>
      <nav className="header-navbar">
        <Link className="pixel-nav" to={"/gamelisting"}>
          Liste jeux
        </Link>
        <Link className="pixel-nav" to={"/classement"}>
          Classement
        </Link>
        {isAuthenticated && (
          <Link className="pixel-nav" to={`/favoris/${userId}`}>
            Mes favoris
          </Link>
        )}
      </nav>
      {/* Si un utilisateur est authentifié, afficher le lien vers le profil et celui de déconnexion. */}
      <section className="auth-section">
        {isAuthenticated ? (
          <>
            <Link className="auth-link" to={`/user/${userId}`}>
              Mon profil
            </Link>
            <button
              type="button"
              id="logout"
              onClick={() => {
                if (confirm("Confirmer la déconnexion ?"))
                  fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                    credentials: "include",
                  }).then((res) => {
                    if (res.status === 200) {
                      setIsAuthenticated(false);
                      navigate("/");
                    }
                  });
              }}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          // Si aucun utilisateur n'est authentifié, afficherle lien vers login et inscription
          <>
            <Link className="auth-link" to="/login">
              Se connecter
            </Link>
            <Link className="auth-link" to="/subscribe">
              S'inscrire
            </Link>
          </>
        )}
      </section>
      <DecoPacmanHeader />
    </div>
  );
}

export default Header;
