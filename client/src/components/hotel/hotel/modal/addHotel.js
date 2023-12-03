import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addHotel } from "../../../../actions/hotelAction";

const AddHotel = (props) => {
  const {
    showModalHotel,
    handleCloseAddHotel,
    register,
    handleSubmit,
    reset,
    getCityResult,
  } = props;

  const { addHotelResult, addHotelError } = useSelector(
    (state) => state.HotelReducer
  );

  const dispatch = useDispatch();

  const [isAddHotel, setIsAddHotel] = useState(false);

  const handleSaveHotel = (data) => {
    const dataJson = {
      name: data.hotel_name,
      phonenumber: data.hotel_phonenumber,
      status: data.hotel_status,
      city: data.addr_city_id,
      address: data.addr_line_1,
      description: data.hotel_description,
    };
    setIsAddHotel(true);
    dispatch(addHotel(dataJson));
  };

  useEffect(() => {
    if (addHotelResult || addHotelError) {
      if (isAddHotel) {
        addHotelResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: addHotelResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              reset();
              handleCloseAddHotel(false);
            })
          : Swal.fire("Gagal", addHotelError, "error");
      }
    }
    // eslint-disable-next-line
  }, [addHotelResult, addHotelError]);
  return (
    <Modal show={showModalHotel} onHide={handleCloseAddHotel}>
      <Modal.Header closeButton>
        <Modal.Title>Add Hotel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveHotel)} className="px-2">
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formHotelName">
              Hotel Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                placeholder="Name"
                type="text"
                id="formHotelName"
                {...register("hotel_name")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formHotelPhone">
              Phone Number
            </Form.Label>
            <Col sm="6">
              <Form.Control
                placeholder="Phone"
                type="text"
                id="formHotelPhone"
                {...register("hotel_phonenumber")}
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
                {...register("hotel_status")}
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
                    {...register("addr_city_id")}
                  >
                    {getCityResult.map((value) => {
                      return (
                        <option value={value.city_id}>{value.city_name}</option>
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
              placeholder="Addresss"
              as="textarea"
              id="formHotelAddr"
              maxLength={255}
              {...register("addr_line_1")}
              rows={5}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="6" htmlFor="formHotelDesc">
              Hotel Description
            </Form.Label>
            <Form.Control
              placeholder="Description"
              as="textarea"
              id="formHotelDesc"
              maxLength={255}
              {...register("hotel_description")}
              rows={5}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddHotel}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddHotel;
