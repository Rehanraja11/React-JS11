import React from 'react'

const App = () => {
  const Website = "WEB DEVLOPMENT"
  const Price = 11111
  const isAvilable = true
  return (
    <div>
      <h1>Appsile Coder's BootCamp</h1>
      <h2>Website  : {Website}</h2>
      <h2>Website Price : {Price}</h2>

    <p>
      Status : {isAvilable?"Yes":"No"}
    </p>
    </div>
  )
}

export default App




// import React, { useState, useEffect } from "react";
// import DefaultLayout from "../layout/DefaultLayout";

// const Fees = () => {
//   const [fees, setFees] = useState(
//     JSON.parse(localStorage.getItem("fees")) || []
//   );

//   const [students] = useState(
//     JSON.parse(localStorage.getItem("students")) || []
//   );

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   const [form, setForm] = useState({
//     id: null,
//     studentId: "",
//     studentName: "",
//     class: "",
//     amount: "",
//     month: "",
//     status: "unpaid",
//     date: "",
//   });

//   useEffect(() => {
//     localStorage.setItem("fees", JSON.stringify(fees));
//   }, [fees]);

//   const handleStudentChange = (e) => {
//     const selected = students.find((s) => s.id == e.target.value);
//     setForm({
//       ...form,
//       studentId: selected.id,
//       studentName: selected.name,
//       class: selected.class,
//     });
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (form.id) {
//       setFees(fees.map((f) => (f.id === form.id ? form : f)));
//     } else {
//       setFees([...fees, { ...form, id: Date.now() }]);
//     }

//     setForm({
//       id: null,
//       studentId: "",
//       studentName: "",
//       class: "",
//       amount: "",
//       month: "",
//       status: "unpaid",
//       date: "",
//     });

//     document.getElementById("fees-dialog").close();
//   };

//   const markPaid = (fee) => {
//     const updated = fees.map((f) =>
//       f.id === fee.id
//         ? { ...f, status: "paid", date: new Date().toLocaleDateString() }
//         : f
//     );
//     setFees(updated);
//   };

//   const filteredFees = fees.filter((f) => {
//     const matchSearch = f.studentName
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchStatus = statusFilter ? f.status === statusFilter : true;

//     return matchSearch && matchStatus;
//   });

//   return (
//     <DefaultLayout>
//       <h2>Fees Management</h2>

//       <button onClick={() => document.getElementById("fees-dialog").showModal()}>
//         Add Fees
//       </button>

//       <input
//         placeholder="Search Student"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <select onChange={(e) => setStatusFilter(e.target.value)}>
//         <option value="">All</option>
//         <option value="paid">Paid</option>
//         <option value="unpaid">Unpaid</option>
//       </select>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Month</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredFees.map((f) => (
//             <tr key={f.id}>
//               <td>{f.studentName}</td>
//               <td>{f.class}</td>
//               <td>{f.month}</td>
//               <td>{f.amount}</td>
//               <td>{f.status}</td>
//               <td>
//                 {f.status === "unpaid" && (
//                   <button onClick={() => markPaid(f)}>Mark Paid</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Dialog */}
//       <dialog id="fees-dialog">
//         <form onSubmit={handleSubmit}>
//           <h3>Add Fees</h3>

//           <select onChange={handleStudentChange} required>
//             <option>Select Student</option>
//             {students.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>

//           <input value={form.class} disabled placeholder="Class" />

//           <input
//             name="amount"
//             placeholder="Amount"
//             value={form.amount}
//             onChange={handleChange}
//             required
//           />

//           <select name="month" onChange={handleChange} required>
//             <option value="">Select Month</option>
//             <option>January</option>
//             <option>February</option>
//             <option>March</option>
//           </select>

//           <button type="submit">Save</button>
//           <button
//             type="button"
//             onClick={() => document.getElementById("fees-dialog").close()}
//           >
//             Cancel
//           </button>
//         </form>
//       </dialog>
//     </DefaultLayout>
//   );
// };

// export default Fees;