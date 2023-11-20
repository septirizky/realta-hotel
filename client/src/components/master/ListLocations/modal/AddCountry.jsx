import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { postCountry } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const AddCountry = (props) => {
  const {
    showModalCountry,
    handleCloseAddCountry,
    msg,
    setMsg,
    register,
    regionName,
    regionId,
    resetField,
    handleSubmit,
    errors,
  } = props;

  const { postCountryResult, postCountryError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isAddCountry, setIsAddCountry] = useState(false);

  const handleSaveCountry = (data) => {
    const dataJson = {
      country_region_id: regionId,
      country_name: data.country_name,
    };
    setIsAddCountry(true);
    dispatch(postCountry(dataJson));
  };

  useEffect(() => {
    if (postCountryResult || postCountryError) {
      if (isAddCountry) {
        postCountryResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: postCountryResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("country_name");
              setMsg("");
              handleCloseAddCountry(false);
            })
          : setMsg(postCountryError);
      }
    }
    // eslint-disable-next-line
  }, [postCountryResult, postCountryError]);
  return (
    <Modal show={showModalCountry} onHide={handleCloseAddCountry}>
      <Modal.Header closeButton>
        <Modal.Title>Add Country</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveCountry)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formRegionName">
              Region Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formRegionName"
                value={regionName || ""}
                readOnly
              />
              <Form.Control
                type="hidden"
                id="formRegionName"
                value={regionId || ""}
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
          <Button variant="secondary" onClick={handleCloseAddCountry}>
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

export default AddCountry;
