import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { postRegions } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const AddRegion = (props) => {
  const {
    showModalRegion,
    handleCloseAddRegion,
    msg,
    setMsg,
    register,
    resetField,
    handleSubmit,
    errors,
  } = props;

  const { postRegionResult, postRegionError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isAddRegion, setIsAddRegion] = useState(false);

  const handleSaveRegion = (data) => {
    const dataJson = {
      region_name: data.region_name,
    };
    setIsAddRegion(true);
    dispatch(postRegions(dataJson));
  };

  useEffect(() => {
    if (postRegionResult || postRegionError) {
      if (isAddRegion) {
        postRegionResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: postRegionResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("region_name");
              setMsg("");
              handleCloseAddRegion(false);
            })
          : setMsg(postRegionError);
      }
    }
    // eslint-disable-next-line
  }, [postRegionResult, postRegionError]);

  return (
    <Modal show={showModalRegion} onHide={handleCloseAddRegion}>
      <Modal.Header closeButton>
        <Modal.Title>Add Region</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveRegion)}>
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
          <Button variant="secondary" onClick={handleCloseAddRegion}>
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

export default AddRegion;
