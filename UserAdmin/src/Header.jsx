import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">Admin Dashboard</div>
      <nav className="nav">
        <button onClick={logout} style={{background:"white",color:"black"}}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;