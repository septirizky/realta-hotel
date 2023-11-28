import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategory, getFacilities } from "../../actions/facilitiesAction";
import GetFacilities from "./facilities/getFacilities";

const Facilities = () => {
  const {
    getFaciResult,
    getFaciLoading,
    getFaciError,
    addFaciResult,
    updateFaciResult,
    deleteFaciResult,
    getCategoryResult,
  } = useSelector((state) => state.HotelReducer);

  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(getFacilities(params.hotel_id));
    dispatch(getCategory());
    // eslint-disable-next-line
  }, [dispatch, addFaciResult, updateFaciResult, deleteFaciResult]);
  return (
    <div classNama="container">
      <h1>Facilities</h1>
      <nav className="bread-divider" aria-label="breadcrumb">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <Link to="/hotel">Hotel</Link>
          </li>
          <li class="breadcrumb-item active">Facilities</li>
        </ol>
      </nav>
      <div className="content-utama-hotel">
        <div className="content-hotel">
          <GetFacilities
            getFaciResult={getFaciResult}
            getFaciLoading={getFaciLoading}
            getFaciError={getFaciError}
            getCategoryResult={getCategoryResult}
            params_hotel_id={params.hotel_id}
          />
        </div>
      </div>
    </div>
  );
};

export default Facilities;
