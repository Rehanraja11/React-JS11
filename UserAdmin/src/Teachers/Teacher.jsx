import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import { GiTeacher } from "react-icons/gi";
import axios from "axios";
const Teacher = () => {
  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("teachers")) || [],
  );

  const [showPassword, setShowPassword] = useState({});
  const [deleteTeacher, setDeleteTeacher] = useState(null);
  const [searchTeacher, setSearchTeacher] = useState("");

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    qualification: "",
    phone: "",
  });

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  const togglePassword = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlephoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: value });
  };

  

 const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      "http://192.168.0.113:8000/api/v1/users/create-teacher",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response:", res.data);

  
    const newTeacher = {
      ...form,
      id: Date.now(), 
    };

    setTeachers((prev) => [...prev, newTeacher]);

   
    setForm({
      id: null,
      name: "",
      email: "",
      password: "",
      qualification: "",
      phone: "",
    });

    document.getElementById("teacher-dialog").close();

  } catch (err) {
    console.error("ERROR:", err.response?.data);
  }
};

  const handleEdit = (teacher) => {
    setForm(teacher);
    document.getElementById("teacher-dialog").showModal();
  };

  const handleDelete = (teacher) => {
    setDeleteTeacher(teacher);
    document.getElementById("delete-teacher-dialog").showModal();
  };

  const confirmDelete = () => {
    setTeachers(teachers.filter((s) => s.id !== deleteTeacher.id));
    setDeleteTeacher(null);
    document.getElementById("delete-teacher-dialog").close();
  };

  const filteredTeacher = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTeacher.toLowerCase()) ||
      t.email.includes(searchTeacher),
  );

  return (
    <DefaultLayout>
      <dialog id="teacher-dialog" style={{ padding: "20px" }}>
        <form
          style={{ padding: "20px", background: "#fff" }}
          onSubmit={handleSubmit}
        >
          <h3>{form.id ? "Edit Teacher" : "Add Teacher"}</h3>

          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>qualification</label>
          <input
            type="text"
            name="qualification"
            placeholder="qualification"
            value={form.qualification}
            onChange={handleChange}
            required
          />

          <label>phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="phone."
            value={form.phone}
            onChange={handlephoneChange}
            maxLength="10"
          />

          <button type="submit">{form.id ? "Update" : "Add"}</button>
          <button
            style={{ marginLeft: "292px" }}
            type="button"
            onClick={() => document.getElementById("teacher-dialog").close()}
          >
            Cancel
          </button>
        </form>
      </dialog>

      <div className="flex mt-15 mb-12 items-center justify-between mr-40">
        <h3>Teacher List</h3>
        <div>
          <input
            type="text"
            placeholder="🔍 Search Teacher"
            value={searchTeacher}
            onChange={(e) => setSearchTeacher(e.target.value)}
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
            onClick={() =>
              document.getElementById("teacher-dialog").showModal()
            }
            style={{
              background: "linear-gradient(135deg, #000000, #333333)",
              color: "#ffffff",
              padding: "13px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            Add Teachers
            <GiTeacher />
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style={myStyle}>Teacher Name</th>
            <th style={myStyle}>Teacher Email</th>
            <th style={myStyle}>Password</th>
            <th style={myStyle}>qualification</th>
            <th style={myStyle}>Phone</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeacher.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td style={{ display: "flex", alignItems: "center" }}>
                {showPassword[t.id] ? t.password : "••••••"}
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#333",
                    marginLeft: "5px",
                  }}
                  onClick={() => togglePassword(t.id)}
                >
                  {showPassword[t.id] ? <FaEyeSlash /> : <FaEye />}
                </span>
                <button
                  onClick={() => handleCopyPassword(t.password)}
                  style={{
                    background: "black",
                    padding: "5px 20px",
                    marginLeft: "10px",
                  }}
                >
                  <IoMdCopy />
                </button>
              </td>
              <td>{t.qualification}</td>
              <td>{t.phone}</td>
              <td>
                <button
                  onClick={() => handleEdit(t)}
                  style={{
                    background: "Green",
                    padding: "6px 18px",
                    fontSize: "18px",
                    marginRight: "10px",
                  }}
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => handleDelete(t)}
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
      <dialog id="delete-teacher-dialog" style={{ padding: "20px" }}>
        <h3 style={{ textAlign: "center" }}>Delete Teacher</h3>
        <p>
          Are you sure you want to delete{" "}
          <span style={{ fontWeight: "500", color: "red" }}>
            {deleteTeacher?.name}?
          </span>
        </p>
        <button onClick={confirmDelete} style={{ background: "red" }}>
          {" "}
          Delete
        </button>
        <button
          style={{ background: "gray", marginLeft: "10px" }}
          onClick={() =>
            document.getElementById("delete-teacher-dialog").close()
          }
        >
          Cancel
        </button>
      </dialog>
    </DefaultLayout>
  );
};
const myStyle = { color: "Gray", fontWeight: "550" };

export default Teacher;
