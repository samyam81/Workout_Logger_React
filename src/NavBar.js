import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/how">
        <button>How</button>
      </Link>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
    </nav>
  );
}

export default NavBar;
