import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { updateCity } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const EditCity = (props) => {
  const {
    showModalCity,
    handleCloseEditCity,
    msg,
    setMsg,
    register,
    resetField,
    handleSubmit,
    provinceId,
    provinceName,
    cityId,
    cityName,
    setCityName,
    errors,
  } = props;

  const { updateCityResult, updateCityError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isEditCity, setIsEditCity] = useState(false);

  const handleEditCity = (data) => {
    const dataJson = {
      city_province_id: provinceId,
      city_name: data.city_name,
    };

    setIsEditCity(true);
    dispatch(updateCity(dataJson, cityId));
  };

  useEffect(() => {
    if (updateCityResult || updateCityError) {
      if (isEditCity) {
        updateCityResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateCityResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("provinceId");
              resetField("provinceName");
              resetField("cityId");
              resetField("cityName");
              setMsg("");
              handleCloseEditCity(true);
            })
          : setMsg(updateCityError);
      }
    }
    // eslint-disable-next-line
  }, [updateCityResult, updateCityError]);
  return (
    <Modal show={showModalCity} onHide={handleCloseEditCity}>
      <Modal.Header closeButton>
        <Modal.Title>Edit City</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleEditCity)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formProvName">
              Province Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formProvName"
                defaultValue={provinceName}
                readOnly
              />
              <Form.Control
                type="hidden"
                id="formCountryName"
                defaultValue={provinceId}
                {...register("city_province_id")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formCityName">
              City Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formCityName"
                {...register("city_name")}
                defaultValue={cityName}
                onChange={(e) => setCityName(e.target.value)}
                autoComplete="off"
              />
            </Col>
            {errors && errors ? (
              <>
                <Form.Label column sm="4" htmlFor="formCityName"></Form.Label>
                <Col sm="6">
                  <Form.Text className="text-danger" id="formCityName">
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
          <Button variant="secondary" onClick={handleCloseEditCity}>
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

export default EditCity;
