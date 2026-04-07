import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // បន្ថែម useNavigate នៅទីនេះ
import "./Navbar.css";
import { useCart } from "../context/CartContext";

const Navbar = ({ setSearchQuery }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };


  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">Shop</Link>
      </div>

      {/* Search */}
      <div className="search">
        <input type="text" placeholder="Search products..." onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {/* Menu Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Icons */}
      <div className="icons">
        <Link to="/cart" className="cart">
          🛒
          <span className="badge">{totalItems}</span>
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-link">Logout</button>
        ) : (

        <Link to="/login">👤</Link>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;