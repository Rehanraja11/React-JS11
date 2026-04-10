import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './Context/AuthContext';


function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">Admin Dashboard</div>
      <nav className="nav">
        <button className='logoutbtn' onClick={logout} style={{background:"#fff", color:"black"}}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;  