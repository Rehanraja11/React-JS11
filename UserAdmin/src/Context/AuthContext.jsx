import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export  const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate("/", { replace: true });
  };
  return (
    <AuthContext.Provider
      value={{ email, setEmail, password, setPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


