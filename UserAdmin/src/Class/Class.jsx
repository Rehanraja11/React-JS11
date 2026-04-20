import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../layout/DefaultLayout";
import { SiGoogleclassroom } from "react-icons/si";

const Class = () => {
  const [classes, setClasses] = useState(
    JSON.parse(localStorage.getItem("classes")) || []
  );
  const [deleteClass, setDeleteClass] = useState(null);
  const [searchClass, setSearchClass] = useState("");

  const [form, setForm] = useState({
    id: null,
    className: "",
    classId: "",
    student: "",
  });

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dialog = document.getElementById("class-dialog");

    const isDuplicate = classes.some(
      (c) =>
        (c.className === form.className ||
          c.classId === form.classId) &&
        c.id !== form.id
    );

    if (isDuplicate) {
      alert("Duplicate class data found!");
      return;
    }

    if (form.id) {
      setClasses(classes.map((c) => (c.id === form.id ? form : c)));
    } else {
      setClasses([...classes, { ...form, id: Date.now() }]);
    }

    setForm({
      id: null,
      className: "",
      classId: "",
      student: "",
    });

    dialog.close();
  };

  const handleEdit = (cls) => {
    setForm(cls);
    document.getElementById("class-dialog").showModal();
  };

  const handleDelete = (cls) => {
    setDeleteClass(cls);
    document.getElementById("delete-class-dialog").showModal();
  };

  const confirmDelete = () => {
    setClasses(classes.filter((c) => c.id !== deleteClass.id));
    setDeleteClass(null);
    document.getElementById("delete-class-dialog").close();
  };
   const filteredClasses = classes.filter(
    (c) =>
      c.className.toLowerCase().includes(searchClass.toLowerCase()) ||
      c.classId.toLowerCase().includes(searchClass.toLowerCase()) 
      
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

          <label>Student</label>
          <input
            type="text"
            name="student"
            value={form.student}
            onChange={handleChange}
            required
          />

          <button type="submit">{form.id ? "Update" : "Add"}</button>

          <button
            type="button"
            style={{ marginLeft: "292px" }}
            onClick={() =>
              document.getElementById("class-dialog").close()
            }
          >
            Cancel
          </button>
        </form>
      </dialog>

      
      <div className="flex mt-15 mb-12 items-center justify-between mr-40">
        <h3 >
          Class List
        </h3>
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
            fontSize: "1.1rem",
            lineHeight: "1.9rem",
            outline: "none",
            marginRight:"19px"
          }}
        />
        <button
          onClick={() =>
            document.getElementById("class-dialog").showModal()
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
          }}
        >
          Add Class <SiGoogleclassroom />
        </button>
        </div>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th style={myStyle}>Class Name</th>
            <th style={myStyle}>Class ID</th>
            <th style={myStyle}>Student</th>
            <th style={myStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredClasses.map((c) => (
            <tr key={c.id}>
              <td>{c.className}</td>
              <td>{c.classId}</td>
              <td>{c.student}</td>
              <td>
                <button
                  onClick={() => handleEdit(c)}
                  style={{
                    background: "green",
                    padding: "6px 18px",
                    fontSize: "18px",
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

      {/* Delete Dialog */}
      <dialog id="delete-class-dialog" style={{ padding: "20px" }}>
        <h3>Delete Class</h3>
        <p>
          Are you sure you want to delete{" "}
          <b>{deleteClass?.className}</b>?
        </p>

        <button onClick={confirmDelete}>Delete</button>
        <button
          onClick={() =>
            document.getElementById("delete-class-dialog").close()
          }
        >
          Cancel
        </button>
      </dialog>
    </DefaultLayout>
  );
};

const myStyle = { color: "Gray", fontWeight: "550" };

export default Class;