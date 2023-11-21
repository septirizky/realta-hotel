import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { postCity } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const AddCity = (props) => {
  const {
    showModalCity,
    handleCloseAddCity,
    msg,
    setMsg,
    register,
    resetField,
    handleSubmit,
    provinceId,
    provinceName,
    errors,
  } = props;

  const { postCityResult, postCityError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isAddCity, setIsAddCity] = useState(false);

  const handleSaveCity = (data) => {
    const dataJson = {
      city_province_id: provinceId,
      city_name: data.city_name,
    };

    setIsAddCity(true);
    dispatch(postCity(dataJson));
  };

  useEffect(() => {
    if (postCityResult || postCityError) {
      if (isAddCity) {
        postCityResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: postCityResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("city_name");
              setMsg("");
              handleCloseAddCity(false);
            })
          : setMsg(postCityError);
      }
    }
    // eslint-disable-next-line
  }, [postCityResult, postCityError]);
  return (
    <Modal show={showModalCity} onHide={handleCloseAddCity}>
      <Modal.Header closeButton>
        <Modal.Title>Add City</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveCity)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formProvName">
              Province Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formProvName"
                value={provinceName || ""}
                readOnly
              />
              <Form.Control
                type="hidden"
                id="formProvName"
                value={provinceId || ""}
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
          <Button variant="secondary" onClick={handleCloseAddCity}>
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

export default AddCity;
