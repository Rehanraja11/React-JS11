import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(); // Create Context

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const logout = () => {
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ email, setEmail, password, setPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
