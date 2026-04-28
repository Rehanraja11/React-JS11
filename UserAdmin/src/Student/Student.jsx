import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import { PiStudentFill } from "react-icons/pi";
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const Student = () => {
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || [],
  );

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const [deleteStudent, setDeleteStudent] = useState(null);

  const [form, setStudentForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    phone: "",
    classes: "",
    dob: "",
    address: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [viewStudent, setViewStudent] = useState(null);
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);
  const handleView = (student) => {
    setViewStudent(student);
    document.getElementById("view-student-dialog").showModal();
  };
  const handleChange = (e) => {
    setStudentForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlephoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setStudentForm({ ...form, phone: value });
  };
  const validatePassword = (password) => {
    if (password.length < 8) return false;
    let hasUpper = false,
      hasLower = false,
      hasphone = false,
      hasSpecial = false;
    for (let char of password) {
      if (char >= "A" && char <= "Z") hasUpper = true;
      else if (char >= "a" && char <= "z") hasLower = true;
      else if (char >= "0" && char <= "9") hasphone = true;
      else hasSpecial = true;
    }
    return hasUpper && hasLower && hasphone && hasSpecial;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://192.168.0.113:8000/api/v1/users/create-student",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }

    const dialog = document.getElementById("student-dialog");
    const isDuplicate = students.some(
      (s) =>
        (s.email === form.email ||
          s.phone === form.phone ||
          s.name === form.name ||
          s.password === form.password) &&
        s.id !== form.id,
    );
    if (isDuplicate) {
      alert("Duplicate data found!");
      return;
    }
    if (!validatePassword(form.password)) {
      setErrors({ password: "Weak Password" });
      return;
    }
    if (form.id) {
      setStudents(students.map((s) => (s.id === form.id ? form : s)));
    } else {
      setStudents([...students, { ...form, id: Date.now() }]);
    }
    setStudentForm({
      id: null,
      name: "",
      email: "",
      password: "",
      phone: "",
      classes: "",
      dob: "",
      address: "",
      city: "",
    });
    dialog.close();
  };
  const handleEdit = (student) => {
    setStudentForm(student);
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
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchesClass = classFilter ? s.class === classFilter : true;

    return matchesSearch && matchesClass;
  });

  return (
    <DefaultLayout>
      <dialog id="student-dialog" style={{ padding: "20px" }}>
        <form
          style={{ padding: "20px", background: "#fff" }}
          onSubmit={handleSubmit}
        >
          <h3>{form.id ? "Edit Student" : "Add Student"}</h3>
          <input
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
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
          <input
            type="tel"
            name="phone"
            placeholder="phone."
            value={form.phone}
            onChange={handlephoneChange}
            maxLength="10"
          />
          <select
            name="classes"
            value={form.classes}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option value="1st">Class 1st</option>
            <option value="2nd">Class 2nd</option>
            <option value="3rd">Class 3rd</option>
            <option value="4th">Class 4th</option>
            <option value="5th">Class 5th</option>
            <option value="6th">Class 6th</option>
            <option value="7th">Class 7th</option>
            <option value="8th">Class 8th</option>
            <option value="9th">Class 9th</option>
            <option value="10th">Class 10th</option>
            <option value="11th">Class 11th</option>
            <option value="12th">Class 12th</option>
          </select>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <button type="submit">{form.id ? "Update" : "Add"}</button>
          <button
            type="button"
            onClick={() => document.getElementById("student-dialog").close()}
          >
            Cancel
          </button>
        </form>
      </dialog>
      <div className="flex mt-15 mb-12 items-center justify-between mr-40">
        <h3>Student List</h3>
        <div className="flex items-center">
          <select
            className="w-40 h-12"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              marginRight: "15px",
              marginBottom: "12px",
              border: "1px solid #120325",
              outline: "none",
            }}
          >
            <option value="">📖 All Classes</option>
            <option value="1st">Class 1</option>
            <option value="2nd">Class 2</option>
            <option value="3rd">Class 3</option>
            <option value="4th">Class 4</option>
            <option value="5th">Class 5</option>
            <option value="6th">Class 6</option>
            <option value="7th">Class 7</option>
            <option value="8th">Class 8</option>
            <option value="9th">Class 9</option>
            <option value="10th">Class 10</option>
            <option value="11th">Class 11</option>
            <option value="12th">Class 12</option>
          </select>
          <input
            type="text"
            placeholder="🔍 Search Student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              document.getElementById("student-dialog").showModal()
            }
            style={{
              background: "linear-gradient(135deg, #000000, #333333)",
              color: "#ffffff",
              padding: "12px 22px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "12px",
            }}
          >
            Add Student <PiStudentFill />
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style={myStyle}>Student Name</th>
            <th style={myStyle}>Student Email</th>
            <th style={myStyle}>Phone phone</th>
            <th style={myStyle}>Details</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>

                <td>
                  <button
                    onClick={() => handleView(s)}
                    style={{ background: "black" }}
                  >
                    <FaUsersViewfinder /> View
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
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <dialog
        id="view-student-dialog"
        style={{ padding: "25px", border: "1px solid Black" }}
      >
        {viewStudent && (
          <div
            style={{
              padding: "20px",
              background: "#fff",
              border: "1px solid #120325",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#120325",
                borderBottom: "1px Solid #120325",
              }}
            >
              Student Details
            </h3>

            <p>
              <b style={{ color: "#120325" }}>Name:</b> {viewStudent.name}
            </p>
            <p>
              <b style={{ color: "#120325" }}>Email:</b> {viewStudent.email}
            </p>
            <p>
              <b style={{ color: "#120325" }}>Password:</b>{" "}
              {viewStudent.password}
            </p>
            <p>
              <b style={{ color: "#120325" }}>Phone:</b> {viewStudent.phone}
            </p>
            <p>
              <b style={{ color: "#120325" }}>classes:</b> {viewStudent.classes}
            </p>
            <p>
              <b style={{ color: "#120325" }}>DOB:</b> {viewStudent.dob}
            </p>
            <p>
              <b style={{ color: "#120325" }}>Address:</b> {viewStudent.address}
            </p>
            <p>
              <b style={{ color: "#120325" }}>City:</b> {viewStudent.city}
            </p>

            <button
              onClick={() =>
                document.getElementById("view-student-dialog").close()
              }
              style={{ background: "black", marginLeft: "25.5em" }}
            >
              Close
            </button>
          </div>
        )}
      </dialog>
      <dialog id="delete-student-dialog" style={{ padding: "20px" }}>
        {deleteStudent && (
          <div style={{ padding: "20px", background: "#fff" }}>
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete <b>{deleteStudent.name}</b>?
            </p>
            <button
              onClick={confirmDelete}
              style={{
                marginRight: "10px",
                background: "red",
                color: "#fff",
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={() =>
                document.getElementById("delete-student-dialog").close()
              }
            >
              Cancel
            </button>
          </div>
        )}
      </dialog>
    </DefaultLayout>
  );
};

const myStyle = { color: "Gray", fontWeight: "550" };
export default Student;
