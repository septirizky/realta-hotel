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
    register,
    resetField,
    handleSubmit,
    addrId,
    hotelId,
    hotelName,
    phoneNumber,
    hotelStatus,
    hotelCity,
    hotelAddress,
    hotelDescription,
    // hotelRatingStar,
    setHotelName,
    setPhoneNumber,
    setHotelStatus,
    setHotelCity,
    setHotelAddress,
    setHotelDescription,
    // setHotelRatingStar,
    getCityResult,
  } = props;

  const { updateHotelResult, updateHotelError } = useSelector(
    (state) => state.HotelReducer
  );

  const dispatch = useDispatch();

  const [isUpdateHotel, setIsUpdateHotel] = useState(false);

  const handleUpdateHotel = (data) => {
    const dataJson = {
      name: data.hotel_name,
      phonenumber: data.hotel_phonenumber,
      status: data.hotel_status,
      city: data.addr_city_id,
      address: data.addr_line_1,
      description: data.hotel_description,
      addr_id: addrId,
    };
    setIsUpdateHotel(true);
    dispatch(updateHotel(dataJson, hotelId));
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
              resetField("hotel_id");
              resetField("hotel_name");
              resetField("hotel_phonenumber");
              resetField("hotel_status");
              resetField("addr_city_id");
              resetField("addr_line_1");
              resetField("hotel_description");
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
              <Form.Control type="hidden" value={hotelId} />
              <Form.Control
                type="text"
                id="formHotelName"
                {...register("hotel_name")}
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
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
                {...register("hotel_phonenumber")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                value={hotelStatus}
                onChange={(e) => setHotelStatus(e.target.value)}
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
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value)}
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
              {...register("addr_line_1")}
              value={hotelAddress}
              onChange={(e) => setHotelAddress(e.target.value)}
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
              {...register("hotel_description")}
              value={hotelDescription}
              onChange={(e) => setHotelDescription(e.target.value)}
              maxLength={255}
              rows={5}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditHotel}>
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

export default EditHotel;
