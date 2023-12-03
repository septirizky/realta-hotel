import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuDetail } from "../../actions/restoaction";
// import { getMenu } from "../../actions/restoaction";
import GetMenuDetail from "./getMenudetail";
import {Link} from "react-router-dom"

const MenuDetail = () => {
  const {
    getMenuDetailResult,
    getMenuDetailLoading,
    getMenuDetailError,
    // getCityResult,
  } = useSelector((state) => state.restoReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuDetail());
  }, [dispatch]);

  return (
    <div classNama="container">
      <h1>Resto Menu</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Menu</li>
      </ol>
      <div className="content-utama-resto">
        <div className="content-resto">
          <Link to="/resto">Menu</Link>
          <GetMenuDetail
            getMenuDetailResult={getMenuDetailResult}
            getMenuDetailLoading={getMenuDetailLoading}
            getMenuDetailError={getMenuDetailError}
          />
        </div>
      </div>
    </div>
  );
};
export default MenuDetail;