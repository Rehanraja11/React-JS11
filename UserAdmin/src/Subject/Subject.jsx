import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import { IoBookSharp } from "react-icons/io5";
import axios from "axios";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
const [deleteSubject, setDeleteSubject] = useState(null);
const [searchSubject, setSearchSubject] = useState("");

const [form, setForm] = useState({
  s_id: null,
  name: "",
  semester: "",
  instructor: "",
});


const fetchSubjects = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      "http://192.168.0.113:8000/api/v1/users/all-subjects",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSubjects(res.data.data || res.data);
  } catch (err) {
    console.error("GET ERROR:", err.response?.data || err);
  }
};

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchSubjects();
}, []);


const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    if (form.s_id) {
     
      await axios.put(
        "http://192.168.0.113:8000/api/v1/users/update-subject",
        {
          s_id: form.s_id,
          name: form.name,
          semester: form.semester,
          instructor: form.instructor,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
     
      await axios.post(
        "http://192.168.0.113:8000/api/v1/users/create-subject",
        {
          name: form.name,
          semester: form.semester,
          instructor: form.instructor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    await fetchSubjects();

    setForm({
      s_id: null,
      name: "",
      semester: "",
      instructor: "",
    });

    document.getElementById("subject-dialog").close();
  } catch (err) {
    console.error("ERROR:", err.response?.data || err);
  }
};

const handleEdit = (subject) => {
  setForm({
    s_id: subject.s_id,
    name: subject.name || subject.name,
    semester: subject.semester,
    instructor: subject.instructor,
  });

  document.getElementById("subject-dialog").showModal();
};

const handleDelete = (subject) => {
  setDeleteSubject(subject);
  document.getElementById("delete-subject-dialog").showModal();
};

const confirmDelete = async () => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      "http://192.168.0.113:8000/api/v1/users/delete-subject",
      {
        headers: { Authorization: `Bearer ${token}` },
        data: { s_id: deleteSubject?.s_id },
      }
    );

    await fetchSubjects();
    setDeleteSubject(null);

    document.getElementById("delete-subject-dialog").close();
  } catch (err) {
    console.error("DELETE ERROR:", err.response?.data || err);
  }
};

const filteredSubjects = subjects.filter(
  (s) =>
    (s.name || s.name || "")
      .toLowerCase()
      .includes(searchSubject.toLowerCase()) ||
    (s.semester || "")
      .toLowerCase()
      .includes(searchSubject.toLowerCase())
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
            name="name"
            value={form.name}
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
            <th style={myStyle}>Subject id</th>
            <th style={myStyle}>Semester</th>
            <th style={myStyle}>Instructor</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map((s) => (
            <tr key={s.s_id}>
              <td>{s.s_id}</td>
              <td>{s.name}</td>
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
          Are you sure you want to delete <b>{deleteSubject?.name}</b>?
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
