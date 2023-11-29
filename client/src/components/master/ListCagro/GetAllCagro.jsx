import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import DetailCagro from "./modal/DetailCagro";
import AddCagro from "./modal/AddCagro";
import DeleteCagro from "./modal/DeleteCagro";
import EditCagro from "./modal/EditCagro";

const GetAllCagro = (props) => {
  const { getCagroResult, getCagroLoading, getCagroError, getPolicyResult } =
    props;

  const [showModalDetailCagro, setShowModalDetailCagro] = useState(false);

  const [showModalAddCagro, setShowModalAddCagro] = useState(false);

  const [showModalEditCagro, setShowModalEditCagro] = useState(false);

  const [showModalDeleteCagro, setShowModalDeleteCagro] = useState(false);

  const [cagroId, setCagroId] = useState();

  const [cagroName, setCagroName] = useState("");

  const [cagroType, setCagroType] = useState("");

  const [cagroDesc, setCagroDesc] = useState("");

  const [cagroIcon, setCagroIcon] = useState("");

  const [policyId, setPolicyId] = useState("");

  const [policyName, setPolicyName] = useState("");

  const [image, setImage] = useState("");

  const [preview, setPreview] = useState("");

  const showAddCagro = () => {
    setShowModalAddCagro(true);
  };

  const closeAddCagro = () => {
    setImage("");
    setPreview("");
    setShowModalAddCagro(false);
  };

  const showEditCagro = (
    cagroId,
    cagroName,
    cagroType,
    policyId,
    policyName,
    cagroDesc,
    cagroIcon
  ) => {
    setCagroId(cagroId);
    setCagroName(cagroName);
    setCagroType(cagroType);
    setPolicyId(policyId);
    setPolicyName(policyName);
    setCagroDesc(cagroDesc);
    setCagroIcon(cagroIcon);
    setShowModalEditCagro(true);
  };

  const closeEditCagro = () => {
    setCagroId("");
    setCagroName("");
    setCagroType("");
    setPolicyId("");
    setPolicyName("");
    setCagroDesc("");
    setCagroIcon("");
    setShowModalEditCagro(false);
  };

  const showDeleteCagro = (cagroId, cagroName) => {
    setCagroId(cagroId);
    setCagroName(cagroName);
    setShowModalDeleteCagro(true);
  };

  const closeDeleteCagro = () => {
    setCagroId("");
    setCagroName("");
    setShowModalDeleteCagro(false);
  };

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
              <button
                type="button"
                className="button-transparan"
                onClick={showAddCagro}
              >
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
                    <button
                      type="button"
                      className="button-update-transparan"
                      onClick={() =>
                        showEditCagro(
                          cagro.cagro_id,
                          cagro.cagro_name,
                          cagro.cagro_type,
                          cagro.policy_category_groups[0].poca_poli.poli_id,
                          cagro.policy_category_groups[0].poca_poli.poli_name,
                          cagro.cagro_description,
                          cagro.cagro_icon_url
                        )
                      }
                    >
                      <FaPencilAlt /> Edit
                    </button>
                    <button
                      type="button"
                      className="button-delete-transparan"
                      onClick={() =>
                        showDeleteCagro(cagro.cagro_id, cagro.cagro_name)
                      }
                    >
                      <FaTimes /> Delete
                    </button>
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

      <AddCagro
        showModalCagro={showModalAddCagro}
        handleCloseAddCagro={closeAddCagro}
        image={image}
        setImage={setImage}
        preview={preview}
        setPreview={setPreview}
        getPolicyResult={getPolicyResult}
      />

      <EditCagro
        showModalCagro={showModalEditCagro}
        handleCloseEditCagro={closeEditCagro}
        cagroId={cagroId}
        setCagroId={setCagroId}
        cagroName={cagroName}
        setCagroName={setCagroName}
        cagroType={cagroType}
        setCagroType={setCagroType}
        policyId={policyId}
        setPolicyId={setPolicyId}
        cagroDesc={cagroDesc}
        setCagroDesc={setCagroDesc}
        cagroIcon={cagroIcon}
        image={image}
        setImage={setImage}
        getPolicyResult={getPolicyResult}
      />

      <DeleteCagro
        showModalCagro={showModalDeleteCagro}
        handleCloseDeleteCagro={closeDeleteCagro}
        cagroId={cagroId}
        cagroName={cagroName}
      />
    </>
  );
};

export default GetAllCagro;
