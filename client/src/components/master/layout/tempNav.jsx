import { Link, NavLink, Outlet } from "react-router-dom";
import { MdApartment } from "react-icons/md";

export const TempNav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <MdApartment className="text-warning fs-3 me-2" />
            <span className="fw-bold">Realta Hotel</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="http://localhost:4000/assets/img/no-images-user.png"
                    alt="default-user"
                    className="rounded-circle"
                    width={30}
                    height={30}
                  />{" "}
                  Admin
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/" className="dropdown-item">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/master" className="dropdown-item">
                      Master
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
