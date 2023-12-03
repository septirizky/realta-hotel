import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import {
  FaDumbbell,
  FaMicrophone,
  FaShip,
  FaSpa,
  FaSurprise,
  FaSwimmingPool,
  FaUmbrellaBeach,
  FaWater,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LogoHotel from "./Image/Hotel.png";
import about1 from "./Image/a1.jpg";
import about2 from "./Image/a2.jpg";
import Hotel1 from "./Image/home1.jpg";
import Hotel2 from "./Image/home2.jpg";
import Hotel3 from "./Image/home3.jpg";
import Hotel4 from "./Image/home4.jpg";
import h1 from "./Image/r1.jpg";
import h2 from "./Image/r2.jpg";
import h3 from "./Image/r3.jpg";
import "./index.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  function img(anything) {
    document.querySelector(".slide").src = anything;
  }
  const token = Cookies.get("token") ? jwtDecode(Cookies.get("token")) : "";
  // const decode = jwtDecode();
  useEffect(() => {
    if (token) {
      console.log(token);
    }
  }, []);

  const Logout = () => {
    Swal.fire("Log Out Berhasil!");
    Cookies.remove("token");
    navigate("/logregguest");
  };
  const Login = () => {
    Swal.fire("Mohon Untuk Login!");
    navigate("/logregguest");
  };

  return (
    <div className="d-flex flex-column mb-3">
      <div className="p-2">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home" className="mr-auto">
            <img src={LogoHotel} alt="Logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto nav-links">
              <Nav.Link href="#home" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link href="/booking/hotel" className="nav-link-custom">
                Hotel
              </Nav.Link>
              <Nav.Link href="#resto" className="nav-link-custom">
                Resto
              </Nav.Link>
              <Nav.Link href="#about" className="nav-link-custom">
                About Us
              </Nav.Link>

              <Nav.Link href="#about" className="nav-link-custom">
                Account
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={<BsFillPersonFill color="#ffff" />}
                id="basic-nav-dropdown"
              >
                {!token ? (
                  <NavDropdown.Item onClick={Login}>Log In</NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <Link to={"http://localhost:3001/user/Profile"}>
                        Profile
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {/* ////////////////////////HOME\\\\\\\\\\\\\\\\\\\\ */}
      <div className="p-2">
        <div className="home" id="home">
          <div className="head_container">
            <div className="box">
              <div className="text">
                <h1>Wellcome.to.Realta.Hotel</h1>
                <h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.{" "}
                </h4>
                <button className="buttonmore">MORE INFO</button>
              </div>
            </div>
            <div className="image">
              <img src={Hotel1} className="slide" />
            </div>
            <div className="image_item">
              <img
                src={Hotel1}
                alt=""
                className="slide active"
                onClick={() => img(Hotel1)}
              />
              <img
                src={Hotel2}
                alt=""
                className="slide"
                onClick={() => img(Hotel2)}
              />
              <img
                src={Hotel3}
                alt=""
                className="slide"
                onClick={() => img(Hotel3)}
              />
              <img
                src={Hotel4}
                alt=""
                className="slide"
                onClick={() => img(Hotel4)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ---------   Book      --------- */}
      <div></div>

      {/* ======= About Us    ======== */}
      <div className="p-2">
        <div className="about top" id="about">
          <div className="konter flex">
            <div className="left">
              <div className="img">
                <img src={about1} alt="" className="image1" />
                <img src={about2} alt="" className="image2" />
              </div>
            </div>
            <div className="right">
              <div className="kepala">
                <h5>RAISING COMFOMRT TO THE HIGHEST LEVEL</h5>
                <h2>Welcome to Realta Hotel Resort</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.{" "}
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <button className="buttonmore btn1">READ MORE</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------wraper---------------- */}
      <div className="wrapper top">
        <div className="konter">
          <div className="text">
            <div className="cover-box">
              <h5>Our Amenities</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <div className="content">
                <div className="box flex">
                  <FaSwimmingPool /> {/* Ikon Swimming Pool */}
                  <span>Swimming pool</span>
                </div>
                <div className="box flex">
                  <FaDumbbell /> {/* Ikon Gym */}
                  <span>Gym & yoga</span>
                </div>
                <div className="box flex">
                  <FaSpa /> {/* Ikon Spa */}
                  <span>Spa & massage</span>
                </div>
                <div className="box flex">
                  <FaShip /> {/* Ikon Ship */}
                  <span>Boat Tours</span>
                </div>
                <div className="box flex">
                  <FaSurprise /> {/* Ikon Surfing */}
                  <span>Surfing Lessons</span>
                </div>
                <div className="box flex">
                  <FaMicrophone /> {/* Ikon Microphone */}
                  <span>Conference room</span>
                </div>
                <div className="box flex">
                  <FaWater /> {/* Ikon Water */}
                  <span>Diving & snorkeling</span>
                </div>
                <div className="box flex">
                  <FaUmbrellaBeach /> {/* Ikon Beach */}
                  <span>Private Beach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------wraper---------------- */}
      {/* ------------------rooms---------------- */}
      <div className="room top" id="room">
        <div className="konter">
          <div className="heading_top flex1">
            <div className="kepala">
              <h5>RAISING COMFORT TO THE HIGHEST LEVEL</h5>
              <h2>Rooms $ Suites</h2>
            </div>
            <div className="buttonviewall">
              <button className="btn2">VIEW ALL</button>
            </div>
          </div>

          <div className="content grid">
            <div className="box">
              <div className="img">
                <img src={h1} alt="" />
              </div>
              <div className="text">
                <h3>Superior Soble Rooms</h3>
                <p>
                  {" "}
                  <span>$</span>129 <span>/per night</span>{" "}
                </p>
              </div>
            </div>
            <div className="box">
              <div className="img">
                <img src={h2} alt="" />
              </div>
              <div className="text">
                <h3>Superior Soble Rooms</h3>
                <p>
                  {" "}
                  <span>$</span>129 <span>/per night</span>{" "}
                </p>
              </div>
            </div>
            <div className="box">
              <div className="img">
                <img src={h3} alt="" />
              </div>
              <div className="text">
                <h3>Superior Soble Rooms</h3>
                <p>
                  {" "}
                  <span>$</span>129 <span>/per night</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------rooms---------------- */}
      {/* ------- */}
    </div>
  );
};
