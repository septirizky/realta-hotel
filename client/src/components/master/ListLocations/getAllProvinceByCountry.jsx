import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const GetAllProvinceByCountry = (props) => {
  const {
    getProvinceResult,
    getProvinceLoading,
    getProvinceError,
    getCityAllByProvinceId,
  } = props;

  return (
    <>
      {getProvinceResult ? (
        <>
          <div className="border border-black container-fluid py-3">
            Provinces
          </div>
          <table>
            <thead className="color-gray-thead">
              <tr>
                <th></th>
                <th>#</th>
                <th>Province Name</th>
                <th className="align-border-right">
                  <button type="button" className="button-transparan">
                    <AiOutlinePlus /> Add
                  </button>
                </th>
              </tr>
            </thead>
            {getProvinceResult && getProvinceResult ? (
              getProvinceResult.map((province, index) => (
                <tbody key={province.prov_id}>
                  <tr>
                    <td>
                      <label htmlFor={`prov_id${province.prov_id}`}></label>
                      <input
                        type="radio"
                        name="prov_id"
                        id={`prov_id${province.prov_id}`}
                        value={province.prov_id}
                        onChange={(e) => getCityAllByProvinceId(e.target.value)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{province.prov_name}</td>
                    <td className="align-border-right">
                      <FaPencilAlt /> Edit <FaTimes /> Delete
                    </td>
                  </tr>
                </tbody>
              ))
            ) : getProvinceLoading ? (
              <tbody>
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              </tbody>
            ) : getProvinceError ? (
              <tbody>
                <tr>
                  <td colSpan="4">{getProvinceError}</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="4">Data Province is Empty</td>
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

export default GetAllProvinceByCountry;
