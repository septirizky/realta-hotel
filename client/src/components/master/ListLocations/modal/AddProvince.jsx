import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { postProvince } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const AddProvince = (props) => {
  const {
    showModalProvince,
    handleCloseAddProvince,
    msg,
    setMsg,
    register,
    resetField,
    handleSubmit,
    countryId,
    countryName,
    errors,
  } = props;

  const { postProvResult, postProvError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isAddProv, setIsAddProv] = useState(false);

  const handleSaveProv = (data) => {
    const dataJson = {
      prov_country_id: countryId,
      prov_name: data.prov_name,
    };

    setIsAddProv(true);
    dispatch(postProvince(dataJson));
  };

  useEffect(() => {
    if (postProvResult || postProvError) {
      if (isAddProv) {
        postProvResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: postProvResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("prov_name");
              setMsg("");
              handleCloseAddProvince(false);
            })
          : setMsg(postProvError);
      }
    }
    // eslint-disable-next-line
  }, [postProvResult, postProvError]);
  return (
    <Modal show={showModalProvince} onHide={handleCloseAddProvince}>
      <Modal.Header closeButton>
        <Modal.Title>Add Province</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveProv)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formCountryName">
              Country Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formCountryName"
                value={countryName || ""}
                readOnly
              />
              <Form.Control
                type="hidden"
                id="formCountryName"
                value={countryId || ""}
                {...register("prov_country_id")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formProvName">
              Province Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formProvName"
                {...register("prov_name")}
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
          <Button variant="secondary" onClick={handleCloseAddProvince}>
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

export default AddProvince;
