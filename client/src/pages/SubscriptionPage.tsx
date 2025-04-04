import { useNavigate } from "react-router-dom";
import SubscriptionForm from "../components/SubscriptionForm";

function SubscriptionPage() {
  const navigate = useNavigate();

  const newUser = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <SubscriptionForm
      defaultValue={newUser}
      submitted={(userData) =>
        fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => {
            if (res.status === 201) {
              return res.json();
            }
            return res.json;
          })
          .then((data) => {
            if (data.message) {
              alert(data.message);
              navigate("/");
            }
          })
      }
    >
      Soumettre
    </SubscriptionForm>
  );
}

export default SubscriptionPage;
