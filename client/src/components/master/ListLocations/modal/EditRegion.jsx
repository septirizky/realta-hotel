import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { updateRegions } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const EditRegion = (props) => {
  const {
    showModalRegion,
    handleCloseEditRegion,
    msg,
    setMsg,
    register,
    resetField,
    handleSubmit,
    errors,
    setRegionName,
    regionName,
    regionId,
  } = props;

  const { updateRegionResult, updateRegionError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isUpdateRegion, setIsUpdateRegion] = useState(false);

  const handleUpdateRegion = (data) => {
    const dataJson = {
      region_name: data.region_name,
    };
    setIsUpdateRegion(true);
    dispatch(updateRegions(dataJson, regionId));
  };

  useEffect(() => {
    if (updateRegionResult || updateRegionError) {
      if (isUpdateRegion) {
        updateRegionResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateRegionResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("region_name");
              setMsg("");
              handleCloseEditRegion(false);
            })
          : setMsg(updateRegionError);
      }
    }
    // eslint-disable-next-line
  }, [updateRegionResult, updateRegionError]);

  return (
    <Modal show={showModalRegion} onHide={handleCloseEditRegion}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Region</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdateRegion)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formRegionName">
              Region Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formRegionName"
                {...register("region_name")}
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
              />
            </Col>
            {errors && errors ? (
              <>
                <Form.Label column sm="4" htmlFor="formRegionName"></Form.Label>
                <Col sm="6">
                  <Form.Text className="text-danger" id="formRegionName">
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
          <Button variant="secondary" onClick={handleCloseEditRegion}>
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

export default EditRegion;
