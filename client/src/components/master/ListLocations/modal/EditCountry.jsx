import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { updateCountry } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const EditCountry = (props) => {
  const {
    showModalCountry,
    handleCloseEditCountry,
    msg,
    setMsg,
    register,
    countryName,
    setCountryName,
    countryId,
    regionName,
    regionId,
    resetField,
    handleSubmit,
    errors,
  } = props;

  const { updateCountryResult, updateCountryError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isEditCountry, setIsEditCountry] = useState(false);

  const handleEditCountry = (data) => {
    const dataJson = {
      country_region_id: regionId,
      country_name: data.country_name,
    };

    setIsEditCountry(true);
    dispatch(updateCountry(dataJson, countryId));
  };

  useEffect(() => {
    if (updateCountryResult || updateCountryError) {
      if (isEditCountry) {
        updateCountryResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateCountryResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("regionName");
              resetField("regionId");
              resetField("countryName");
              resetField("countryId");
              setMsg("");
              handleCloseEditCountry(true);
            })
          : setMsg(updateCountryError);
      }
    }
    // eslint-disable-next-line
  }, [updateCountryResult, updateCountryError]);
  return (
    <Modal show={showModalCountry} onHide={handleCloseEditCountry}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Country</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleEditCountry)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formRegionName">
              Region Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formRegionName"
                defaultValue={regionName}
                readOnly
              />
              <Form.Control
                type="hidden"
                id="formRegionName"
                defaultValue={regionId}
                {...register("country_region_id")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formCountryName">
              Country Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formCountryName"
                {...register("country_name")}
                defaultValue={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                autoComplete="off"
              />
            </Col>
            {errors && errors ? (
              <>
                <Form.Label
                  column
                  sm="4"
                  htmlFor="formCountryName"
                ></Form.Label>
                <Col sm="6">
                  <Form.Text className="text-danger" id="formCountryName">
                    {msg}
                  </Form.Text>
                </Col>
              </>
            ) : (
              ""
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditCountry}>
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

export default EditCountry;
