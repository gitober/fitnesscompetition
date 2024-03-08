import React from "react";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({ email: email.value, password: password.value });

    if (!error) {
      console.log("success");
      navigate("/");
    }
  };

  return (
    <>
      <form className="login" onSubmit={handleFormSubmit}>
        <h3>Login</h3>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Login;
