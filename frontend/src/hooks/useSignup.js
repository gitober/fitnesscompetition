import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // make necessary modification
  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();

    if (!response.ok) {
      setError(user.message);
      setIsLoading(false);
      return error;
    }

    sessionStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  return { signup, isLoading, error };
};