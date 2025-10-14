import './NavBar.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext.js';

export default function NavBar() {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo">🎬 Cineverse</div>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className="link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/favorites" className="link" onClick={() => setMenuOpen(false)}>Favorites</Link>
        <Link to="/search" className="link" onClick={() => setMenuOpen(false)}>Search</Link>
      </div>

      {!user ? (
        <Link to="/login" className="login-btn">Login</Link>
      ) : (
        <button className="logout-btn" onClick={logout}>Logout</button>
      )}
    </nav>
  );
}


