import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarMaster from "./layout/sidebar/sidebarMaster";
import { useDispatch, useSelector } from "react-redux";
import { getSeta } from "../../actions/masterAction";
import GetAllSeta from "./ListSeta/GetAllSeta";

const ServiceTask = () => {
  const {
    getSetaResult,
    getSetaLoading,
    getSetaError,
    postSetaResult,
    updateSetaResult,
    deleteSetaResult,
  } = useSelector((state) => state.masterReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeta());
  }, [dispatch, postSetaResult, updateSetaResult, deleteSetaResult]);

  return (
    <>
      <div className="border border-black container-fluid pt-3 hp-mini">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FaHome className="me-2" />
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/master">Master</Link>
            </li>
            <li className="breadcrumb-item active">Service Task</li>
          </ol>
        </nav>
      </div>
      <div className="content-utama-master">
        <SidebarMaster />
        <div className="content-master">
          <GetAllSeta
            getSetaResult={getSetaResult}
            getSetaLoading={getSetaLoading}
            getSetaError={getSetaError}
          />
        </div>
      </div>
    </>
  );
};

export default ServiceTask;
