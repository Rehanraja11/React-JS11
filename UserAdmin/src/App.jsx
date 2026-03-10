import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "@knadh/oat/oat.min.css";
import "@knadh/oat/oat.min.js";
import { AuthContext } from "./Context/AuthContext.jsx";
import { Children} from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      {/* 
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard /> 
          </ProtectedRoutes>
        }
      /> */}
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
