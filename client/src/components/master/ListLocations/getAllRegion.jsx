import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import AddRegion from "./modal/AddRegion";
import { useForm } from "react-hook-form";
import DeleteRegion from "./modal/deleteRegion";
import EditRegion from "./modal/EditRegion";

const GetAllRegion = (props) => {
  const {
    getRegionsResult,
    getRegionsLoading,
    getRegionsError,
    getCountryAllByRegionCode,
  } = props;

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModalAddRegion, setShowModalAddRegion] = useState(false);

  const [showModalEditRegion, setShowModalEditRegion] = useState(false);

  const [showModalDeleteRegion, setShowModalDeleteRegion] = useState(false);

  const [msg, setMsg] = useState("");

  const [regionName, setRegionName] = useState("");

  const [regionCode, setregionCode] = useState();

  const handleShowAddRegion = () => {
    setShowModalAddRegion(true);
  };

  const handleCloseAddRegion = () => {
    setMsg("");
    resetField("region_name");
    setShowModalAddRegion(false);
  };

  const handleShowEditRegion = (region, regionId) => {
    setRegionName(region);
    setregionCode(regionId);
    setShowModalEditRegion(true);
  };

  const handleCloseEditRegion = () => {
    setMsg("");
    resetField("region_name");
    setShowModalEditRegion(false);
  };

  const handleShowDeleteRegion = (region, regionId) => {
    setRegionName(region);
    setregionCode(regionId);
    setShowModalDeleteRegion(true);
  };

  const handleCloseDeleteRegion = () => {
    setShowModalDeleteRegion(false);
  };

  return (
    <>
      <div className="border border-black container-fluid py-3">Regions</div>
      <table className="master-table">
        <thead className="color-gray-thead">
          <tr>
            <th className="master-thead"></th>
            <th className="master-thead">#</th>
            <th className="master-thead">Region Name</th>
            <th className="align-border-right">
              <button
                type="button"
                className="button-transparan"
                onClick={handleShowAddRegion}
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
                  <td className="master-tdata">
                    <input
                      type="radio"
                      name="region_code"
                      id={`region_code${region.region_code}`}
                      value={region.region_code}
                      onChange={(e) =>
                        getCountryAllByRegionCode(
                          e.target.value,
                          region.region_name
                        )
                      }
                    />
                  </td>
                  <td className="master-tdata">{index + 1}</td>
                  <td className="master-tdata">{region.region_name}</td>
                  <td className="align-border-right">
                    <button
                      type="button"
                      className="button-update-transparan"
                      onClick={() =>
                        handleShowEditRegion(
                          region.region_name,
                          region.region_code
                        )
                      }
                    >
                      <FaPencilAlt /> Edit
                    </button>
                    <button
                      type="button"
                      className="button-delete-transparan"
                      onClick={() =>
                        handleShowDeleteRegion(
                          region.region_name,
                          region.region_code
                        )
                      }
                    >
                      <FaTimes /> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : getRegionsLoading ? (
          <tbody>
            <tr>
              <td colSpan="4" className="master-tdata">
                Loading...
              </td>
            </tr>
          </tbody>
        ) : getRegionsError ? (
          <tbody>
            <tr>
              <td colSpan="4" className="master-tdata">
                {getRegionsError}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="4" className="master-tdata">
                Data Region is Empty
              </td>
            </tr>
          </tbody>
        )}
      </table>

      <AddRegion
        showModalRegion={showModalAddRegion}
        handleCloseAddRegion={handleCloseAddRegion}
        msg={msg}
        setMsg={setMsg}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        errors={errors}
      />

      <EditRegion
        showModalRegion={showModalEditRegion}
        handleCloseEditRegion={handleCloseEditRegion}
        msg={msg}
        setMsg={setMsg}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        errors={errors}
        regionName={regionName}
        setRegionName={setRegionName}
        regionId={regionCode}
      />

      <DeleteRegion
        showModalRegion={showModalDeleteRegion}
        handleCloseDeleteRegion={handleCloseDeleteRegion}
        regionName={regionName}
        regionId={regionCode}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default GetAllRegion;
