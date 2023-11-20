import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
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
import GetAllRegion from "./ListLocations/getAllRegion";
import GetAllCountryByRegion from "./ListLocations/getAllCountryByRegion";
import GetAllProvinceByCountry from "./ListLocations/getAllProvinceByCountry";
import GetAllCityByProvince from "./ListLocations/getAllCityByProvince";

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
    postRegionResult,
    updateRegionResult,
    deleteRegionResult,
  } = useSelector((state) => state.masterReducer);

  const dispatch = useDispatch();

  const getCountryAllByRegionCode = (idRegion) => {
    dispatch(getCountry(idRegion));
  };

  const getProvinceAllByCountryId = (idCountry) => {
    dispatch(getProvince(idCountry));
  };

  const getCityAllByProvinceId = (idProvince) => {
    dispatch(getCity(idProvince));
  };

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch, postRegionResult, updateRegionResult, deleteRegionResult]);

  return (
    <>
      <div className="border border-black container-fluid pt-3 hp-mini">
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
          <GetAllRegion
            getRegionsResult={getRegionsResult}
            getRegionsLoading={getRegionsLoading}
            getRegionsError={getRegionsError}
            getCountryAllByRegionCode={getCountryAllByRegionCode}
          />

          <GetAllCountryByRegion
            getCountryResult={getCountryResult}
            getCountryLoading={getCountryLoading}
            getCountryError={getCountryError}
            getProvinceAllByCountryId={getProvinceAllByCountryId}
          />

          <GetAllProvinceByCountry
            getProvinceResult={getProvinceResult}
            getProvinceLoading={getProvinceLoading}
            getProvinceError={getProvinceError}
            getCityAllByProvinceId={getCityAllByProvinceId}
          />

          <GetAllCityByProvince
            getCityResult={getCityResult}
            getCityLoading={getCityLoading}
            getCityError={getCityError}
          />
        </div>
      </div>
    </>
  );
};

export default LocationsMaster;
