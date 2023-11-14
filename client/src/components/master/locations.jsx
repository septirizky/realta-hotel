import React, { useEffect } from "react";
import { FaHome, FaPencilAlt, FaTimes } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import SidebarMaster from "./layout/sidebar/sidebarMaster";
import "../master/css/locations.css";
import "../master/css/custom.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCity,
  getCountry,
  getProvince,
  getRegions,
} from "../../actions/masterAction";

const LocationsMaster = () => {
  const {
    getRegionsResult,
    getRegionsLoading,
    getRegionsError,
    getCountryResult,
    getCountryLoading,
    getCountryError,
    getProvinceResult,
    getProvinceLoading,
    getProvinceError,
    getCityResult,
    getCityLoading,
    getCityError,
  } = useSelector((state) => state.masterReducer);

  const getCountryAllByRegionCode = (idRegion) => {
    dispatch(getCountry(idRegion));
  };

  const getProvinceAllByCountryId = (idCountry) => {
    dispatch(getProvince(idCountry));
  };

  const getCityAllByProvinceId = (idProvince) => {
    dispatch(getCity(idProvince));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  return (
    <>
      <div className="border border-black container-fluid pt-3 fixed-top hp-mini">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FaHome className="me-2" />
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/master">Master</Link>
            </li>
            <li className="breadcrumb-item active">Locations</li>
          </ol>
        </nav>
      </div>
      <div className="content-utama-master">
        <SidebarMaster />
        <div className="content-master ">
          <div className="border border-black container-fluid py-3">
            Regions
          </div>
          <table>
            <thead className="color-gray-thead">
              <tr>
                <th></th>
                <th>#</th>
                <th>Region Name</th>
                <th className="align-border-right">
                  <button
                    type="button"
                    className="button-transparan"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalAddRegion"
                  >
                    <AiOutlinePlus /> Add
                  </button>
                </th>
              </tr>
            </thead>
            {getRegionsResult && getRegionsResult ? (
              getRegionsResult.map((region, index) => {
                return (
                  <tbody key={region.region_code}>
                    <tr>
                      <td>
                        <input
                          type="radio"
                          name="region_code"
                          value={region.region_code}
                          onChange={(e) =>
                            getCountryAllByRegionCode(e.target.value)
                          }
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{region.region_name}</td>
                      <td className="align-border-right">
                        <FaPencilAlt /> Edit <FaTimes /> Delete
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : getRegionsLoading ? (
              <tbody>
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              </tbody>
            ) : getRegionsError ? (
              <tbody>
                <tr>
                  <td colSpan="4">{getRegionsError}</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="4">Data Region is Empty</td>
                </tr>
              </tbody>
            )}
          </table>

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
                          <label htmlFor="country_id"></label>
                          <input
                            type="radio"
                            name="country_id"
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
                                      htmlFor="region_name"
                                      className="col-form-label"
                                    >
                                      Region Name
                                    </label>
                                  </div>
                                  <div className="col-auto">
                                    <input
                                      type="text"
                                      id="region_name"
                                      className="form-control"
                                      value={country.country_region.region_name}
                                      readOnly
                                    />
                                    <input
                                      type="hidden"
                                      id="country_region_id"
                                      className="form-control"
                                      value={country.country_region.region_code}
                                    />
                                  </div>
                                </div>
                                <div className="row g-2 align-items-center">
                                  <div className="col-auto">
                                    <label
                                      htmlFor="region_name"
                                      className="col-form-label"
                                    >
                                      Country Name
                                    </label>
                                  </div>
                                  <div className="col-auto">
                                    <input
                                      type="text"
                                      id="region_name"
                                      className="form-control"
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
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
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
                {getCountryResult && getProvinceResult ? (
                  getProvinceResult.map((province, index) => (
                    <tbody key={province.prov_id}>
                      <tr>
                        <td>
                          <label htmlFor="prov_id"></label>
                          <input
                            type="radio"
                            name="prov_id"
                            id="prov_id"
                            value={province.prov_id}
                            onChange={(e) =>
                              getCityAllByProvinceId(e.target.value)
                            }
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

          {getCityResult ? (
            <>
              <div className="border border-black container-fluid py-3">
                City
              </div>
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
                          <label htmlFor="city_id"></label>
                          <input type="radio" name="city_id" id="city_id" />
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
        </div>

        {/* Modal Add Region */}
        <div
          className="modal fade"
          id="exampleModalAddRegion"
          tabIndex="-1"
          aria-labelledby="exampleModalAddRegionLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="exampleModalAddRegionLabel"
                >
                  Add Region
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
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="region_name" className="col-form-label">
                        Region Name
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        id="region_name"
                        className="form-control"
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
      </div>
    </>
  );
};

export default LocationsMaster;
