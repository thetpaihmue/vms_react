import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./SideNavigation.css";
import { FaBars } from "react-icons/fa";

const SideNavigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className={`sidenav ${isNavOpen ? "open" : ""}`}>
      <a className="toggle-btn" onClick={toggleNav}>
        <FaBars className="mb-2" />
      </a>
      <ul>
        <li>
          <Link to="/driverList" className="text-white small">
            Drivers
          </Link>
        </li>
        <li>
          <Link to="/vList" className="text-white small">
            Vehicles
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavigation;
