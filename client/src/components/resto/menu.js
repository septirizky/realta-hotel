import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../actions/restoaction";
import GetResto from "./getResto";

const Resto = () => {
  const {
    getMenuResult,
    getMenuLoading,
    getMenuError,
    addMenuResult,
    updateMenuResult,
    deleteMenuResult,
    // getCityResult,
  } = useSelector((state) => state.restoReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch, addMenuResult, updateMenuResult, deleteMenuResult]);

  return (
    <div classNama="container">
      <h1>Resto</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Menu</li>
      </ol>
      <div className="content-utama-resto">
        <div className="content-resto">
          <GetResto
            getMenuResult={getMenuResult}
            getMenuLoading={getMenuLoading}
            getMenuError={getMenuError}
          />
        </div>
      </div>
    </div>
  );
};
export default Resto;