import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "@knadh/oat/oat.min.css";
import "@knadh/oat/oat.min.js";
import Student from "./Student/Student.jsx";
import Teacher from "./Teachers/Teacher.jsx";
import Subject from "./Subject/Subject.jsx";

function App() {
  return (
  
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher/>} />
          <Route path="/subject" element={<Subject/>} />
        </Routes>
     
   
  );
}
export default App;

// const ProtectedRoutes = ({ children }) => {
//   const { email } = useContext(AuthContext);
//   if (!email) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };
