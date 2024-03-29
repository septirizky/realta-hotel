import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import GetAllCagro from "./ListCagro/GetAllCagro";
import { useDispatch, useSelector } from "react-redux";
import { getCagro, getPolicy } from "../../actions/masterAction";

const CategoryGroup = () => {
  const {
    getPolicyResult,
    getCagroResult,
    getCagroLoading,
    getCagroError,
    postCagroResult,
    updateCagroResult,
    deleteCagroResult,
  } = useSelector((state) => state.masterReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCagro());
    dispatch(getPolicy());
  }, [dispatch, postCagroResult, updateCagroResult, deleteCagroResult]);

  return (
    <>
      <div className="border border-black container-fluid pt-3 mb-3">
        <nav className="bread-separator" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FaHome className="me-2" />
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/master">Master</Link>
            </li>
            <li className="breadcrumb-item active">Category Group</li>
          </ol>
        </nav>
      </div>
      <GetAllCagro
        getCagroResult={getCagroResult}
        getCagroLoading={getCagroLoading}
        getCagroError={getCagroError}
        getPolicyResult={getPolicyResult}
      />
    </>
  );
};

export default CategoryGroup;
