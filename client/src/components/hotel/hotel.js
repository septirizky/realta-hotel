import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCity, getHotel } from "../../actions/hotelAction";
import GetHotel from "./hotel/getHotel";

const Hotel = () => {
  const {
    getHotelResult,
    getHotelLoading,
    getHotelError,
    addHotelResult,
    updateHotelResult,
    deleteHotelResult,
    getCityResult,
  } = useSelector((state) => state.HotelReducer);

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotel({ keyword: search }));
    dispatch(getCity());
  }, [dispatch, addHotelResult, updateHotelResult, deleteHotelResult, search]);

  return (
    <div classNama="container">
      <h1>Hotel</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Hotel</li>
      </ol>
      <div className="content-utama-hotel">
        <div className="content-hotel">
          <GetHotel
            getHotelResult={getHotelResult}
            getHotelLoading={getHotelLoading}
            getHotelError={getHotelError}
            getCityResult={getCityResult}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
    </div>
  );
};
export default Hotel;
