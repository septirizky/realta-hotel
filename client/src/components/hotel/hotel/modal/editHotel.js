import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateHotel } from "../../../../actions/hotelAction";

const EditHotel = (props) => {
  const {
    showModalHotel,
    handleCloseEditHotel,
    handleSubmit,
    reset,
    hotel,
    setHotel,
    getCityResult,
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
              handleCloseEditHotel(false);
            })
          : Swal.fire("Gagal", updateHotelError, "error");
      }
    }
    // eslint-disable-next-line
  }, [updateHotelResult, updateHotelError]);
  return (
    <Modal show={showModalHotel} onHide={handleCloseEditHotel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Hotel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdateHotel)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formHotelName">
              Hotel Name
            </Form.Label>
            <Col sm="6">
              <Form.Control type="hidden" value={hotel.hotelId} />
              <Form.Control
                type="text"
                id="formHotelName"
                value={hotel.name}
                onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formHotelPhone">
              Hotel Phone
            </Form.Label>
            <Col sm="6">
              {/* <Form.Control type="hidden" value={hotelId} /> */}
              <Form.Control
                type="text"
                id="formHotelPhone"
                value={hotel.phonenumber}
                onChange={(e) =>
                  setHotel({ ...hotel, phonenumber: e.target.value })
                }
                required
              />
            </Col>
          </Form.Group>
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
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formCity">
              City
            </Form.Label>
            <Col>
              {getCityResult ? (
                <div>
                  <Form.Select
                    className="form-select"
                    id="addHotel"
                    value={hotel.city}
                    onChange={(e) =>
                      setHotel({ ...hotel, city: e.target.value })
                    }
                    required
                  >
                    {getCityResult.map((value) => {
                      return (
                        <option value={value.city_id}>
                          {value.city_name}, {value.prov_name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
              ) : (
                <div>City tidak ada</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="6" htmlFor="formHotelAddr">
              Hotel Address
            </Form.Label>
            <Form.Control
              as="textarea"
              id="formHotelAddr"
              maxLength={255}
              value={hotel.address}
              onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
              required
              rows={5}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="6" htmlFor="formHotelDesc">
              Hotel Description
            </Form.Label>
            <Form.Control
              as="textarea"
              id="formHotelDesc"
              maxLength={255}
              value={hotel.description}
              onChange={(e) =>
                setHotel({ ...hotel, description: e.target.value })
              }
              required
              rows={5}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-dark"
            onClick={handleCloseEditHotel}
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

export default EditHotel;
