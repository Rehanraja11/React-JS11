import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.jsx";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const { email, setEmail, password, setPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(" ");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    const validUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    const validStudent = students.find(
      (u) => u.email === email && u.password === password,
    );
    const validTeachers = teachers.find(
      (u) => u.email === email && u.password === password,
    );

    const admin = email === "rehann@gmail.com" && password === "1111";

    if (validUser || admin || validStudent || validTeachers) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
      localStorage.setItem("isAuth", "true");
      navigate("/dashboard");
    } else {
      setErrors(
        { ...errors, email: "Invalid  credentials" }
      );
    }
  };
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <form
        onSubmit={handleLogin}
        style={{
          padding: "20px",
          margin: "200px",
          width: "550px",
          borderRadius: "11px",
          marginLeft: "630px",
          marginTop: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        {errors.email && <span style={{ color: "red", }}>{errors.email}</span>}
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        <br />
          <label>Password</label>
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

