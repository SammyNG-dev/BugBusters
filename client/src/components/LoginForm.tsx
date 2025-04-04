type LoginDatas = {
  email: string;
  password: string;
};

interface LoginFormProps {
  children: React.ReactNode;
  defaultValue: LoginDatas;
  submitted: (login: LoginDatas) => void;
}

function LoginForm({ children, defaultValue, submitted }: LoginFormProps) {
  return (
    <>
      <form
        id="login-form"
        onSubmit={(event) => {
          event.preventDefault();

          const loginDatas = new FormData(event.currentTarget);
          const email = loginDatas.get("email") as string;
          const password = loginDatas.get("password") as string;

          submitted({
            email,
            password,
          });
        }}
      >
        <label htmlFor="username">Email</label>
        <input
          type="email"
          className="login-field"
          name="email"
          defaultValue={defaultValue.email}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          className="login-field"
          name="password"
          defaultValue={defaultValue.password}
        />
        <button className="pixel" type="submit">
          {children}
        </button>
      </form>
    </>
  );
}

export default LoginForm;
