import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import { IoIosLogOut } from "react-icons/io";


function Header() {
  const { logout } = useContext(AuthContext);


  return (
    <header className="header">
      <div className="logo">Admin Dashboard</div>
      <nav className="nav">
        <button className='logoutbtn' onClick={logout} style={{background:"#fff", color:"black"}}> <IoIosLogOut />
Logout</button>
      </nav>
    </header>
  );
}

export default Header;  