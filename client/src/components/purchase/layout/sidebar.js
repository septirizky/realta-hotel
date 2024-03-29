/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, Outlet, useLocation } from "react-router-dom";
import "../css/style.css";
import { BsPersonCircle } from "react-icons/bs";
import { FaShop } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { MdOutlineBorderColor } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdApartment } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";

export const PurchaseLayout = () => {
  const state = useSelector((state) => state.handleCart);
  console.log(state, "4567");
  const pathname = useLocation();
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
    <body className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3" href="/">
          <MdApartment size="26" className="text-warning" /> Realta Hotel
        </a>
        <button
          className={`btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 yellow-hover ${
            burgerActive ? "yellow-button" : ""
          }`}
          id="sidebarToggle"
          href="#!"
          onClick={(e) => sidebarToggler(e)}
        >
          <RxHamburgerMenu size="26" />
        </button>
        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>

        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle yellow-hover"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsPersonCircle className="" size="26" />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="#!">
                  Profile <CgProfile />
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/Purchase/cart">
                  Cart ({state.length}) <FaCartPlus />
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  Logout <IoMdLogOut />
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading text-warning">Menu</div>
                <Link
                  to="/Purchase/vendor"
                  id="nav_dept"
                  className={`nav-link ${
                    pathname.pathname === "/Purchase/vendor" ? "active" : ""
                  }`}
                >
                  <div className="sb-nav-link-icon">
                    <FaShop />
                  </div>
                  Vendor
                </Link>
                <Link
                  to="/Purchase/stock"
                  className={`nav-link ${
                    pathname.pathname === "/Purchase/stock" ? "active" : ""
                  }`}
                  href=""
                >
                  <div className="sb-nav-link-icon">
                    <FaBoxOpen />
                  </div>
                  Stock
                </Link>
                <Link
                  to="/Purchase/purchaseorder"
                  className={`nav-link ${
                    pathname.pathname === "/Purchase/purchaseorder"
                      ? "active"
                      : ""
                  }`}
                  href=""
                >
                  <div className="sb-nav-link-icon">
                    <MdOutlineBorderColor />
                  </div>
                  Purchase Order
                </Link>

                <Link
                  to="/Purchase/gallery"
                  className={`nav-link ${
                    pathname.pathname === "/hr/work-order" ? "active" : ""
                  }`}
                  href=""
                >
                  <div className="sb-nav-link-icon">
                    <RiGalleryFill />
                  </div>
                  Galery
                </Link>
              </div>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content" style={{ backgroundColor: "#eee" }}>
          <main className="">
            <Outlet />
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-center small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2023
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </body>
  );
};
