import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import AddCity from "./modal/AddCity";
import EditCity from "./modal/EditCity";
import DeleteCity from "./modal/deleteCity";

const GetAllCityByProvince = (props) => {
  const {
    provinceId,
    provinceName,
    setProvinceId,
    setProvinceName,
    getCityAllByProvinceId,
    getCityResult,
    getCityLoading,
    getCityError,
    postCityResult,
    updateCityResult,
    deleteCityResult,
  } = props;

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModalAddCity, setShowModalAddCity] = useState(false);

  const [showModalEditCity, setShowModalEditCity] = useState(false);

  const [showModalDeleteCity, setShowModalDeleteCity] = useState(false);

  const [msg, setMsg] = useState(false);

  const [cityName, setCityName] = useState("");

  const [cityId, setCityId] = useState();

  const handleShowAddCity = (provinceId, provinceName) => {
    setProvinceId(provinceId);
    setProvinceName(provinceName);
    setShowModalAddCity(true);
  };

  const handleCloseAddCity = () => {
    setMsg("");
    resetField("city_name");
    setProvinceId();
    setProvinceName("");
    setShowModalAddCity(false);
  };

  const handleShowEditCity = (provinceId, provinceName, cityId, cityName) => {
    setProvinceId(provinceId);
    setProvinceName(provinceName);
    setCityId(cityId);
    setCityName(cityName);
    setShowModalEditCity(true);
  };

  const handleCloseEditCity = () => {
    setMsg("");
    resetField("city_name");
    setProvinceName("");
    setProvinceId();
    setShowModalEditCity(false);
  };

  const handleShowDeleteCity = (cityId, cityName) => {
    setCityId(cityId);
    setCityName(cityName);
    setShowModalDeleteCity(true);
  };

  const handleCloseDeleteCity = () => {
    setCityId("");
    setCityName("");
    setShowModalDeleteCity(false);
  };

  useEffect(() => {
    if (provinceId !== undefined) {
      getCityAllByProvinceId(provinceId, provinceName);
    }
    // eslint-disable-next-line
  }, [postCityResult, updateCityResult, deleteCityResult]);

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
                  <button
                    type="button"
                    className="button-transparan"
                    onClick={() => handleShowAddCity(provinceId, provinceName)}
                  >
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
                      <button
                        type="button"
                        className="button-update-transparan"
                        onClick={() =>
                          handleShowEditCity(
                            city.city_province.prov_id,
                            city.city_province.prov_name,
                            city.city_id,
                            city.city_name
                          )
                        }
                      >
                        <FaPencilAlt /> Edit
                      </button>
                      <button
                        type="button"
                        className="button-delete-transparan"
                        onClick={() =>
                          handleShowDeleteCity(city.city_id, city.city_name)
                        }
                      >
                        <FaTimes /> Delete
                      </button>
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

      <AddCity
        showModalCity={showModalAddCity}
        handleCloseAddCity={handleCloseAddCity}
        msg={msg}
        setMsg={setMsg}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        provinceId={provinceId}
        provinceName={provinceName}
        errors={errors}
      />

      <EditCity
        showModalCity={showModalEditCity}
        handleCloseEditCity={handleCloseEditCity}
        msg={msg}
        setMsg={setMsg}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        provinceId={provinceId}
        provinceName={provinceName}
        cityId={cityId}
        cityName={cityName}
        setCityName={setCityName}
        errors={errors}
      />

      <DeleteCity
        showModalCity={showModalDeleteCity}
        handleCloseDeleteCity={handleCloseDeleteCity}
        cityId={cityId}
        cityName={cityName}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default GetAllCityByProvince;
