import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const GetAllCountryByRegion = (props) => {
  const {
    getCountryResult,
    getCountryLoading,
    getCountryError,
    getProvinceAllByCountryId,
  } = props;
  return (
    <>
      {getCountryResult ? (
        <>
          <div className="border border-black container-fluid py-3">
            Countries
          </div>
          <table>
            <thead className="color-gray-thead">
              <tr>
                <th></th>
                <th>#</th>
                <th>Country Name</th>
                <th className="align-border-right">
                  <button
                    type="button"
                    className="button-transparan"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalAddCountry"
                  >
                    <AiOutlinePlus /> Add
                  </button>
                </th>
              </tr>
            </thead>
            {getCountryResult && getCountryResult ? (
              getCountryResult.map((country, index) => (
                <tbody key={country.country_id}>
                  <tr>
                    <td>
                      <label
                        htmlFor={`country_id${country.country_id}`}
                      ></label>
                      <input
                        type="radio"
                        name="country_id"
                        id={`country_id${country.country_id}`}
                        value={country.country_id}
                        onChange={(e) =>
                          getProvinceAllByCountryId(e.target.value)
                        }
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{country.country_name}</td>
                    <td className="align-border-right">
                      <FaPencilAlt /> Edit <FaTimes /> Delete
                    </td>
                  </tr>

                  {/* Modal Add Country */}
                  <div
                    className="modal fade"
                    id="exampleModalAddCountry"
                    tabIndex="-1"
                    aria-labelledby="exampleModalAddCountryLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalAddCountryLabel"
                          >
                            Add Country
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form>
                          <div className="modal-body">
                            <div className="row g-2 align-items-center">
                              <div className="col-auto">
                                <label
                                  htmlFor={`country_region_name${country.country_region.region_name}`}
                                  className="col-form-label"
                                >
                                  Region Name
                                </label>
                              </div>
                              <div className="col-auto">
                                <input
                                  type="text"
                                  id={`country_region_name${country.country_region.region_name}`}
                                  className="form-control"
                                  value={country.country_region.region_name}
                                  readOnly
                                />
                                <input
                                  type="hidden"
                                  id={`country_region_id${country.country_region.region_code}`}
                                  className="form-control"
                                  value={country.country_region.region_code}
                                />
                              </div>
                            </div>
                            <div className="row g-2 align-items-center">
                              <div className="col-auto">
                                <label
                                  htmlFor="country_name"
                                  className="col-form-label"
                                >
                                  Country Name
                                </label>
                              </div>
                              <div className="col-auto">
                                <input
                                  type="text"
                                  id="country_name"
                                  className="form-control"
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button type="button" className="btn btn-primary">
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </tbody>
              ))
            ) : getCountryLoading ? (
              <tbody>
                <tr>
                  <td colSpan="4">Loading..</td>
                </tr>
              </tbody>
            ) : getCountryError ? (
              <tbody>
                <tr>
                  <td colSpan="4">{getCountryError}</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="4">Data Country is Empty</td>
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

export default GetAllCountryByRegion;
