import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import { GiTeacher } from "react-icons/gi";



const Teacher = () => {
  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("teachers")) || [],
  );

  const [showPassword, setShowPassword] = useState({});
  const [deleteTeacher, setDeleteTeacher] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    qualifications: "",
    number: "",
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

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, number: value });
  };

  const validatePassword = (password) => {
    if (password.length < 8) return false;

    let hasUpper = false,
      hasLower = false,
      hasNumber = false,
      hasSpecial = false;

    for (let char of password) {
      if (char >= "A" && char <= "Z") hasUpper = true;
      else if (char >= "a" && char <= "z") hasLower = true;
      else if (char >= "0" && char <= "9") hasNumber = true;
      else hasSpecial = true;
    }

    return hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dialog = document.getElementById("teacher-dialog");

    const isDuplicate = teachers.some(
      (t) =>
        (t.email === form.email ||
          t.number === form.number ||
          t.name === form.name ||
          t.password === form.password) &&
        t.id !== form.id,
    );

    if (isDuplicate) {
      alert("Duplicate data found!");
      return;
    }

    if (!validatePassword(form.password)) {
      alert("Weak password!");
      return;
    }

    if (form.id) {
      setTeachers(teachers.map((s) => (s.id === form.id ? form : s)));
    } else {
      setTeachers([...teachers, { ...form, id: Date.now() }]);
    }

    setForm({
      id: null,
      name: "",
      email: "",
      password: "",
      qualifications: "",
      number: "",
    });
    dialog.close();
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

  return (
    <DefaultLayout>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => document.getElementById("teacher-dialog").showModal()}
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
            marginTop: "20px",
          }}
        >
          Add Teacher's <GiTeacher />

        </button>
      </div>

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
          <label>Qualifications</label>
          <input
            type="text"
            name="qualifications"
            placeholder="Qualifications"
            value={form.qualifications}
            onChange={handleChange}
            required
          />

          <label>Number</label>
          <input
            type="tel"
            name="Number"
            placeholder="Number."
            value={form.number}
            onChange={handleNumberChange}
            maxLength="10"
          />

          <button type="submit">{form.id ? "Update" : "Add"}</button>
          <button
            type="button"
            onClick={() => document.getElementById("teacher-dialog").close()}
          >
            Cancel
          </button>
        </form>
      </dialog>

      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Teacher List</h3>

      <table>
        <thead>
          <tr>
            <th style={myStyle}>Teacher.Name</th>
            <th style={myStyle}>Teacher.Email</th>
            <th style={myStyle}>Password</th>
            <th style={myStyle}>Qualifications</th>
            <th style={myStyle}>Number</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
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
                    marginLeft:"5px"
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
              <td>{t.qualifications}</td>
              <td>{t.number}</td>
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
