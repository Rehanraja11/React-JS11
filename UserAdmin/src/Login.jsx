import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

   const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        "http://192.168.0.113:8000/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        const token = data?.data?.user?.accessToken;

        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", JSON.stringify(data?.data?.user));
        localStorage.setItem("isAuth", "true");

        navigate("/dashboard"); 
      } else {
        setErrors({ email: data.message || "Invalid credentials" });
      }
    } catch (error) {
      console.log("Login error:", error);
      setErrors({ email: "Server error. Try again later." });
    }
  };
  
  // *********************
  //  const handleLogin = (e) => {
  //   e.preventDefault();

  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const students = JSON.parse(localStorage.getItem("students")) || [];
  //   const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  //   const validUser = users.find(
  //     (u) => u.email === email && u.password === password
  //   );
  //   const validStudent = students.find(
  //     (u) => u.email === email && u.password === password
  //   );
  //   const validTeacher = teachers.find(
  //     (u) => u.email === email && u.password === password
  //   );

  //   const admin = email === "rehann@gmail.com" && password === "1111";

  //   if (validUser || validStudent || validTeacher || admin) {
  //     localStorage.setItem(
  //       "loggedInUser",
  //       JSON.stringify(validUser || validStudent || validTeacher)
  //     );
  //     localStorage.setItem("isAuth", "true");
  //     navigate("/dashboard");
  //   } else {
  //     setErrors({ email: "Invalid credentials" });
  //   }
  // };
  // useEffect(() => {
  //   const isAuth = localStorage.getItem("isAuth");
  //   if (isAuth) navigate("/dashboard");
  // }, []);

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.box}>
        <h2 style={styles.title}>Login</h2>

        {errors.email && <p style={styles.error}>{errors.email}</p>}
        <label> Email</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <label> Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  box: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    width: "500px",
    border: "1px solid #ddd",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "550",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Login;
