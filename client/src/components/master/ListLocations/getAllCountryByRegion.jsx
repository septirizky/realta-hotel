import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import AddCountry from "./modal/AddCountry";
import { useForm } from "react-hook-form";
import EditCountry from "./modal/EditCountry";
import DeleteCountry from "./modal/deleteCountry";

const GetAllCountryByRegion = (props) => {
  const {
    getCountryResult,
    getCountryLoading,
    getCountryError,
    getProvinceAllByCountryId,
    regionName,
    regionId,
    setRegionName,
    setRegionId,
    getCountryAllByRegionCode,
    postCountryResult,
    updateCountryResult,
    deleteCountryResult,
  } = props;

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModalAddCountry, setShowModalAddCountry] = useState(false);

  const [showModalEditCountry, setShowModalEditCountry] = useState(false);

  const [showModalDeleteCountry, setShowModalDeleteCountry] = useState(false);

  const [msg, setMsg] = useState("");

  const [countryName, setCountryName] = useState("");

  const [countryId, setCountryId] = useState();

  const handleCloseAddCountry = () => {
    setMsg("");
    resetField("country_name");
    setRegionName("");
    setRegionId();
    setShowModalAddCountry(false);
  };

  const handleCloseEditCountry = () => {
    setMsg("");
    resetField("country_name");
    setCountryName("");
    setCountryId("");
    setRegionName("");
    setRegionId("");
    setShowModalEditCountry(false);
  };

  const handleCloseDeleteCountry = () => {
    setCountryId("");
    setCountryName("");
    setShowModalDeleteCountry(false);
  };

  const handleShowAddCountry = (regionId, regionName) => {
    setRegionId(regionId);
    setRegionName(regionName);
    setShowModalAddCountry(true);
  };

  const handleShowEditCountry = (
    regionId,
    regionName,
    countryId,
    countryName
  ) => {
    setRegionId(regionId);
    setRegionName(regionName);
    setCountryId(countryId);
    setCountryName(countryName);
    setShowModalEditCountry(true);
  };

  const handleShowDeleteCountry = (countryId, countryName) => {
    setCountryId(countryId);
    setCountryName(countryName);
    setShowModalDeleteCountry(true);
  };

  useEffect(() => {
    if (regionId !== undefined) {
      getCountryAllByRegionCode(regionId, regionName);
    }
    // eslint-disable-next-line
  }, [postCountryResult, updateCountryResult, deleteCountryResult]);

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
                    onClick={() => handleShowAddCountry(regionId, regionName)}
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
                          getProvinceAllByCountryId(
                            e.target.value,
                            country.country_name
                          )
                        }
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{country.country_name}</td>
                    <td className="align-border-right">
                      <button
                        type="button"
                        className="button-update-transparan"
                        onClick={() =>
                          handleShowEditCountry(
                            country.country_region.region_code,
                            country.country_region.region_name,
                            country.country_id,
                            country.country_name
                          )
                        }
                      >
                        <FaPencilAlt /> Edit
                      </button>
                      <button
                        type="button"
                        className="button-delete-transparan"
                        onClick={() =>
                          handleShowDeleteCountry(
                            country.country_id,
                            country.country_name
                          )
                        }
                      >
                        <FaTimes /> Delete
                      </button>
                    </td>
                  </tr>
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

      <AddCountry
        showModalCountry={showModalAddCountry}
        handleCloseAddCountry={handleCloseAddCountry}
        msg={msg}
        setMsg={setMsg}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        regionName={regionName}
        regionId={regionId}
        errors={errors}
      />

      <EditCountry
        showModalCountry={showModalEditCountry}
        handleCloseEditCountry={handleCloseEditCountry}
        msg={msg}
        setMsg={setMsg}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        countryName={countryName}
        setCountryName={setCountryName}
        countryId={countryId}
        regionName={regionName}
        regionId={regionId}
        errors={errors}
      />

      <DeleteCountry
        showModalCountry={showModalDeleteCountry}
        handleCloseDeleteCountry={handleCloseDeleteCountry}
        countryId={countryId}
        countryName={countryName}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default GetAllCountryByRegion;
