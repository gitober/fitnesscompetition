import { useNavigate } from "react-router-dom";

export const useLogin = ({ email, password }) => {
  const navigate = useNavigate();
  const apiUrl = "/api/users/login";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("id", data.user._id);
        navigate("/");
      } else {
        const error = await response.json();
        console.log(error);
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleLogin, email, password };
};