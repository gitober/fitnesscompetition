// imports
import { useSignup } from "../hooks/useSignup";
import { useField } from "../hooks/useField";

// Signup component
const Signup = () => {
  // variables
  const emailInput = useField("email");
  const email = emailInput.value;
  const passwordInput = useField("password");
  const password = passwordInput.value;
  const { handleSignup } = useSignup({
    email,
    password,
  });
  return (
    <form className="signup" onSubmit={handleSignup}>
      <h3>Sign Up</h3>
      <label>Email address:</label>
      <input {...emailInput} />
      <label>Password:</label>
      <input {...passwordInput} />
      <button>Sign up</button>
    </form>
  );
};

export default Signup;