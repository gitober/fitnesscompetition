import { useNavigate } from "react-router-dom";

export const useSignup = ({ email, password }) => {
  const navigate = useNavigate();
  const apiUrl = "/api/users/signup";
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        password,
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle non-JSON responses
        const text = await response.text();
        console.error("Server error:", text);
        alert("Server error. Please check the console for details.");
        return;
      }

      const json = await response.json();
      console.log(response, newUser);

      if (response.ok) {
        console.log("User created successfully! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return { handleSignup };
};
