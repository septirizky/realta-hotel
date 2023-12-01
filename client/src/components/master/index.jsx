import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Master = () => {
  return (
    <>
      <div className="border border-black container-fluid pt-3">
        <nav className="bread-separator" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FaHome className="me-2" />
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Master</li>
          </ol>
        </nav>
      </div>
      <div className="master-page text-center my-3">
        <h1>Master Page</h1>
      </div>
    </>
  );
};

export default Master;
