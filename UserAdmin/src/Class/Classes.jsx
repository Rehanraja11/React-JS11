import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import { SiGoogleclassroom } from "react-icons/si";
import axios from "axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
const [deleteClass, setDeleteClass] = useState(null);
const [searchClass, setSearchClass] = useState("");

const [form, setForm] = useState({
  c_id: null,
  className: "",
  classId: "",
  student: "",
  fees: "",
});


const fetchClasses = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      "http://192.168.0.113:8000/api/v1/users/all-classes",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setClasses(res.data.data || res.data);
  } catch (err) {
    console.error("GET ERROR:", err.response?.data || err);
  }
};

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchClasses();
}, []);


const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    if (form.c_id) {
      // UPDATE
      await axios.put(
        "http://192.168.0.113:8000/api/v1/users/update-classes",
        {
          c_id: form.c_id,
          class_id: form.classId,
          name: form.className,
          totalStudents: form.student,
          classFees: form.fees,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      
      await axios.post(
        "http://192.168.0.113:8000/api/v1/users/create-classes",
        {
          name: form.className,
          class_id: form.classId,
          student: form.student,
          fees: form.fees,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    await fetchClasses();

    setForm({
      c_id: null,
      className: "",
      classId: "",
      student: "",
      fees: "",
    });

    document.getElementById("class-dialog").close();
  } catch (err) {
    console.error("ERROR:", err.response?.data || err);
  }
};


const handleEdit = (cls) => {
  setForm({
    c_id: cls.c_id,
    className: cls.className || cls.name,
    classId: cls.classId || cls.class_id,
    student: cls.student,
    fees: cls.fees,
  });

  document.getElementById("class-dialog").showModal();
};


const handleDelete = (cls) => {
  setDeleteClass(cls);
  document.getElementById("delete-class-dialog").showModal();
};

const confirmDelete = async () => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      "http://192.168.0.113:8000/api/v1/users/delete-classes",
      {
        headers: { Authorization: `Bearer ${token}` },
        data: { c_id: deleteClass?.c_id },
      }
    );

    await fetchClasses();
    setDeleteClass(null);

    document.getElementById("delete-class-dialog").close();
  } catch (err) {
    console.error("DELETE ERROR:", err.response?.data || err);
  }
};


const filteredClasses = classes.filter(
  (c) =>
    (c.className || c.name || "")
      .toLowerCase()
      .includes(searchClass.toLowerCase()) ||
    (c.classId || c.class_id || "")
      .toLowerCase()
      .includes(searchClass.toLowerCase())
);

  return (
    <DefaultLayout>
      <dialog id="class-dialog" style={{ padding: "20px" }}>
        <form
          style={{ padding: "20px", background: "#fff" }}
          onSubmit={handleSubmit}
        >
          <h3>{form.id ? "Edit Class" : "Add Class"}</h3>

          <label>Class Name</label>
          <input
            type="text"
            name="className"
            value={form.className}
            onChange={handleChange}
            required
          />

          <label>Class ID</label>
          <input
            type="text"
            name="classId"
            value={form.classId}
            onChange={handleChange}
            required
          />

          <label>Total Students</label>
          <input
            type="number"
            name="student"
            value={form.student}
            onChange={handleChange}
            required
          />

          <label>Class Fees</label>
          <input
            type="number"
            name="fees"
            value={form.fees}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <button type="submit">{form.id ? "Update" : "Add"}</button>

          <button
            type="button"
            style={{ marginLeft: "20px" }}
            onClick={() => document.getElementById("class-dialog").close()}
          >
            Cancel
          </button>
        </form>
      </dialog>

      <div className="flex mt-15 mb-12 items-center justify-between mr-40">
        <h3>Class List</h3>

        <div>
          <input
            type="text"
            placeholder="🔍 Search Class"
            value={searchClass}
            onChange={(e) => setSearchClass(e.target.value)}
            style={{
              padding: "8px",
              width: "250px",
              borderRadius: "9px",
              border: "1px solid #120325",
              marginRight: "19px",
            }}
          />

          <button
            onClick={() => document.getElementById("class-dialog").showModal()}
            style={{
              background: "linear-gradient(135deg, #000000, #333333)",
              color: "#ffffff",
              padding: "12px 22px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Class <SiGoogleclassroom />
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style={myStyle}>Class Name</th>
            <th style={myStyle}>Class ID</th>
            <th style={myStyle}>Students</th>
            <th style={myStyle}>Fees</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.class_id}</td>
                <td>{c.student}</td>
                <td>₹ {c.fees}</td>
                <td>
                  <button
                    onClick={() => handleEdit(c)}
                    style={{
                      background: "green",
                      padding: "6px 18px",
                      marginRight: "10px",
                    }}
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(c)}
                    style={{
                      background: "brown",
                      padding: "6px 18px",
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" align="center">
                No Classes Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <dialog id="delete-class-dialog" style={{ padding: "20px" }}>
        <h3>Delete Class</h3>
        <p>
          Are you sure you want to delete <b>{deleteClass?.className}</b>?
        </p>
        <button onClick={confirmDelete}>Delete</button>
        <button
          onClick={() => document.getElementById("delete-class-dialog").close()}
        >
          Cancel
        </button>
      </dialog>
    </DefaultLayout>
  );
};

const myStyle = { color: "Gray", fontWeight: "550" };

export default Classes;
