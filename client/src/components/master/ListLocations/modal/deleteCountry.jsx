import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteCountry } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const DeleteCountry = (props) => {
  const {
    handleCloseDeleteCountry,
    showModalCountry,
    countryName,
    countryId,
    handleSubmit,
  } = props;

  const [isDeleteCountry, setIsDeleteCountry] = useState(false);

  const { deleteCountryResult, deleteCountryError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteCountry();
    setIsDeleteCountry(true);
    dispatch(deleteCountry(countryId));
  };

  useEffect(() => {
    if (deleteCountryResult || deleteCountryError) {
      if (isDeleteCountry) {
        deleteCountryResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteCountryResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteCountry(false);
            })
          : Swal.fire("Gagal", deleteCountryError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteCountryResult, deleteCountryError]);
  return (
    <Modal show={showModalCountry} onHide={handleCloseDeleteCountry}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Country</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="country_id" value={countryId} />
          Are you sure want delete Country {countryName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteCountry}>
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

export default DeleteCountry;
