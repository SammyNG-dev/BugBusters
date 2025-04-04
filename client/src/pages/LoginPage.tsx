import LoginForm from "../components/LoginForm";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticatedContext } from "../contexts/IsAuthenticatedContext";

type LoginDatas = {
  email: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();

  const defaultLoginDatas: LoginDatas = {
    email: "",
    password: "",
  };

  const { setIsAuthenticated, setUserId, setIsAdmin } =
    useIsAuthenticatedContext();

  return (
    <div>
      <h1 id="title-login">Se connecter</h1>
      <LoginForm
        defaultValue={defaultLoginDatas}
        submitted={(userDatas) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
            method: "post",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userDatas),
          })
            .then((res) => {
              if (res.status === 200) {
                setIsAuthenticated(true);
                navigate("/");
                return res.json();
              }
              return res.json();
            })
            .then((data) => {
              setUserId(data.id);
              setIsAdmin(data.isAdmin);
              if (data.message) {
                alert(data.message);
              }
            });
        }}
      >
        Play
      </LoginForm>
    </div>
  );
}

export default LoginPage;
