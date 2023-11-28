import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import DetailCagro from "./modal/DetailCagro";

const GetAllCagro = (props) => {
  const { getCagroResult, getCagroLoading, getCagroError } = props;

  const [showModalDetailCagro, setShowModalDetailCagro] = useState(false);

  const [cagroId, setCagroId] = useState();

  const [cagroName, setCagroName] = useState("");

  const [cagroType, setCagroType] = useState("");

  const [cagroDesc, setCagroDesc] = useState("");

  const [cagroIcon, setCagroIcon] = useState("");

  const [policyName, setPolicyName] = useState("");

  const getShowDetailCagro = (
    cagroId,
    cagroName,
    cagroType,
    cagroDesc,
    cagroIcon,
    policyName
  ) => {
    setCagroId(cagroId);
    setCagroName(cagroName);
    setCagroType(cagroType);
    setCagroDesc(cagroDesc);
    setCagroIcon(cagroIcon);
    setPolicyName(policyName);
    setShowModalDetailCagro(true);
  };

  const closeDetailCagro = () => {
    setShowModalDetailCagro(false);
  };

  return (
    <>
      <div className="border border-black container-fluid py-3">
        Category Group
      </div>
      <table>
        <thead className="color-gray-thead">
          <tr>
            <th></th>
            <th>#</th>
            <th>Category Name</th>
            <th></th>
            <th>Type</th>
            <th className="align-border-right">
              <button type="button" className="button-transparan">
                <AiOutlinePlus /> Add
              </button>
            </th>
          </tr>
        </thead>
        {getCagroResult && getCagroResult ? (
          getCagroResult.map((cagro, index) => {
            return (
              <tbody key={cagro.cagro_id}>
                <tr>
                  <td>
                    <img
                      src={cagro.cagro_icon_url}
                      alt={cagro.cagro_icon}
                      width={30}
                      height={30}
                      className="rounded-circle"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{cagro.cagro_name}</td>
                  <td>
                    <button
                      type="button"
                      className="button-detail-transparan"
                      onClick={() =>
                        getShowDetailCagro(
                          cagro.cagro_id,
                          cagro.cagro_name,
                          cagro.cagro_type,
                          cagro.cagro_description,
                          cagro.cagro_icon_url,
                          cagro.policy_category_groups[0].poca_poli.poli_name
                        )
                      }
                    >
                      <MdKeyboardDoubleArrowRight />
                    </button>
                  </td>
                  <td>{cagro.cagro_type}</td>
                  <td className="align-border-right">
                    <FaPencilAlt /> Edit <FaTimes /> Delete
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : getCagroLoading ? (
          <tbody>
            <tr>
              <td colSpan={6}>Loading ...</td>
            </tr>
          </tbody>
        ) : getCagroError ? (
          <tbody>
            <tr>
              <td colSpan={6}>{getCagroError}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={6}>Data Category Group is Empty</td>
            </tr>
          </tbody>
        )}
      </table>

      <DetailCagro
        showModalCagro={showModalDetailCagro}
        handleCloseDetailCagro={closeDetailCagro}
        cagroId={cagroId}
        cagroName={cagroName}
        cagroType={cagroType}
        cagroDesc={cagroDesc}
        cagroIcon={cagroIcon}
        policyName={policyName}
      />
    </>
  );
};

export default GetAllCagro;
