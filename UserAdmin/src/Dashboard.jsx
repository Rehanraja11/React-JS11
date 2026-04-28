import React, { useState, useEffect } from "react";
import "./App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "./layout/DefaultLayout";
import { MdDashboard } from "react-icons/md";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );
  const [showPassword, setShowPassword] = useState({});
  const [deleteUser, setDeleteUser] = useState(null);
  const [searchUser, setSearchUser] = useState("");

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.post(
        "http://192.168.0.113:8000/api/v1/users/register",
        form,
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }

    const dialog = document.getElementById("demo-dialog-form");

    let newErrors = {
      name: "",
      email: "",
      password: "",
      phone: "",
    };

    const isDuplicatephone = users.some(
      (u) => u.phone === form.phone && u.id !== form.id,
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
      let hasphone = false;
      let hasSpecial = false;

      for (let char of password) {
        if (char >= "A" && char <= "Z") hasUpper = true;
        else if (char >= "a" && char <= "z") hasLower = true;
        else if (char >= "0" && char <= "9") hasphone = true;
        else hasSpecial = true;
      }

      return hasUpper && hasLower && hasphone && hasSpecial;
    };

    if (isDuplicateName) {
      newErrors.name = "Name already exists";
    }

    if (isDuplicateEmail) {
      newErrors.email = "Email already exists";
    }

    if (isDuplicatephone) {
      newErrors.phone = "phone already exists";
    }

    if (form.phone.length !== 10) {
      newErrors.phone = "phone must be 10 digits";
    }

    if (isDuplicatePass) {
      newErrors.password = "Password already exists";
    }

    if (!validatePassword(form.password)) {
      newErrors.password =
        "Min 8 chars with uppercase, lowercase, phone & special char";
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
      phone: "",
    });

    setErrors({
      name: "",
      email: "",
      password: "",
      phone: "",
    });

    dialog.close();
  };
  const handlephoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: value });
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

  const filteredUser = users.filter(
    (t) =>
      t.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      t.email.includes(searchUser),
  );
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
              name="phone"
              placeholder="phone"
              value={form.phone}
              onChange={handlephoneChange}
              maxLength="10"
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
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

      <div className="flex mt-15 mb-12 items-center justify-between mr-40">
        <h3>User List</h3>
        <div>
          <input
            type="text"
            placeholder="🔍 Search User"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            style={{
              padding: "8px",
              width: "250px",
              borderRadius: "9px",
              border: "1px solid #120325",
              fontSize: "1.1rem",
              lineHeight: "1.9rem",
              outline: "none",
              marginRight: "19px",
            }}
          />
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
      </div>
      <table>
        <thead>
          <tr>
            <th style={myStyle}>Name</th>
            <th style={myStyle}>Email</th>
            <th style={myStyle}>Password</th>
            <th style={myStyle}>phone</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>
        <tbody style={{}}>
          {filteredUser.map((user) => (
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
              <td>{user.phone}</td>
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
