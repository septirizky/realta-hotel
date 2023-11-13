import React from "react";
import { FaHome, FaPencilAlt, FaTimes } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import SidebarMaster from "../layout/sidebar/sidebarMaster";
import "../../css/locations.css";

const LocationsMaster = () => {
  return (
    <>
      <div className="border border-black container-fluid pt-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FaHome className="me-2" />
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/master">Master</Link>
            </li>
            <li className="breadcrumb-item active">Locations</li>
          </ol>
        </nav>
      </div>
      <SidebarMaster />
      <div className="content-master">
        <div className="border border-black container-fluid py-3">Regions</div>
        <table>
          <thead className="color-gray-thead">
            <tr>
              <th></th>
              <th>#</th>
              <th>Region Name</th>
              <th className="align-border-right">
                <button
                  type="button"
                  className="button-transparan"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalAddRegion"
                >
                  <AiOutlinePlus /> Add
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <form>
                  <input type="radio" id="region_id" />
                </form>
              </td>
              <td>1</td>
              <td>Mark</td>
              <td className="align-border-right">
                <FaPencilAlt /> Edit <FaTimes /> Delete
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal Add Region */}
      <div
        className="modal fade"
        id="exampleModalAddRegion"
        tabIndex="-1"
        aria-labelledby="exampleModalAddRegionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalAddRegionLabel">
                Add Region
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="region_name" className="col-form-label">
                      Region Name
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="text"
                      id="region_name"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationsMaster;
