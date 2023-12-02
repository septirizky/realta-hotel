import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getFacilityHistory } from "../../actions/facilitiesAction";

const FacilityHistory = () => {
  const { getFaciHisResult, getFaciHisLoading, getFaciHisError } = useSelector(
    (state) => state.HotelReducer
  );

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFacilityHistory());
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <div classNama="container">
      <h1>Facility History</h1>
      <nav className="bread-divider" aria-label="breadcrumb">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <Link to="/hotel">Hotel</Link>
          </li>
          <li class="breadcrumb-item active">Facility History</li>
        </ol>
      </nav>
      <div className="content-utama-hotel">
        <div className="content-hotel">
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>Id</th>
                <th>Faci Id</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Low Price</th>
                <th>High Price</th>
                <th>Rate Price</th>
                <th>Discount</th>
                <th>Tax</th>
              </tr>
            </thead>
            <tbody>
              {getFaciHisResult ? (
                getFaciHisResult.map((facilityHistory) => {
                  const {
                    faph_id,
                    faph_faci_id,
                    faph_startdate,
                    faph_enddate,
                    faph_low_price,
                    faph_high_price,
                    faph_rate_price,
                    faph_discount,
                    faph_tax_rate,
                  } = facilityHistory;
                  return (
                    <tr key={faph_id}>
                      <td>{faph_id}</td>
                      <td>{faph_faci_id}</td>
                      <td>{format(new Date(faph_startdate), "ii LLL YYY")}</td>
                      <td>{format(new Date(faph_enddate), "ii LLL YYY")}</td>
                      <td>{formatRupiah(faph_low_price)} </td>
                      <td>{formatRupiah(faph_high_price)}</td>
                      <td>{formatRupiah(faph_rate_price)}</td>
                      <td>{faph_discount} %</td>
                      <td>{faph_tax_rate} %</td>
                    </tr>
                  );
                })
              ) : getFaciHisLoading ? (
                <p>Loading . . .</p>
              ) : (
                <p>{getFaciHisError ? getFaciHisError : "Data Kosong"}</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacilityHistory;
