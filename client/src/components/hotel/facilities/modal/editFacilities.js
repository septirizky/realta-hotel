import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateFacilities } from "../../../../actions/facilitiesAction";

const EditFacilities = (props) => {
  const {
    showModalFaci,
    handleCloseEditFaci,
    register,
    resetField,
    handleSubmit,
    faciId,
    faciName,
    cagroId,
    faciRoom,
    faciMax,
    faciLowPrice,
    faciHighPrice,
    faciDiscount,
    faciTax,
    faciStartDate,
    faciEndDate,
    faciDesc,
    setFaciName,
    setCagroId,
    setFaciRoom,
    setFaciMax,
    setFaciLowPrice,
    setFaciHighPrice,
    setFaciDiscount,
    setFaciTax,
    setFaciStartDate,
    setFaciEndDate,
    setFaciDesc,
    params_hotel_id,
    getCategoryResult,
  } = props;

  const { updateFaciResult, updateFaciError } = useSelector(
    (state) => state.HotelReducer
  );

  const dispatch = useDispatch();

  const [isUpdateFaci, setIsUpdateFaci] = useState(false);

  const handleUpdateFaci = (data) => {
    const hasil = (+data.faci_low_price + +data.faci_high_price) / 2;
    const dataJson = {
      name: data.faci_name,
      cagro_id: cagroId,
      room_number: data.faci_room_number,
      max_vacant: data.faci_measure_unit,
      low_price: data.faci_low_price,
      high_price: data.faci_high_price,
      discount: data.faci_discount,
      tax: data.faci_tax_rate,
      startdate: data.faci_startdate,
      enddate: data.faci_enddate,
      description: data.faci_description,
      rate_price: hasil,
      hotel_id: params_hotel_id,
    };

    setIsUpdateFaci(true);
    dispatch(updateFacilities(dataJson, faciId));
  };

  useEffect(() => {
    if (updateFaciResult || updateFaciError) {
      if (isUpdateFaci) {
        updateFaciResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateFaciResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("faci_id");
              resetField("faci_name");
              resetField("faci_cagro_id");
              resetField("faci_room_number");
              resetField("faci_measure_unit");
              resetField("faci_low_price");
              resetField("faci_high_price");
              resetField("faci_discount");
              resetField("faci_tax");
              resetField("faci_startdate");
              resetField("faci_enddate");
              resetField("faci_description");
              resetField("faci_hotel_id");
              handleCloseEditFaci(false);
            })
          : Swal.fire("Gagal", updateFaciError, "error");
      }
    }
    // eslint-disable-next-line
  }, [updateFaciResult, updateFaciError]);
  return (
    <Modal show={showModalFaci} onHide={handleCloseEditFaci} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Facilities</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdateFaci)} className="px-2">
        <Modal.Body>
          <Container>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Label column sm="6" htmlFor="formFaciName">
                  Facilities
                </Form.Label>
              </Col>
              <Col>
                <Form.Control type="hidden" value={faciId} />
                <Form.Control
                  type="text"
                  id="formFaciName"
                  {...register("faci_name")}
                  value={faciName}
                  onChange={(e) => setFaciName(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label column sm="6" htmlFor="formCategory">
                  Category
                </Form.Label>
              </Col>
              <Col>
                {getCategoryResult ? (
                  <div>
                    <Form.Select
                      className="form-select"
                      id="EditFaci"
                      // {...register("faci_cagro_id")}
                      value={cagroId}
                      onChange={(e) => setCagroId(e.target.value)}
                    >
                      {getCategoryResult.map((value) => {
                        return (
                          <option value={value.cagro_id}>
                            {value.cagro_name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </div>
                ) : (
                  <div>Category tidak ada</div>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Label column sm="6" htmlFor="formRoomNumber">
                  Room
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  id="formRoomNumber"
                  {...register("faci_room_number")}
                  value={faciRoom}
                  onChange={(e) => setFaciRoom(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label column sm="6" htmlFor="formMaxVacant">
                  Max Vacant
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  id="formMaxVacant"
                  {...register("faci_measure_unit")}
                  value={faciMax}
                  onChange={(e) => setFaciMax(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Label column sm="6" htmlFor="formLowPrice">
                  Low Price
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  id="formLowPrice"
                  {...register("faci_low_price")}
                  value={faciLowPrice}
                  onChange={(e) => setFaciLowPrice(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label column sm="6" htmlFor="formHighPrice">
                  High Price
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  id="formHighPrice"
                  {...register("faci_high_price")}
                  value={faciHighPrice}
                  onChange={(e) => setFaciHighPrice(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Label column sm="6" htmlFor="formDiscount">
                  Discount %
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  id="formDiscount"
                  {...register("faci_discount")}
                  value={faciDiscount}
                  onChange={(e) => setFaciDiscount(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label column sm="6" htmlFor="formTax">
                  Tax
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  id="formTax"
                  {...register("faci_tax_rate")}
                  value={faciTax}
                  onChange={(e) => setFaciTax(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Label column sm="6" htmlFor="formStartDate">
                  Start Date
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="date"
                  id="formStartDate"
                  {...register("faci_startdate")}
                  value={faciStartDate}
                  onChange={(e) => setFaciStartDate(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label column sm="6" htmlFor="formEndDate">
                  End Date
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="date"
                  id="formEndDate"
                  {...register("faci_enddate")}
                  value={faciEndDate}
                  onChange={(e) => setFaciEndDate(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="6" htmlFor="formFaciDesc">
                Facilities Description
              </Form.Label>
              <Form.Control
                as="textarea"
                id="formFaciDesc"
                {...register("faci_description")}
                value={faciDesc}
                onChange={(e) => setFaciDesc(e.target.value)}
                rows={5}
                maxLength={255}
              />
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditFaci}>
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

export default EditFacilities;
