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
    handleSubmit,
    reset,
    facility,
    setFacility,
    getCategoryResult,
  } = props;

  const { updateFaciResult, updateFaciError } = useSelector(
    (state) => state.HotelReducer
  );

  const dispatch = useDispatch();

  const [isUpdateFaci, setIsUpdateFaci] = useState(false);

  const handleUpdateFaci = (data) => {
    const low_price = facility.low_price;
    const high_price = facility.high_price;
    const hasil = (+low_price + +high_price) / 2;
    facility.rate_price = hasil;
    data = facility;
    setIsUpdateFaci(true);
    dispatch(updateFacilities(data));
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
              reset();
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
                <Form.Control type="hidden" value={facility.faciId} />
                <Form.Control
                  type="text"
                  id="formFaciName"
                  value={facility.name}
                  onChange={(e) =>
                    setFacility({ ...facility, name: e.target.value })
                  }
                  required
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
                      value={facility.cagro_id}
                      onChange={(e) =>
                        setFacility({ ...facility, cagro_id: e.target.value })
                      }
                      required
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
                  value={facility.room_number}
                  onChange={(e) =>
                    setFacility({ ...facility, room_number: e.target.value })
                  }
                  required
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
                  value={facility.max_vacant}
                  onChange={(e) =>
                    setFacility({ ...facility, max_vacant: e.target.value })
                  }
                  required
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
                  value={facility.low_price}
                  onChange={(e) =>
                    setFacility({ ...facility, low_price: e.target.value })
                  }
                  required
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
                  value={facility.high_price}
                  onChange={(e) =>
                    setFacility({ ...facility, high_price: e.target.value })
                  }
                  required
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
                  value={facility.discount}
                  onChange={(e) =>
                    setFacility({ ...facility, discount: e.target.value })
                  }
                  required
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
                  value={facility.tax}
                  onChange={(e) =>
                    setFacility({ ...facility, tax: e.target.value })
                  }
                  required
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
                  value={facility.startdate}
                  onChange={(e) =>
                    setFacility({ ...facility, startdate: e.target.value })
                  }
                  required
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
                  value={facility.enddate}
                  onChange={(e) =>
                    setFacility({ ...facility, enddate: e.target.value })
                  }
                  required
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
                value={facility.description}
                onChange={(e) =>
                  setFacility({ ...facility, description: e.target.value })
                }
                required
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
