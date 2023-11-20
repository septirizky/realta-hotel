import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteProvince } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const DeleteProv = (props) => {
  const {
    handleCloseDeleteProvince,
    showModalProvince,
    provinceName,
    provinceId,
    handleSubmit,
  } = props;

  const [isDeleteProv, setIsDeleteProv] = useState(false);

  const { deleteProvResult, deleteProvError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteProvince();
    setIsDeleteProv(true);
    dispatch(deleteProvince(provinceId));
  };

  useEffect(() => {
    if (deleteProvResult || deleteProvError) {
      if (isDeleteProv) {
        deleteProvResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteProvResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteProvince(false);
            })
          : Swal.fire("Gagal", deleteProvError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteProvResult, deleteProvError]);
  return (
    <Modal show={showModalProvince} onHide={handleCloseDeleteProvince}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Province</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="prov_id" value={provinceId} />
          Are you sure want delete Province {provinceName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteProvince}>
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

export default DeleteProv;
