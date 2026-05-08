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
  const [users, setUsers] = useState([]);
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
  const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(
      "http://192.168.0.113:8000/api/v1/users/all-users",
      { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("FULL API RESPONSE:", res.data);
    let usersData = [];

    if (Array.isArray(res.data)) {
      usersData = res.data;
    } else if (Array.isArray(res.data?.data)) {
      usersData = res.data.data;
    } else if (Array.isArray(res.data?.data?.users)) {
      usersData = res.data.data.users;
    } else if (Array.isArray(res.data?.users)) {
      usersData = res.data.users;
    }
    setUsers(usersData);
  } catch (err) {
    console.error(err.response?.data || err);
    setUsers([]);
  }
};
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect 
    fetchUsers();
  }, []);

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };
  const togglePassword = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { name: "", email: "", password: "", phone: "" };

    const isDuplicateEmail = users.some(
      (u) => u.email === form.email && u.id !== form.id,
    );

    const isDuplicatePhone = users.some(
      (u) => u.phone === form.phone && u.id !== form.id,
    );

    if (isDuplicateEmail) newErrors.email = "Email already exists";
    if (isDuplicatePhone) newErrors.phone = "Phone already exists";

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    const token = localStorage.getItem("token");
    try {
      if (form.id) {
        await axios.put(
          `http://192.168.0.113:8000/api/v1/user-update`,
          {
            id: form.id,
            name: form.name,
            email: form.email,
            phone: form.phone,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } else {
        await axios.post(
          "http://192.168.0.113:8000/api/v1/users/register",
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }
      await fetchUsers();
      setForm({
        id: null,
        name: "",
        email: "",
        password: "",
        phone: "",
      });
      document.getElementById("demo-dialog-form").close();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
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
    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      phone: user.phone,
    });
    document.getElementById("demo-dialog-form").showModal();
  };
  const confirmDeleteUser = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://192.168.0.113:8000/api/v1/users/delete/${deleteUser.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      await fetchUsers();
      setDeleteUser(null);

      document.getElementById("delete-dialog").close();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };
  const filteredUser = users.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(searchUser.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchUser.toLowerCase()),
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
      <dialog id="demo-dialog-form">
        <form onSubmit={handleSubmit}>
          <header>
            <h3>{form.id ? "Edit User" : "Add User"}</h3>
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
              className="outline"
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
            <th style={myStyle}>Id</th>
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
              <td>{user.id}</td>
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
              type="button"
              onClick={() =>
                document.getElementById("demo-dialog-form").close()
              }
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




