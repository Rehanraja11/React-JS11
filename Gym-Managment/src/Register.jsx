import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.email === email)) {
      alert("User already exists!");
      return;
    }

    users.push({ email, password, name });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
    
      <div style={styles.left}>
        <h1 style={styles.brand}>NO LIMITS</h1>
        <p style={styles.tagline}>
          Push harder. Get stronger. Build your fitness identity today.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <form onSubmit={handleRegister} style={styles.form}>
          <h2 style={styles.title}>Register</h2>

          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Register
          </button>

          <p style={styles.footer}>
            Already a member?{" "}
            <span onClick={() => navigate("/login")} style={styles.link}>
              Log in
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

export default Register;
