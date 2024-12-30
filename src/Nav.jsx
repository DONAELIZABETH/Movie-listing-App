
import { Link } from 'react-router-dom';
import './Nav.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
         <h1>Movie Listing App </h1>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
