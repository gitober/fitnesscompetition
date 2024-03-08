import { useLogin } from "../hooks/useLogin";
import { useField } from "../hooks/useField";

//Login component
const Login = () => {
  // variables
  const emailInput = useField("text");
  const passwordInput = useField("password");
  const email = emailInput.value;
  const password = passwordInput.value;
  const { handleLogin } = useLogin({ email, password });
  return (
    <form className="login" onSubmit={handleLogin}>
      <h3>Log In</h3>

      <label>email:</label>
      <input {...emailInput} />
      <label>Password:</label>
      <input {...passwordInput} />

      <button>Log in</button>
    </form>
  );
};

export default Login;