import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { deleteHotel } from "../../../../actions/hotelAction";

const DeleteHotel = (props) => {
  const {
    showModalHotel,
    handleCloseDeleteHotel,
    hotelName,
    hotelId,
    handleSubmit,
  } = props;

  const { deleteHotelResult, deleteHotelError } = useSelector(
    (state) => state.HotelReducer
  );

  const [isDeleteHotel, setIsDeleteHotel] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteHotel();
    setIsDeleteHotel(true);
    dispatch(deleteHotel(hotelId));
  };

  useEffect(() => {
    if (deleteHotelResult || deleteHotelError) {
      if (isDeleteHotel) {
        deleteHotelResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteHotelResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteHotel(false);
            })
          : Swal.fire("Gagal", deleteHotelError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteHotelResult, deleteHotelError]);

  return (
    <Modal show={showModalHotel} onHide={handleCloseDeleteHotel}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Hotel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="poli_id" value={hotelId} />
          Are you sure want delete Hotel {hotelName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteHotel}>
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

export default DeleteHotel;
