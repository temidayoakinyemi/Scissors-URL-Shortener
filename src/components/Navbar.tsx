import React, { useState } from "react";
import "./Navbar.css";
import url_shortener_ from "../assets/url-shortener-.png";
import menu_icon from "../assets/menu-icon.png";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import "../components/Navbar.css";

const Navbar: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  };

  return (
    <>
      <nav className="container dark-nav">
        <RouterLink to="/">
          <div className="logos">
            <h1 className="shortly">Shortly</h1>
            <img className="logo" src={url_shortener_} alt="" />
          </div>
        </RouterLink>
        <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
          <li>
            <Link to="hero" smooth={true} offset={-260} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to="features" smooth={true} offset={-260} duration={500}>
              Features
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to="pricing-container"
              smooth={true}
              offset={-150}
              duration={500}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link to="url-shortener" smooth={true} offset={-150} duration={500}>
              Shorten Links
            </Link>
          </li>
          <li className="login">
            <RouterLink to="/login">Login</RouterLink>
          </li>
          <li>
            <RouterLink to="/register">
              <button className="btn">Sign up</button>
            </RouterLink>
          </li>
        </ul>
        <img
          src={menu_icon}
          alt=""
          className="menu-icon"
          onClick={toggleMenu}
        />
      </nav>
    </>
  );
};

export default Navbar;
