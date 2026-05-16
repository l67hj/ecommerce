import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ cart }) {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { 
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
       <nav className={`navbar-nav ${scrolled ? "scrolled" : ""}`}>
      <img src="/logo (5).png" alt="logo" />

       <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>
        <ul className="nav-ul" >
       <li  className={`nav-item ${isOpen ? "active" : ""}`}>
      
        <NavLink to="/" className="nav-link">HOME</NavLink>
        <NavLink to="/product" className="nav-link">PRODUCT</NavLink>
        <NavLink to="/footer" className="nav-link">ABOUT US</NavLink>
        <NavLink to="/contact" className="nav-link">CONTACT</NavLink>
          </li>
           <div className="icon">
        <NavLink to="/cartpage" className="nav-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </NavLink>
      
          <NavLink to="/searchicon"  className="nav-icon">
           <i className="fa-solid fa-magnifying-glass"></i>
          </NavLink>
          </div>
          </ul>
    </nav>
    </>
    
  );
}

export default Navbar;