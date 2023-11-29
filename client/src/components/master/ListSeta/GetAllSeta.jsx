import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import AddSeta from "./modal/AddSeta";
import EditSeta from "./modal/EditSeta";
import DeleteSeta from "./modal/DeleteSeta";

const GetAllSeta = (props) => {
  const { getSetaResult, getSetaLoading, getSetaError } = props;

  const { register, resetField, handleSubmit } = useForm();

  const [showModalAddSeta, setShowModalAddSeta] = useState(false);

  const [showModalEditSeta, setShowModalEditSeta] = useState(false);

  const [showModalDeleteSeta, setShowModalDeleteSeta] = useState(false);

  const [setaId, setSetaId] = useState();

  const [setaName, setSetaName] = useState("");

  const [setaSeq, setSetaSeq] = useState("");

  const handleShowAddSeta = () => {
    setShowModalAddSeta(true);
  };

  const handleCloseAddSeta = () => {
    resetField("seta_name");
    resetField("seta_seq");
    setShowModalAddSeta(false);
  };

  const handleShowEditSeta = (setaId, setaName, setaSeq) => {
    setSetaId(setaId);
    setSetaName(setaName);
    setSetaSeq(setaSeq);
    setShowModalEditSeta(true);
  };

  const handleCloseEditSeta = () => {
    resetField("seta_id");
    resetField("seta_name");
    resetField("seta_seq");
    setShowModalEditSeta(false);
  };

  const handleShowDeleteSeta = (setaId, setaName) => {
    setSetaId(setaId);
    setSetaName(setaName);
    setShowModalDeleteSeta(true);
  };

  const handleCloseDeleteSeta = () => {
    setShowModalDeleteSeta(false);
  };

  return (
    <>
      <div className="border border-black container-fluid py-3">
        Service Task
      </div>
      <table>
        <thead className="color-gray-thead">
          <tr>
            <th>#</th>
            <th className="text-center">Task Name</th>
            <th className="text-center">Sequence Order</th>
            <th className="align-border-right">
              <button
                type="button"
                className="button-transparan"
                onClick={handleShowAddSeta}
              >
                <AiOutlinePlus /> Add
              </button>
            </th>
          </tr>
        </thead>
        {getSetaResult && getSetaResult ? (
          getSetaResult.map((seta, index) => {
            return (
              <tbody key={seta.seta_id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{seta.seta_name}</td>
                  <td>{seta.seta_seq}</td>
                  <td className="align-border-right">
                    <button
                      type="button"
                      className="button-update-transparan"
                      onClick={() =>
                        handleShowEditSeta(
                          seta.seta_id,
                          seta.seta_name,
                          seta.seta_seq
                        )
                      }
                    >
                      <FaPencilAlt /> Edit
                    </button>
                    <button
                      type="button"
                      className="button-delete-transparan"
                      onClick={() =>
                        handleShowDeleteSeta(seta.seta_id, seta.seta_name)
                      }
                    >
                      <FaTimes /> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : getSetaLoading ? (
          <tbody>
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          </tbody>
        ) : getSetaError ? (
          <tbody>
            <tr>
              <td colSpan="4">{getSetaError}</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="4">Data Service Task is Empty</td>
            </tr>
          </tbody>
        )}
      </table>

      <AddSeta
        showModalSeta={showModalAddSeta}
        handleCloseAddSeta={handleCloseAddSeta}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
      />

      <EditSeta
        showModalSeta={showModalEditSeta}
        handleCloseEditSeta={handleCloseEditSeta}
        register={register}
        resetField={resetField}
        handleSubmit={handleSubmit}
        setaId={setaId}
        setSetaId={setSetaId}
        setaName={setaName}
        setSetaName={setSetaName}
        setaSeq={setaSeq}
        setSetaSeq={setSetaSeq}
      />

      <DeleteSeta
        showModalSeta={showModalDeleteSeta}
        handleCloseDeleteSeta={handleCloseDeleteSeta}
        setaName={setaName}
        setaId={setaId}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default GetAllSeta;
