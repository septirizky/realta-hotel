import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteSeta } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const DeleteSeta = (props) => {
  const {
    showModalSeta,
    handleCloseDeleteSeta,
    setaName,
    setaId,
    handleSubmit,
  } = props;

  const [isDeleteSeta, setIsDeleteSeta] = useState(false);

  const { deleteSetaResult, deleteSetaError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteSeta();
    setIsDeleteSeta(true);
    dispatch(deleteSeta(setaId));
  };

  useEffect(() => {
    if (deleteSetaResult || deleteSetaError) {
      if (isDeleteSeta) {
        deleteSetaResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteSetaResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteSeta(false);
            })
          : Swal.fire("Gagal", deleteSetaError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteSetaResult, deleteSetaError]);
  return (
    <Modal show={showModalSeta} onHide={handleCloseDeleteSeta}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Service Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="seta_id" value={setaId} />
          Are you sure want delete Service Task {setaName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteSeta}>
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteSeta;
