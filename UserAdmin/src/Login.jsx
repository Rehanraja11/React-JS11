import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.jsx";
import Header from "./Header.jsx";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { email, setEmail, password, setPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    //  if (email === "rehann@gmail.com" && password === "11") {
    //   navigate("/dashboard");

    // } else {
    //   alert("Invalid Credentials");
    // }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    const admin = email === "rehann@gmail.com" && password === "11";

    if (validUser || admin) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        style={{
          padding: "20px",
          margin: "300px",
          width: "550px",
          borderRadius:"11px",
          marginLeft: "700px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
