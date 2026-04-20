import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContextdata } from "./Context/AuthContextdata";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { email,setEmail,password,setPassword } = useContext(AuthContextdata)
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div style={styles.container}>
      
      <div style={styles.left}>
        <h1 style={styles.brand}>STAY STRONG</h1>
        <p style={styles.tagline}>
          Discipline beats motivation. Get back to your grind.
        </p>
      </div>
      <div style={styles.right}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Welcome Back</h2>
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Enter Gym
          </button>
          <p style={styles.footer}>
            New here?{" "}
            <span onClick={() => navigate("/register")} style={styles.link}>
              Create Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#000",
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #000000, #1c1c1c)",
    color: "#00ffcc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
  },

  brand: {
    fontSize: "52px",
    fontWeight: "bold",
    letterSpacing: "2px",
    color: "#00ffcc",
  },

  tagline: {
    fontSize: "16px",
    color: "#aaa",
    marginTop: "10px",
    maxWidth: "400px",
  },

  right: {
    flex: 1.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0a0a0a",
  },

  form: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  title: {
    color: "#fff",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  input: {
    padding: "14px",
    borderRadius: "6px",
    border: "1px solid #222",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
  },

  button: {
    padding: "14px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(135deg, #00ffcc, #00bfff)",
    color: "#000",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
  },

  footer: {
    color: "#777",
    fontSize: "13px",
  },

  link: {
    color: "#00ffcc",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;