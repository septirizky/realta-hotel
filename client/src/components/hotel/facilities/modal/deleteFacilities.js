import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { deleteFacilities } from "../../../../actions/facilitiesAction";

const DeleteFacilities = (props) => {
    const {
        showModalFaci,
        handleCloseDeleteFaci,
        faciId,
        faciName,
        handleSubmit,
      } = props;
    
      const { deleteFaciResult, deleteFaciError } = useSelector(
        (state) => state.HotelReducer
      );
    
      const [isDeleteFaci, setIsDeleteFaci] = useState(false);
    
      const dispatch = useDispatch();
    
      const handleDelete = () => {
        handleCloseDeleteFaci();
        setIsDeleteFaci(true);
        dispatch(deleteFacilities(faciId));
      };
    
      useEffect(() => {
        if (deleteFaciResult || deleteFaciError) {
          if (isDeleteFaci) {
            deleteFaciResult
              ? Swal.fire({
                  title: "Sukses",
                  icon: "success",
                  text: deleteFaciResult.message,
                  confirmButtonText: "OK",
                }).then(() => {
                  handleCloseDeleteFaci(false);
                })
              : Swal.fire("Gagal", deleteFaciError, "error");
          }
        }
        // eslint-disable-next-line
      }, [deleteFaciResult, deleteFaciError]);
    return (
        <Modal show={showModalFaci} onHide={handleCloseDeleteFaci}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Facilities</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="poli_id" value={faciId} />
          Are you sure want delete Facilities {faciName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteFaci}>
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

export default DeleteFacilities;
