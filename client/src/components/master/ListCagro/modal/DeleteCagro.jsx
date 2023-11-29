import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteCagro } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const DeleteCagro = (props) => {
  const { showModalCagro, handleCloseDeleteCagro, cagroId, cagroName } = props;

  const { handleSubmit } = useForm();

  const [isDeleteCagro, setIsDeleteCagro] = useState(false);

  const { deleteCagroResult, deleteCagroError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteCagro();
    setIsDeleteCagro(true);
    dispatch(deleteCagro(cagroId));
  };

  useEffect(() => {
    if (deleteCagroResult || deleteCagroError) {
      if (isDeleteCagro) {
        deleteCagroResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteCagroResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteCagro(false);
            })
          : Swal.fire("Gagal", deleteCagroError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteCagroResult, deleteCagroError]);
  return (
    <Modal show={showModalCagro} onHide={handleCloseDeleteCagro}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category Group</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="cagro_id" value={cagroId} />
          Are you sure want delete Category Group {cagroName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteCagro}>
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

export default DeleteCagro;
