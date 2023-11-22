import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import "../css/policy.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import DetailPolicy from "./modal/DetailPolicy";
import { useForm } from "react-hook-form";
import AddPolicy from "./modal/AddPolicy";
import EditPolicy from "./modal/EditPolicy";
import DeletePolicy from "./modal/DeletePolicy";

const GetAllPolicy = (props) => {
  const { getPolicyResult, getPolicyLoading, getPolicyError } = props;

  const { register, resetField, handleSubmit } = useForm();

  const [showModalDetailPolicy, setShowModalDetailPolicy] = useState(false);

  const [showModalAddPolicy, setShowModalAddPolicy] = useState(false);

  const [showModalEditPolicy, setShowModalEditPolicy] = useState(false);

  const [showModalDeletePolicy, setShowModalDeletePolicy] = useState(false);

  const [policyId, setPolicyId] = useState();

  const [policyName, setPolicyName] = useState("");

  const [policyDescription, setPolicyDescription] = useState("");

  const showAddPolicy = () => {
    setShowModalAddPolicy(true);
  };

  const closeAddPolicy = () => {
    resetField("poli_name");
    resetField("poli_description");
    setShowModalAddPolicy(false);
  };

  const showEditPolicy = (policyName, policyDesc, policyId) => {
    setPolicyId(policyId);
    setPolicyName(policyName);
    setPolicyDescription(policyDesc);
    setShowModalEditPolicy(true);
  };

  const closeEditPolicy = () => {
    resetField("poli_id");
    resetField("poli_name");
    resetField("poli_description");
    setShowModalEditPolicy(false);
  };

  const showDeletePolicy = (policyName, policyId) => {
    setPolicyName(policyName);
    setPolicyId(policyId);
    setShowModalDeletePolicy(true);
  };

  const closeDeletePolicy = () => {
    setShowModalDeletePolicy(false);
  };

  const getShowDetailPolicy = (policyId, policyName, policyDescription) => {
    setPolicyId(policyId);
    setPolicyName(policyName);
    setPolicyDescription(policyDescription);
    setShowModalDetailPolicy(true);
  };

  const closeDetailPolicy = () => {
    setShowModalDetailPolicy(false);
  };

  return (
    <>
      <div className="border border-black container-fluid py-3">Policy</div>
      <table>
        <thead className="color-gray-thead">
          <tr>
            <th></th>
            <th>#</th>
            <th className="text-center">Policy Name</th>
            <th className="align-border-right">
              <button
                type="button"
                className="button-transparan"
                onClick={showAddPolicy}
              >
                <AiOutlinePlus /> Add
              </button>
            </th>
          </tr>
        </thead>
        {getPolicyResult && getPolicyResult ? (
          getPolicyResult.map((policy, index) => {
            return (
              <tbody key={policy.poli_id}>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="poli_id"
                      id={`poli_id${policy.poli_id}`}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{policy.poli_name}</td>
                  <td className="align-border-right">
                    <span className="align-border-left">
                      <button
                        type="button"
                        className="button-detail-transparan"
                        onClick={() =>
                          getShowDetailPolicy(
                            policy.poli_id,
                            policy.poli_name,
                            policy.poli_description
                          )
                        }
                      >
                        <MdKeyboardDoubleArrowRight />
                      </button>
                    </span>
                    <button
                      type="button"
                      className="button-update-transparan"
                      onClick={() =>
                        showEditPolicy(
                          policy.poli_name,
                          policy.poli_description,
                          policy.poli_id
                        )
                      }
                    >
                      <FaPencilAlt /> Edit
                    </button>
                    <button
                      type="button"
                      className="button-delete-transparan"
                      onClick={() =>
                        showDeletePolicy(policy.poli_name, policy.poli_id)
                      }
                    >
                      <FaTimes /> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : getPolicyLoading ? (
          <tbody>
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          </tbody>
        ) : getPolicyError ? (
          <tbody>
            <tr>
              <td colSpan="4">{getPolicyError}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="4">Data Policy is Empty</td>
            </tr>
          </tbody>
        )}
      </table>

      <DetailPolicy
        showModalPolicy={showModalDetailPolicy}
        handleCloseDetailPolicy={closeDetailPolicy}
        policyId={policyId}
        policyName={policyName}
        policyDescription={policyDescription}
        setPolicyId={setPolicyId}
        setPolicyName={setPolicyName}
        setPolicyDescription={setPolicyDescription}
      />

      <AddPolicy
        showModalPolicy={showModalAddPolicy}
        handleCloseAddPolicy={closeAddPolicy}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
      />

      <EditPolicy
        showModalPolicy={showModalEditPolicy}
        handleCloseEditPolicy={closeEditPolicy}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        policyId={policyId}
        policyName={policyName}
        setPolicyName={setPolicyName}
        policyDescription={policyDescription}
        setPolicyDescription={setPolicyDescription}
      />

      <DeletePolicy
        showModalPolicy={showModalDeletePolicy}
        handleCloseDeletePolicy={closeDeletePolicy}
        policyName={policyName}
        policyId={policyId}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default GetAllPolicy;
