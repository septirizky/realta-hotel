import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../master/css/locations.css";
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
    postCountryResult,
    updateCountryResult,
    deleteCountryResult,
    postProvResult,
    updateProvResult,
    deleteProvResult,
    postCityResult,
    updateCityResult,
    deleteCityResult,
  } = useSelector((state) => state.masterReducer);

  const dispatch = useDispatch();

  const [regionName, setRegionName] = useState("");

  const [regionId, setRegionId] = useState();

  const [countryName, setCountryName] = useState("");

  const [countryId, setCountryId] = useState();

  const [provinceName, setProvinceName] = useState("");

  const [provinceId, setProvinceId] = useState();

  const getCountryAllByRegionCode = (idRegion, regionName) => {
    setRegionId(idRegion);
    setRegionName(regionName);
    dispatch(getCountry(idRegion));
  };

  const getProvinceAllByCountryId = (idCountry, countryName) => {
    setCountryId(idCountry);
    setCountryName(countryName);
    dispatch(getProvince(idCountry));
  };

  const getCityAllByProvinceId = (idProvince, provinceName) => {
    setProvinceId(idProvince);
    setProvinceName(provinceName);
    dispatch(getCity(idProvince));
  };

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch, postRegionResult, updateRegionResult, deleteRegionResult]);

  return (
    <>
      <div className="border border-black container-fluid pt-3 mb-3">
        <nav className="bread-separator" aria-label="breadcrumb">
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

      <div className="mb-3">
        <GetAllRegion
          getRegionsResult={getRegionsResult}
          getRegionsLoading={getRegionsLoading}
          getRegionsError={getRegionsError}
          getCountryAllByRegionCode={getCountryAllByRegionCode}
        />
      </div>

      <div className="mb-3">
        <GetAllCountryByRegion
          regionId={regionId}
          regionName={regionName}
          setRegionName={setRegionName}
          setRegionId={setRegionId}
          getCountryAllByRegionCode={getCountryAllByRegionCode}
          getCountryResult={getCountryResult}
          getCountryLoading={getCountryLoading}
          getCountryError={getCountryError}
          postCountryResult={postCountryResult}
          updateCountryResult={updateCountryResult}
          deleteCountryResult={deleteCountryResult}
          getProvinceAllByCountryId={getProvinceAllByCountryId}
        />
      </div>

      <div className="mb-3">
        <GetAllProvinceByCountry
          countryId={countryId}
          countryName={countryName}
          setCountryId={setCountryId}
          setCountryName={setCountryName}
          getProvinceAllByCountryId={getProvinceAllByCountryId}
          getProvinceResult={getProvinceResult}
          getProvinceLoading={getProvinceLoading}
          getProvinceError={getProvinceError}
          postProvResult={postProvResult}
          updateProvResult={updateProvResult}
          deleteProvResult={deleteProvResult}
          getCityAllByProvinceId={getCityAllByProvinceId}
        />
      </div>

      <div className="mb-3">
        <GetAllCityByProvince
          provinceId={provinceId}
          provinceName={provinceName}
          setProvinceId={setProvinceId}
          setProvinceName={setProvinceName}
          getCityAllByProvinceId={getCityAllByProvinceId}
          getCityResult={getCityResult}
          getCityLoading={getCityLoading}
          getCityError={getCityError}
          postCityResult={postCityResult}
          updateCityResult={updateCityResult}
          deleteCityResult={deleteCityResult}
        />
      </div>
    </>
  );
};

export default LocationsMaster;
