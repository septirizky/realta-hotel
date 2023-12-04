import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateHotel } from "../../../../actions/hotelAction";

const SwitchStatus = (props) => {
  const {
    showModalHotel,
    handleCloseSwitchStatus,
    handleSubmit,
    reset,
    hotel,
    setHotel,
  } = props;

  const { updateHotelResult, updateHotelError } = useSelector(
    (state) => state.HotelReducer
  );

  const dispatch = useDispatch();

  const [isUpdateHotel, setIsUpdateHotel] = useState(false);

  const handleUpdateHotel = (data) => {
    data = hotel;
    setIsUpdateHotel(true);
    dispatch(updateHotel(data));
  };

  useEffect(() => {
    if (updateHotelResult || updateHotelError) {
      if (isUpdateHotel) {
        updateHotelResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateHotelResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              reset();
              handleCloseSwitchStatus(false);
            })
          : Swal.fire("Gagal", updateHotelError, "error");
      }
    }
    // eslint-disable-next-line
  }, [updateHotelResult, updateHotelError]);

  return (
    <Modal show={showModalHotel} onHide={handleCloseSwitchStatus}>
      <Modal.Header closeButton>
        <Modal.Title>Switch Status</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdateHotel)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formStatus">
              Status
            </Form.Label>
            <Col>
              <Form.Select
                className="form-select"
                id="addHotel"
                value={hotel.status}
                onChange={(e) => setHotel({ ...hotel, status: e.target.value })}
                required
              >
                <option value="Active">Active</option>
                <option value="Disactive">Disactive</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-dark"
            onClick={handleCloseSwitchStatus}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            type="submit"
            className="btn custom-btn-yellow"
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SwitchStatus;
