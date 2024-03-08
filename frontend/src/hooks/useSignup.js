import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });

      const user = await response.json();

      if (!response.ok) {
        console.log(user.error);
        setError(user.error);
        setIsLoading(false);
        return error;
      }

      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);

      // Navigate to the login page upon successful signup
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
}
