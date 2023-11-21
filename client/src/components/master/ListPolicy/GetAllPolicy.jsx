import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import "../css/policy.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import DetailPolicy from "./modal/DetailPolicy";

const GetAllPolicy = (props) => {
  const { getPolicyResult, getPolicyLoading, getPolicyError } = props;

  const [showModalDetailPolicy, setShowModalDetailPolicy] = useState(false);

  const [policyId, setPolicyId] = useState();

  const [policyName, setPolicyName] = useState("");

  const [policyDescription, setPolicyDescription] = useState("");

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
              <AiOutlinePlus /> Add
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
                    <FaPencilAlt /> Edit <FaTimes /> Delete
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
    </>
  );
};

export default GetAllPolicy;
