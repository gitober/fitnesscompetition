import React from "react";
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const email = useField("email");
  const password = useField("password");
  const navigate = useNavigate(); // Import and use useNavigate hook

  const { signup, isLoading, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({ email: email.value, password: password.value });

    if (!error) {
      console.log("success");
      navigate("/login");
    }
  };

  return (
    <>
      <form className="signup" onSubmit={handleFormSubmit}>
        <h3>Sign Up</h3>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Sign up</button>
      </form>
    </>
  );
};

export default Signup;
