import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const GetAllCityByProvince = (props) => {
  const { getCityResult, getCityLoading, getCityError } = props;
  return (
    <>
      {getCityResult ? (
        <>
          <div className="border border-black container-fluid py-3">City</div>
          <table>
            <thead className="color-gray-thead">
              <tr>
                <th></th>
                <th>#</th>
                <th>City Name</th>
                <th className="align-border-right">
                  <button type="button" className="button-transparan">
                    <AiOutlinePlus /> Add
                  </button>
                </th>
              </tr>
            </thead>
            {getCityResult && getCityResult ? (
              getCityResult.map((city, index) => (
                <tbody key={city.city_id}>
                  <tr>
                    <td>
                      <label htmlFor={`city_id${city.city_id}`}></label>
                      <input
                        type="radio"
                        name="city_id"
                        id={`city_id${city.city_id}`}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{city.city_name}</td>
                    <td className="align-border-right">
                      <FaPencilAlt /> Edit <FaTimes /> Delete
                    </td>
                  </tr>
                </tbody>
              ))
            ) : getCityLoading ? (
              <tbody>
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              </tbody>
            ) : getCityError ? (
              <tbody>
                <tr>
                  <td colSpan="4">{getCityError}</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="4">Data City is Empty</td>
                </tr>
              </tbody>
            )}
          </table>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default GetAllCityByProvince;
