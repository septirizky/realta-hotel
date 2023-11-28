import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addFacilities } from "../../../../actions/facilitiesAction";

const AddFacilities = (props) => {
  const {
    showModalFaci,
    handleCloseAddFaci,
    register,
    resetField,
    handleSubmit,
    params_hotel_id,
    getCategoryResult,
  } = props;

  const { addFaciResult, addFaciError } = useSelector(
    (state) => state.HotelReducer
  );

  const dispatch = useDispatch();

  const [isAddFaci, setIsAddFaci] = useState(false);

  const handleSaveFaci = (data) => {
    const hasil = (+data.faci_low_price + +data.faci_high_price) / 2;
    const dataJson = {
      name: data.faci_name,
      cagro_id: data.faci_cagro_id,
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
    setIsAddFaci(true);
    dispatch(addFacilities(dataJson));
  };

  useEffect(() => {
    if (addFaciResult || addFaciError) {
      if (isAddFaci) {
        addFaciResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: addFaciResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("faci_id");
              resetField("faci_name");
              resetField("faci_room_number");
              resetField("faci_measure_unit");
              resetField("faci_low_price");
              resetField("faci_high_price");
              resetField("faci_discount");
              resetField("faci_tax");
              resetField("faci_startdate");
              resetField("faci_enddate");
              resetField("faci_description");
              resetField("faci_cagro_id");
              resetField("faci_hotel_id");
              handleCloseAddFaci(false);
            })
          : Swal.fire("Gagal", addFaciError, "error");
      }
    }
    // eslint-disable-next-line
  }, [addFaciResult, addFaciError]);
  return (
    <Modal show={showModalFaci} onHide={handleCloseAddFaci} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Facilities</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveFaci)} className="px-2">
        <Modal.Body>
          <Container>
            <Form.Group as={Row} className="mb-3">
              <Col>
                <Form.Label column sm="6" htmlFor="formFaciName">
                  Facilities
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Name"
                  type="text"
                  id="formFaciName"
                  {...register("faci_name")}
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
                      id="formCagro"
                      {...register("faci_cagro_id")}
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
                  placeholder="Number"
                  type="text"
                  id="formRoomNumber"
                  {...register("faci_room_number")}
                />
              </Col>
              <Col>
                <Form.Label column sm="6" htmlFor="formMaxVacant">
                  Max Vacant
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Vacant"
                  type="text"
                  id="formMaxVacant"
                  {...register("faci_measure_unit")}
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
                  placeholder="Price"
                  type="text"
                  id="formLowPrice"
                  {...register("faci_low_price")}
                />
              </Col>
              <Col>
                <Form.Label column sm="6" htmlFor="formHighPrice">
                  High Price
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Price"
                  type="text"
                  id="formHighPrice"
                  {...register("faci_high_price")}
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
                  placeholder="Discount"
                  type="text"
                  id="formDiscount"
                  {...register("faci_discount")}
                />
              </Col>
              <Col>
                <Form.Label column sm="6" htmlFor="formTax">
                  Tax
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Tax"
                  type="text"
                  id="formTax"
                  {...register("faci_tax_rate")}
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
                maxLength={255}
                {...register("faci_description")}
                rows={5}
              />
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddFaci}>
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

export default AddFacilities;
