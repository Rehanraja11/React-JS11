import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Dashboard = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );

  const [showPassword, setShowPassword] = useState({});
  const [deleteUser, setDeleteUser] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const handleCopyPassword = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy password.");
      });
  };

  const togglePassword = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter((u) => u.id !== deleteUser.id));
    setDeleteUser(null);

    const dialog = document.getElementById("delete-dialog");
    dialog.close();
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dialog = document.getElementById("demo-dialog-form");

    const isDuplicateNumber = users.some(
      (u) => u.number === form.number && u.id !== form.id,
    );

    const isDuplicateEmail = users.some(
      (u) => u.email === form.email && u.id !== form.id,
    );

    const isDuplicatePass = users.some(
      (u) => u.password === form.password && u.id !== form.id,
    );

    const isDuplicateName = users.some(
      (u) => u.name === form.name && u.id !== form.id,
    );

    const validatePassword = (password) => {
      if (password.length < 8) return false;

      let hasUpper = false;
      let hasLower = false;
      let hasNumber = false;
      let hasSpecial = false;

      for (let i = 0; i < password.length; i++) {
        let char = password[i];
        if (char >= "A" && char <= "Z") hasUpper = true;
        else if (char >= "a" && char <= "z") hasLower = true;
        else if (char >= "0" && char <= "9") hasNumber = true;
        else hasSpecial = true;
      }

      return hasUpper && hasLower && hasNumber && hasSpecial;
    };

    if (isDuplicateEmail) {
      alert("Email already exists!");
      return;
    }

    if (isDuplicateNumber) {
      alert("Number already exists!");
      return;
    }

    if (isDuplicatePass) {
      alert("Password already exists!");
      return;
    }

    if (isDuplicateName) {
      alert("Name already exists!");
      return;
    }

    if (form.number.length !== 10) {
      alert("Number must be exactly 10 digits!");
      return;
    }

    if (!validatePassword(form.password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!",
      );
      return;
    }

    if (form.id) {
      setUsers(users.map((u) => (u.id === form.id ? form : u)));
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setForm({
      id: null,
      name: "",
      email: "",
      password: "",
      number: "",
    });
    dialog.close();
  };
  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, number: value });
  };

  const handleDelete = (user) => {
    setDeleteUser(user);
    const dialog = document.getElementById("delete-dialog");
    dialog.showModal();
  };
  const handleEdit = (user) => {
    setForm(user);

    const dialog = document.getElementById("demo-dialog-form");
    dialog.showModal();
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <button
          commandfor="demo-dialog-form"
          command="show-modal"
          style={{
            background: "linear-gradient(135deg, #000000, #333333)",
            color: "#ffffff",
            padding: "12px 28px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          Add Users
        </button>
      </div>
      <dialog id="demo-dialog-form" onSubmit={handleSubmit}>
        <form method="dialog">
          <header>
            <h3>Add</h3>
          </header>
          <div>
            <label>
              Name{" "}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email{" "}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password{" "}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Number
              <input
                type="tel"
                name="number"
                placeholder="Number"
                value={form.number}
                onChange={handleNumberChange}
                maxLength="10"
                required
              />
            </label>
          </div>
          <footer>
            <button
              type="button"
              commandfor="demo-dialog-form"
              command="close"
              class="outline"
            >
              Cancel
            </button>

            <button value="save" type="submit">
              {form.id ? "Update User" : "Add User"}
            </button>
          </footer>
        </form>
      </dialog>

      <h3 style={{ textAlign: "center" }}>User List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Number</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {showPassword[user.id] ? user.password : "••••••••"}

                <span
                  onClick={() => togglePassword(user.id)}
                  style={{
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#333",
                  }}
                >
                  {showPassword[user.id] ? <FaEyeSlash /> : <FaEye />}
                </span>

                <button
                  onClick={() => handleCopyPassword(user.password)}
                  style={{
                    padding: "4px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    background: "black",
                  }}
                >
                  Copy
                </button>
              </td>
              <td>{user.number}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  style={{
                    background: "Green",
                    padding: "8px 18px",
                    fontSize: "18px",
                  }}
                >
                  Edit
                </button>{" "}
                <button
                  onClick={() => handleDelete(user)}
                  style={{
                    background: "brown",
                    padding: "8px 18px",
                    fontSize: "18px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog id="delete-dialog">
        <div style={{ padding: "20px", minWidth: "300px" }}>
          <h3>Delete User</h3>
          <p>
            Are you sure you want to delete <b>{deleteUser?.name}</b>?
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => {
                document.getElementById("delete-dialog").close();
                setDeleteUser(null);
              }}
              className="outline"
            >
              Cancel
            </button>

            <button
              onClick={confirmDeleteUser}
              style={{
                background: "red",
                color: "white",
                padding: "8px 16px",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default Dashboard;
