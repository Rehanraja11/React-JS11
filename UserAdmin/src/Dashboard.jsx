import React, { useState, useEffect } from "react";
import "./App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "./layout/DefaultLayout";
import { MdDashboard } from "react-icons/md";

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

  const [errors, setErrors] = useState({
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

    let newErrors = {
      name: "",
      email: "",
      password: "",
      number: "",
    };

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

      for (let char of password) {
        if (char >= "A" && char <= "Z") hasUpper = true;
        else if (char >= "a" && char <= "z") hasLower = true;
        else if (char >= "0" && char <= "9") hasNumber = true;
        else hasSpecial = true;
      }

      return hasUpper && hasLower && hasNumber && hasSpecial;
    };

    
    if (isDuplicateName) {
      newErrors.name = "Name already exists";
    }

    if (isDuplicateEmail) {
      newErrors.email = "Email already exists";
    }

    if (isDuplicateNumber) {
      newErrors.number = "Number already exists";
    }

    if (form.number.length !== 10) {
      newErrors.number = "Number must be 10 digits";
    }

    if (isDuplicatePass) {
      newErrors.password = "Password already exists";
    }

    if (!validatePassword(form.password)) {
      newErrors.password =
        "Min 8 chars with uppercase, lowercase, number & special char";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) {
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

    setErrors({
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
    <DefaultLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <dialog id="demo-dialog-form" onSubmit={handleSubmit}>
        <form method="dialog">
          <header>
            <h3>Add</h3>
          </header>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <input
              type="tel"
              name="number"
              placeholder="Number"
              value={form.number}
              onChange={handleNumberChange}
              maxLength="10"
              required
            />
            {errors.number && <p className="error">{errors.number}</p>}
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
      <div className="flex mt-15 mb-12">
        <h3 style={{ fontWeight: "600" }} className="mr-310">
          {" "}
          User List
        </h3>
        <button
          commandfor="demo-dialog-form"
          command="show-modal"
          style={{
            background: "linear-gradient(135deg, #000000, #333333)",
            color: "#ffffff",
            padding: "12px 22px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          Add Users <MdDashboard />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th style={myStyle}>Name</th>
            <th style={myStyle}>Email</th>
            <th style={myStyle}>Password</th>
            <th style={myStyle}>Number</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>
        <tbody style={{}}>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td style={{ display: "flex", alignItems: "center" }}>
                {showPassword[user.id] ? user.password : "••••••••"}
                <span
                  onClick={() => togglePassword(user.id)}
                  style={{
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#333",
                    marginLeft: "5px",
                  }}
                >
                  {showPassword[user.id] ? <FaEyeSlash /> : <FaEye />}
                </span>
                <button
                  onClick={() => handleCopyPassword(user.password)}
                  style={{
                    background: "black",
                    padding: "5px 20px",
                    marginLeft: "10px",
                  }}
                >
                  <IoMdCopy />
                </button>
              </td>
              <td>{user.number}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  style={{
                    background: "Green",
                    padding: "6px 18px",
                    fontSize: "18px",
                  }}
                >
                  <FaRegEdit />
                </button>{" "}
                <button
                  onClick={() => handleDelete(user)}
                  style={{
                    background: "brown",
                    padding: "6px 18px",
                    fontSize: "18px",
                  }}
                >
                  <MdDelete />
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

            <button onClick={confirmDeleteUser}>Delete</button>
          </div>
        </div>
      </dialog>
    </DefaultLayout>
  );
};
const myStyle = { color: "Gray", fontWeight: "550" };
export default Dashboard;
