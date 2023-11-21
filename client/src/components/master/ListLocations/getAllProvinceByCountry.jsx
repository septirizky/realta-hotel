import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import AddProvince from "./modal/AddProvince";
import EditProvince from "./modal/EditProvince";
import DeleteProv from "./modal/deleteProvince";

const GetAllProvinceByCountry = (props) => {
  const {
    countryId,
    countryName,
    setCountryId,
    setCountryName,
    getProvinceAllByCountryId,
    getProvinceResult,
    getProvinceLoading,
    getProvinceError,
    postProvResult,
    updateProvResult,
    deleteProvResult,
    getCityAllByProvinceId,
  } = props;

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModalAddProvince, setShowModalAddProvince] = useState(false);

  const [showModalEditProvince, setShowModalEditProvince] = useState(false);

  const [showModalDeleteProvince, setShowModalDeleteProvince] = useState(false);

  const [msg, setMsg] = useState(false);

  const [provinceName, setProvinceName] = useState("");

  const [provinceId, setProvinceId] = useState();

  const handleShowAddProvince = (countryId, countryName) => {
    setCountryId(countryId);
    setCountryName(countryName);
    setShowModalAddProvince(true);
  };

  const handleCloseAddProvince = () => {
    setMsg("");
    resetField("prov_name");
    setCountryName("");
    setCountryId();
    setShowModalAddProvince(false);
  };

  const handleShowEditProvince = (
    countryId,
    countryName,
    provinceId,
    provinceName
  ) => {
    setCountryId(countryId);
    setCountryName(countryName);
    setProvinceId(provinceId);
    setProvinceName(provinceName);
    setShowModalEditProvince(true);
  };

  const handleCloseEditProvince = () => {
    setMsg("");
    resetField("prov_name");
    setCountryName("");
    setCountryId();
    setShowModalEditProvince(false);
  };

  const handleShowDeleteProvince = (provinceId, provinceName) => {
    setProvinceId(provinceId);
    setProvinceName(provinceName);
    setShowModalDeleteProvince(true);
  };

  const handleCloseDeleteProvince = () => {
    setProvinceId("");
    setProvinceName("");
    setShowModalDeleteProvince(false);
  };

  useEffect(() => {
    if (countryId !== undefined) {
      getProvinceAllByCountryId(countryId, countryName);
    }
    // eslint-disable-next-line
  }, [postProvResult, updateProvResult, deleteProvResult]);

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
                  <button
                    type="button"
                    className="button-transparan"
                    onClick={() =>
                      handleShowAddProvince(countryId, countryName)
                    }
                  >
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
                      <button
                        type="button"
                        className="button-update-transparan"
                        onClick={() =>
                          handleShowEditProvince(
                            province.prov_country.country_id,
                            province.prov_country.country_name,
                            province.prov_id,
                            province.prov_name
                          )
                        }
                      >
                        <FaPencilAlt /> Edit
                      </button>
                      <button
                        type="button"
                        className="button-delete-transparan"
                        onClick={() =>
                          handleShowDeleteProvince(
                            province.prov_id,
                            province.prov_name
                          )
                        }
                      >
                        <FaTimes /> Delete
                      </button>
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

      <AddProvince
        showModalProvince={showModalAddProvince}
        handleCloseAddProvince={handleCloseAddProvince}
        msg={msg}
        setMsg={setMsg}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        countryId={countryId}
        countryName={countryName}
        errors={errors}
      />

      <EditProvince
        showModalProvince={showModalEditProvince}
        handleCloseEditProvince={handleCloseEditProvince}
        msg={msg}
        setMsg={setMsg}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        countryId={countryId}
        countryName={countryName}
        provinceId={provinceId}
        provinceName={provinceName}
        setProvinceName={setProvinceName}
        errors={errors}
      />

      <DeleteProv
        showModalProvince={showModalDeleteProvince}
        handleCloseDeleteProvince={handleCloseDeleteProvince}
        provinceId={provinceId}
        provinceName={provinceName}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default GetAllProvinceByCountry;
