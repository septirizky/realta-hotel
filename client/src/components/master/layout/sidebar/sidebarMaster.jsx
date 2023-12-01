import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../css/sidebarmaster.css";
import { FaLocationArrow, FaServicestack } from "react-icons/fa";
import { MdCategory, MdPolicy } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";

const SidebarMaster = () => {
  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading text-warning">Menu</div>
              <NavLink
                to="/master/locations"
                id="nav_dept"
                className="nav-link"
              >
                <div className="sb-nav-link-icon">
                  <FaLocationArrow size="26" />
                </div>
                Locations
              </NavLink>
              <NavLink to="/master/policy" className="nav-link">
                <div className="sb-nav-link-icon">
                  <MdPolicy size="26" />
                </div>
                Policy
              </NavLink>
              <NavLink to="/master/cagro" className="nav-link">
                <div className="sb-nav-link-icon">
                  <MdCategory size="26" />
                </div>
                Category Group
              </NavLink>
              <NavLink to="/master/priceitems" className="nav-link">
                <div className="sb-nav-link-icon">
                  <IoMdPricetag size="26" />
                </div>
                Price Items
              </NavLink>
              <NavLink to="/master/seta" className="nav-link">
                <div className="sb-nav-link-icon">
                  <FaServicestack size="26" />
                </div>
                Service Task
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
      <div id="layoutSidenav_content">
        <main className="p-4">
          <Outlet />
        </main>
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-center small">
              <div className="text-muted">
                Copyright &copy; Realta Hotel 2023
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SidebarMaster;
