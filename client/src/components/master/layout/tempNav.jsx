import { Link, NavLink } from "react-router-dom";
import "../css/styles.css";
import "../css/masterStyles.css";
import { MdApartment } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import SidebarMaster from "./sidebar/sidebarMaster";

export const TempNav = () => {
  const [burgerActive, setBurgerActive] = useState(false);

  const sidebarToggler = (event) => {
    event.preventDefault();
    setBurgerActive(!burgerActive);
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };

  useEffect(() => {}, [burgerActive]);

  return (
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand ps-3" to="/">
          <MdApartment size="26" className="text-warning" />
          Realta Hotel
        </Link>
        <button
          className={`btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 yellow-hover ${
            burgerActive ? "yellow-button" : ""
          }`}
          id="sidebarToggle"
          onClick={(e) => sidebarToggler(e)}
        >
          <RxHamburgerMenu size="26" />
        </button>
        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle yellow-hover"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsPersonCircle className="" size="26" />
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link className="dropdown-item">Profile</Link>
                <NavLink to="/master" className="dropdown-item">
                  Master
                </NavLink>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item">Logout</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <SidebarMaster />
    </div>
  );
};
