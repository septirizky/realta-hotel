import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import SidebarMaster from "./layout/sidebar/sidebarMaster";
import GetAllPolicy from "./ListPolicy/GetAllPolicy";
import { useDispatch, useSelector } from "react-redux";
import { getPolicy } from "../../actions/masterAction";

const Policy = () => {
  const {
    getPolicyResult,
    getPolicyLoading,
    getPolicyError,
    postPolicyResult,
    updatePolicyResult,
    deletePolicyResult,
  } = useSelector((state) => state.masterReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPolicy());
  }, [dispatch, postPolicyResult, updatePolicyResult, deletePolicyResult]);

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
            <li className="breadcrumb-item active">Policy</li>
          </ol>
        </nav>
      </div>
      <div className="content-utama-master">
        <SidebarMaster />
        <div className="content-master">
          <GetAllPolicy
            getPolicyResult={getPolicyResult}
            getPolicyLoading={getPolicyLoading}
            getPolicyError={getPolicyError}
          />
        </div>
      </div>
    </>
  );
};

export default Policy;
