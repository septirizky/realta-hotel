import React from "react";
import SidebarMaster from "../layout/sidebar/sidebarMaster";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Master = () => {
  return (
    <>
      <div className="border border-black container-fluid pt-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FaHome className="me-2" />
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Master</li>
          </ol>
        </nav>
      </div>
      <SidebarMaster />
      <div className="text-center my-3">
        <h1>Master Page</h1>
      </div>
    </>
  );
};

export default Master;
