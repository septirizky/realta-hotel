import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updateProvince } from "../../../../actions/masterAction";

const EditProvince = (props) => {
  const {
    showModalProvince,
    handleCloseEditProvince,
    msg,
    setMsg,
    register,
    countryName,
    countryId,
    provinceName,
    setProvinceName,
    provinceId,
    resetField,
    handleSubmit,
    errors,
  } = props;

  const { updateProvResult, updateProvError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isEditProv, setIsEditProv] = useState(false);

  const handleEditProv = (data) => {
    const dataJson = {
      prov_country_id: countryId,
      prov_name: data.prov_name,
    };

    setIsEditProv(true);
    dispatch(updateProvince(dataJson, provinceId));
  };

  useEffect(() => {
    if (updateProvResult || updateProvError) {
      if (isEditProv) {
        updateProvResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateProvResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("regionName");
              resetField("regionId");
              resetField("countryName");
              resetField("countryId");
              setMsg("");
              handleCloseEditProvince(true);
            })
          : setMsg(updateProvError);
      }
    }
    // eslint-disable-next-line
  }, [updateProvResult, updateProvError]);
  return (
    <Modal show={showModalProvince} onHide={handleCloseEditProvince}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Province</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleEditProv)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formCountryName">
              Country Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formCountryName"
                defaultValue={countryName}
                readOnly
              />
              <Form.Control
                type="hidden"
                id="formCountryName"
                defaultValue={countryId}
                {...register("country_region_id")}
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
                defaultValue={provinceName}
                onChange={(e) => setProvinceName(e.target.value)}
                autoComplete="off"
              />
            </Col>
            {errors && errors ? (
              <>
                <Form.Label column sm="4" htmlFor="formProvName"></Form.Label>
                <Col sm="6">
                  <Form.Text className="text-danger" id="formProvName">
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
          <Button variant="secondary" onClick={handleCloseEditProvince}>
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

export default EditProvince;
