import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import { IoBookSharp } from "react-icons/io5";

const Subject = () => {
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem("subjects")) || [],
  );
  const [deleteSubject, setDeleteSubject] = useState(null);
  const [searchSubject, setSearchSubject] = useState("");

  const [form, setForm] = useState({
    id: null,
    subjectName: "",
    semester: "",
    instructor: "",
  });

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dialog = document.getElementById("subject-dialog");

    const isDuplicate = subjects.some(
      (s) =>
        (s.subjectName === form.subjectName ||
          s.instructor === form.instructor) &&
        s.id !== form.id,
    );

    if (isDuplicate) {
      alert("Duplicate subject data found!");
      return;
    }

    if (form.id) {
      setSubjects(subjects.map((s) => (s.id === form.id ? form : s)));
    } else {
      setSubjects([...subjects, { ...form, id: Date.now() }]);
    }

    setForm({
      id: null,
      subjectName: "",
      semester: "",
      instructor: "",
    });
    dialog.close();
  };
  const handleEdit = (subject) => {
    setForm(subject);
    document.getElementById("subject-dialog").showModal();
  };

  const handleDelete = (subject) => {
    setDeleteSubject(subject);
    document.getElementById("delete-subject-dialog").showModal();
  };

  const confirmDelete = () => {
    setSubjects(subjects.filter((s) => s.id !== deleteSubject.id));
    setDeleteSubject(null);
    document.getElementById("delete-subject-dialog").close();
  };

  const filteredStudents = subjects.filter(
    (s) =>
      s.subjectName.toLowerCase().includes(searchSubject.toLowerCase()) ||
      s.semester.toLowerCase().includes(searchSubject.toLowerCase()),
  );

  return (
    <DefaultLayout>
      <dialog id="subject-dialog" style={{ padding: "20px" }}>
        <form
          style={{ padding: "20px", background: "#fff" }}
          onSubmit={handleSubmit}
        >
          <h3>{form.id ? "Edit Subject" : "Add Subject"}</h3>
          <label>Subject Name</label>
          <input
            type="text"
            name="subjectName"
            value={form.subjectName}
            onChange={handleChange}
            required
          />
          <label>Semester</label>
          <input
            type="text"
            name="semester"
            value={form.semester}
            onChange={handleChange}
            required
          />
          <label>Instructor</label>
          <input
            type="text"
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            required
          />
          <button type="submit">{form.id ? "Update" : "Add"}</button>
          <button
            style={{ marginLeft: "292px" }}
            type="button"
            onClick={() => document.getElementById("subject-dialog").close()}
          >
            Cancel
          </button>
        </form>
      </dialog>
      <div className="flex mt-15 mb-12 items-center justify-between mr-40">
        <h3>Subject List</h3>
        <div>
          <input
            type="text"
            placeholder="🔍 Search Subject"
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
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
              document.getElementById("subject-dialog").showModal()
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            Add Subject <IoBookSharp />
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style={myStyle}>Subject Name</th>
            <th style={myStyle}>Semester</th>
            <th style={myStyle}>Instructor</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s.id}>
              <td>{s.subjectName}</td>
              <td>{s.semester}</td>
              <td>{s.instructor}</td>
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
      <dialog id="delete-subject-dialog" style={{ padding: "20px" }}>
        <h3>Delete Subject</h3>
        <p>
          Are you sure you want to delete <b>{deleteSubject?.subjectName}</b>?
        </p>
        <button onClick={confirmDelete}>Delete</button>
        <button
          onClick={() =>
            document.getElementById("delete-subject-dialog").close()
          }
        >
          Cancel
        </button>
      </dialog>
    </DefaultLayout>
  );
};
const myStyle = { color: "Gray", fontWeight: "550" };
export default Subject;
