import {Link, Outlet, useLocation} from "react-router-dom";
import "./css/styles.css";
import {BsPersonCircle} from "react-icons/bs";
import {RiHotelLine, RiHotelBedLine} from "react-icons/ri";
import {MdApartment, MdHistory} from "react-icons/md";
import {RxHamburgerMenu} from "react-icons/rx";
import {useEffect, useState} from "react";

export const HotelSidebar = () => {
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
    useEffect(() => {
    }, [burgerActive]);
    return (
        <body className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="#">
                <MdApartment size="26" className="text-warning"/> Realta Hotel
            </a>
            <button
                className={`btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 yellow-hover ${
                    burgerActive ? "yellow-button" : ""
                }`}
                id="sidebarToggle"
                href="#!"
                onClick={(e) => sidebarToggler(e)}
            >
                <RxHamburgerMenu size="26"/>
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
                        <BsPersonCircle className="" size="26"/>
                    </a>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdown"
                    >
                        <li>
                            <a className="dropdown-item" href="#!">
                                Profile
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#!">
                                Logout
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
                                to="/hotel"
                                id="nav_hotel"
                                className={`nav-link ${
                                    pathname.pathname === "/hotel" ? "active" : ""
                                }`}
                            >
                                <div className="sb-nav-link-icon">
                                    <RiHotelLine size="26"/>
                                </div>
                                Hotel
                            </Link>
                            {/*<Link*/}
                            {/*    to="/hotel/facilities"*/}
                            {/*    className={`nav-link ${*/}
                            {/*        pathname.pathname === "/hotel/faci/:faci_hotel_id"*/}
                            {/*            ? "active"*/}
                            {/*            : ""*/}
                            {/*    }`}*/}
                            {/*    href=""*/}
                            {/*>*/}
                            {/*    <div className="sb-nav-link-icon">*/}
                            {/*        <RiHotelBedLine size="26"/>*/}
                            {/*    </div>*/}
                            {/*    Facilities*/}
                            {/*</Link>*/}
                            <Link
                                to="/hotel/facility_history"
                                className={`nav-link ${
                                    pathname.pathname === "/hotel/facility_history"
                                        ? "active"
                                        : ""
                                }`}
                                href=""
                            >
                                <div className="sb-nav-link-icon">
                                    <MdHistory size="26"/>
                                </div>
                                History
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main className="p-4">
                    <Outlet/>
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
