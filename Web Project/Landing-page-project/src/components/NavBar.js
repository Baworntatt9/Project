import React from "react";
import { Link } from "react-scroll";

const NavBar = () => {
  return (
    <nav>
      <div>
        <Link to="home" smooth={true}>
          Home
        </Link>
      </div>
      <div>
        <Link to="features" smooth={true}>
          Features
        </Link>
        <Link to="benefits" smooth={true}>
          Benefits
        </Link>
        <Link to="flash sales" smooth={true}>
          Flash sale
        </Link>
        <Link to="rate us" smooth={true}>
          Rate-Us
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
