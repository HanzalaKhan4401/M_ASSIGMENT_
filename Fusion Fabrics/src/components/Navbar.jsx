// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import { useWishlist } from "./WishlistContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Page reload ya first render pe token check
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function with optional backend call
  const handleLogout = async () => {
    try {
      // 🔹 If you have backend logout API
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("token"); // remove token from frontend
    setIsLoggedIn(false);             // update React state immediately
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap');

          .dior-brand img {
            height: 55px;
            transition: transform 0.3s ease-in-out;
          }
          .dior-brand img:hover {
            transform: scale(1.1);
          }
          .topbar {
            background-color: #f8f9fa;
            color: #212529;
            font-size: 14px;
            padding: 5px 0;
            text-align: center;
          }
        `}
      </style>

      <div className="topbar">
        Summer Sale! 50% OFF and Free Express Delivery
      </div>

      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand dior-brand brand-text" to="/">
            <img src={logo} alt="Fusion Fabrics" />
            <span
              style={{
                color: "#fff",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                fontWeight: "600",
                letterSpacing: "1px",
                marginTop: "4px",
              }}
            >
              Fusion Fabrics
            </span>
          </Link>

          <button className="navbar-toggler bg-light" type="button" onClick={() => setIsOpen(!isOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-center ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact">Contact</Link>
              </li>

              {/* Signup / Logout */}
              <li className="nav-item">
                {!isLoggedIn ? (
                  <Link className="nav-link text-white" to="/signup">Sign Up</Link>
                ) : (
                  <button
                    className="nav-link text-white bg-transparent border-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>

            {/* Wishlist + Cart Icons */}
            <div className="d-flex align-items-center gap-3 ms-auto">

              <Link to="/wishlist" className="position-relative text-decoration-none">
                <i className="bi bi-heart fs-4 text-white"></i>
                {wishlist.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="position-relative text-decoration-none">
                <i className="bi bi-cart fs-4 text-white"></i>
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;