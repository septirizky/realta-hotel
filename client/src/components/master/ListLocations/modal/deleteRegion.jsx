import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteRegions } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const DeleteRegion = (props) => {
  const {
    handleCloseDeleteRegion,
    showModalRegion,
    regionName,
    regionId,
    handleSubmit,
  } = props;

  const [isDeleteRegion, setIsDeleteRegion] = useState(false);

  const { deleteRegionResult, deleteRegionError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteRegion();
    setIsDeleteRegion(true);
    dispatch(deleteRegions(regionId));
  };

  useEffect(() => {
    if (deleteRegionResult || deleteRegionError) {
      if (isDeleteRegion) {
        deleteRegionResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteRegionResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteRegion(false);
            })
          : Swal.fire("Gagal", deleteRegionError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteRegionResult, deleteRegionError]);

  return (
    <Modal show={showModalRegion} onHide={handleCloseDeleteRegion}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Region</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="region_code" value={regionId} />
          Are you sure want delete Region {regionName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteRegion}>
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

export default DeleteRegion;
