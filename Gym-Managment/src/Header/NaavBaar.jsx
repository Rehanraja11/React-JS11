import { NavLink, useNavigate } from "react-router-dom";

const NaavBaar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.logo}>Elit~Fit</h2>
        <div style={{textDecoration:"none"}}>
          <NavLink to="/dashboard" style={styles.menu}>
            Home
          </NavLink>
          <NavLink to="/membership " style={styles.menu}>
            Membership
          </NavLink>
          <NavLink to="/contact" style={styles.menu}>
            Contact Us
          </NavLink>
          </div>
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "10px",
    background: "#000",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #111",
  },

  logo: {
    color: "#00ffcc",
    letterSpacing: "2px",
    marginTop : "15px"
  
  },

  logout: {
    padding: "8px 14px",
    border: "none",
    background: "#00ffcc  ",
    color: "#000",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  },

  menu: {
    padding: "8px 14px",
    border: "none",
    color: "#00ffcc",
    fontWeight: "bold",
    textDecoration:"none"
  },
};
export default NaavBaar;
