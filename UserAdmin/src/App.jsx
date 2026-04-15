import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "@knadh/oat/oat.min.css";
import "@knadh/oat/oat.min.js";
import Student from "./Student/Student.jsx";
import Teacher from "./Teachers/Teacher.jsx";
import Subject from "./Subject/Subject.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";


function App() {
  return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute><Student/></ProtectedRoute>} />
          <Route path="/teacher" element={<ProtectedRoute><Teacher/></ProtectedRoute>} />
          <Route path="/subject" element={<ProtectedRoute><Subject/></ProtectedRoute>} />
        </Routes>  
        );
}
export default App;
