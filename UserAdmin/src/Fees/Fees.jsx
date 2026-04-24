import { useState, useEffect } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import DefaultLayout from "../layout/DefaultLayout";
import { GiMoneyStack } from "react-icons/gi";
import { MdDone } from "react-icons/md";

const Fees = () => {
  const [fees, setFees] = useState(
    JSON.parse(localStorage.getItem("fees")) || [],
  );

  const [students] = useState(
    JSON.parse(localStorage.getItem("students")) || [],
  );

  const [classes] = useState(JSON.parse(localStorage.getItem("classes")) || []);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [form, setForm] = useState({
    id: null,
    studentId: "",
    studentName: "",
    class: "",
    totalFee: "",
    paid: " ",
    pending: "",
    status: "unpaid",
  });

  const [selectedFee, setSelectedFee] = useState(null);
  const [payAmount, setPayAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("fees", JSON.stringify(fees));
  }, [fees]);

  const getClassFee = (studentClass) => {
    const match = classes.find((c) => {
      const a = (c.className || "").trim().toLowerCase();
      const b = (studentClass || "").trim().toLowerCase();
      return a === b;
    });

    return Number(match?.fees || 0);
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    const selectedStudent = students.find((s) => s.id == studentId);
    if (!selectedStudent) return;

    const fee = getClassFee(selectedStudent.class);

    setForm({
      ...form,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      class: selectedStudent.class,
      totalFee: fee,
      paid: " ",
      pending: fee,
      status: "unpaid",
    });
  };

  const handlePaidChange = (e) => {
    const paid = Number(e.target.value || 0);
    const pending = form.totalFee - paid;

    setForm({
      ...form,
      paid,
      pending: pending < 0 ? 0 : pending,
      status: paid >= form.totalFee ? "paid" : "unpaid",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFee = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };

    setFees([...fees, newFee]);

    setForm({
      id: null,
      studentId: "",
      studentName: "",
      class: "",
      totalFee: "",
      paid: " ",
      pending: "",
      status: "unpaid",
    });

    document.getElementById("fees-dialog").close();
  };

  const handlePay = (fee) => {
    setSelectedFee(fee);
    setPayAmount("");
    document.getElementById("pay-dialog").showModal();
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();

    const amount = Number(payAmount || 0);

    if (amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (amount > selectedFee.pending) {
      alert("Cannot pay more than pending amount");
      return;
    }

    const updated = fees.map((f) => {
      if (f.id === selectedFee.id) {
        const newPaid = Number(f.paid) + amount;
        const newPending = f.totalFee - newPaid;

        return {
          ...f,
          paid: newPaid,
          pending: newPending < 0 ? 0 : newPending,
          status: newPaid >= f.totalFee ? "paid" : "unpaid",
        };
      }
      return f;
    });

    setFees(updated);
    document.getElementById("pay-dialog").close();
  };

  const filteredFees = fees.filter((f) => {
    const matchSearch = f.studentName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = statusFilter ? f.status === statusFilter : true;

    return matchSearch && matchStatus;
  });

  return (
    <DefaultLayout>
      <div className="flex mt-20 items-center justify-between mb-15">
        <h2>Fees Management</h2>

        <div className="mr-40">
          <input
            placeholder="🔍 Search Student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px",
              width: "250px",
              borderRadius: "9px",
              border: "1px solid #120325",
              marginRight: "19px",
            }}
          />

          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "8px",
              width: "250px",
              borderRadius: "9px",
              border: "1px solid #120325",
              marginRight: "19px",
            }}
          >
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>

          <button
            className="bg-black font-semibold"
            onClick={() => document.getElementById("fees-dialog").showModal()}
          >
            <FcMoneyTransfer /> Add Fees
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Total Fee</th>
            <th>Paid</th>
            <th>Pending</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredFees.length > 0 ? (
            filteredFees.map((f) => (
              <tr key={f.id}>
                <td>{f.studentName}</td>
                <td>{f.class}</td>
                <td>₹{f.totalFee}</td>
                <td>₹{f.paid}</td>
                <td>₹{f.pending}</td>
                <td>
                  {f.status === "paid" ? (
                    <span style={{ color: "green", fontWeight: "650" }}>
                      Paid
                    </span>
                  ) : (
                    <span style={{ color: "red", fontWeight: "650" }}>
                      UnPaid
                    </span>
                  )}
                </td>

                <td>
                  {f.status === "unpaid" ? (
                    <button
                      style={{ background: "#023020", fontWeight: "600", }}
                      onClick={() => handlePay(f)}
                    >
                      {" "}
                      <GiMoneyStack /> Pay
                    </button>
                  ):(
                    <button
                      style={{ background: "#023020", fontWeight: "600", }}
                      
                    >
                      {" "}
                      <MdDone />     Done
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" align="center">
                No Fees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <dialog id="fees-dialog">
        <form style={{ padding: "30px" }} onSubmit={handleSubmit}>
          <h3>Add Fees</h3>

          <select onChange={handleStudentChange} required>
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input value={form.class} disabled placeholder="Class" />
          <input value={form.totalFee} disabled placeholder="Total Fee" />

          <input
            type="number"
            value={form.paid}
            onChange={handlePaidChange}
            placeholder="Paid Amount"
          />

          <input value={form.pending} disabled placeholder="Pending Fees" />

          <button
            style={{ marginRight: "310px", background: "green" }}
            type="submit"
          >
            Save
          </button>
          <button
            style={{ background: "#550000" }}
            type="button"
            onClick={() => document.getElementById("fees-dialog").close()}
          >
            Cancel
          </button>
        </form>
      </dialog>

      <dialog id="pay-dialog">
        <form style={{ padding: "20px" }} onSubmit={handlePaySubmit}>
          <h3 className="text-center mt-3"> Pay Fees</h3>

          <p style={{ border: "1px solid black", padding: "10px" }}>
            Student: {selectedFee?.studentName}
          </p>
          <p style={{ border: "1px solid black", padding: "10px" }}>
            Total Fee: ₹{selectedFee?.totalFee}
          </p>
          <p style={{ border: "1px solid black", padding: "10px" }}>
            Paid: ₹{selectedFee?.paid}
          </p>
          <p style={{ border: "1px solid black", padding: "10px" }}>
            Pending: ₹{selectedFee?.pending}
          </p>

          <input
            style={{ border: "1px solid black", padding: "10px" }}
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            placeholder="Enter Amount"
            required
          />

          <button
            style={{ marginRight: "310px", background: "#023020" }}
            type="submit"
          >
            {" "}
            <GiMoneyStack /> Pay
          </button>
          <button
            type="button"
            onClick={() => document.getElementById("pay-dialog").close()}
          >
            Cancel
          </button>
        </form>
      </dialog>
    </DefaultLayout>
  );
};

export default Fees;
