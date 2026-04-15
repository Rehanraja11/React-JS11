import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import { PiStudentFill } from "react-icons/pi";
import { FaUsersViewfinder } from "react-icons/fa6";

const Student = () => {
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || [],
  );

  const [showPassword, setShowPassword] = useState({});
  const [deleteStudent, setDeleteStudent] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    number: "",
    std: "",
    dob: "",
    address: "",
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);
  const togglePassword = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [viewStudent, setViewStudent] = useState(null);

  const handleView = (student) => {
    setViewStudent(student);
    document.getElementById("view-student-dialog").showModal();
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
    const dialog = document.getElementById("student-dialog");
    const isDuplicate = students.some(
      (s) =>
        (s.email === form.email ||
          s.number === form.number ||
          s.name === form.name ||
          s.password === form.password) &&
        s.id !== form.id,
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
      setStudents(students.map((s) => (s.id === form.id ? form : s)));
    } else {
      setStudents([...students, { ...form, id: Date.now() }]);
    }
    setForm({
      id: null,
      name: "",
      email: "",
      password: "",
      number: "",
      std: "",
      dob: "",
      address: "",
      city: "",
    });
    dialog.close();
  };

  const handleEdit = (student) => {
    setForm(student);
    document.getElementById("student-dialog").showModal();
  };

  const handleDelete = (student) => {
    setDeleteStudent(student);
    document.getElementById("delete-student-dialog").showModal();
  };
  const confirmDelete = () => {
    setStudents(students.filter((s) => s.id !== deleteStudent.id));
    setDeleteStudent(null);
    document.getElementById("delete-student-dialog").close();
  };
  return (
    <DefaultLayout>
      <dialog id="student-dialog" style={{ padding: "20px" }}>
        <form
          style={{ padding: "20px", background: "#fff" }}
          onSubmit={handleSubmit}
        >
          <h3>{form.id ? "Edit Student" : "Add Student"}</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="Number"
            placeholder="Number."
            value={form.number}
            onChange={handleNumberChange}
            maxLength="10"
          />
          <input
            type="text"
            name="std"
            placeholder="Std."
            value={form.std}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="DOB."
            value={form.dob}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <button type="submit">{form.id ? "Update" : "Add"}</button>
          <button
            style={{ marginLeft: "271px" }}
            type="button"
            onClick={() => document.getElementById("student-dialog").close()}
          >
            Cancel
          </button>
        </form>
      </dialog>
      <div className="flex mt-15 mb-12">
        <h3 style={{ fontWeight: "600" }} className="mr-310">
          {" "}
          Student List
        </h3>
        <button
          onClick={() => document.getElementById("student-dialog").showModal()}
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
          Add Student <PiStudentFill />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th style={myStyle}>Student.Name</th>
            <th style={myStyle}>Student.Email</th>
            <th style={myStyle}>Password</th>
            <th style={myStyle}>Details</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td style={{ display: "flex", alignItems: "center" }}>
                {showPassword[s.id] ? s.password : "••••••"}
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#333",
                    marginLeft: "5px",
                  }}
                  onClick={() => togglePassword(s.id)}
                >
                  {showPassword[s.id] ? <FaEyeSlash /> : <FaEye />}
                </span>
                <button
                  onClick={() => handleCopyPassword(s.password)}
                  style={{
                    background: "black",
                    padding: "5px 20px",
                    marginLeft: "10px",
                  }}
                >
                  <IoMdCopy />
                </button>
              </td>

              <td>
                <button
                  onClick={() => handleView(s)}
                  style={{
                    background: "#120325",
                    padding: "6px 14px",
                    fontSize: "14px",
                    marginRight: "10px",
                  }}
                >
                  <FaUsersViewfinder />
                  View
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleEdit(s)}
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
                  onClick={() => handleDelete(s)}
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
      <dialog id="delete-student-dialog" style={{ padding: "20px" }}>
        <h3 style={{ textAlign: "center" }}>Delete Student</h3>
        <p>
          Are you sure you want to delete{" "}
          <span style={{ fontWeight: "500", color: "red" }}>
            {deleteStudent?.name}?
          </span>
        </p>
        <button onClick={confirmDelete} style={{ background: "red" }}>
          {" "}
          Delete
        </button>
        <button
          onClick={() =>
            document.getElementById("delete-student-dialog").close()
          }
        >
          Cancel
        </button>
      </dialog>
      <dialog id="view-student-dialog" style={{ padding: "20px" }}>
        <h3 style={{ textAlign: "center" }}>Student Details</h3>
        {viewStudent && (
          <div style={{ lineHeight: "1.8" }}>
            <p>
              <b className="text-purple-950 ">Name</b> {viewStudent.name}
            </p>
            <p>
              <b>Email:</b> {viewStudent.email}
            </p>
            <p>
              <b>Password:</b> {viewStudent.password}
            </p>
            <p>
              <b>Number:</b> {viewStudent.number}
            </p>
            <p>
              <b>Std:</b> {viewStudent.std}
            </p>
            <p>
              <b>DOB:</b> {viewStudent.dob}
            </p>
            <p>
              <b>Address:</b> {viewStudent.address}
            </p>
            <p>
              <b>City:</b> {viewStudent.city}
            </p>
          </div>
        )}
        <button
          onClick={() => document.getElementById("view-student-dialog").close()}
        >
          Close
        </button>
      </dialog>
    </DefaultLayout>
  );
};
const myStyle = { color: "Gray", fontWeight: "550" };
export default Student;
