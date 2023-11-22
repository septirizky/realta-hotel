import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPolicy } from "../../../../actions/masterAction";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddPolicy = (props) => {
  const {
    showModalPolicy,
    handleCloseAddPolicy,
    register,
    resetField,
    handleSubmit,
  } = props;

  const { postPolicyResult, postPolicyError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isAddPolicy, setIsAddPolicy] = useState(false);

  const handleSavePolicy = (data) => {
    const dataJson = {
      poli_name: data.poli_name,
      poli_description: data.poli_description,
    };
    setIsAddPolicy(true);
    dispatch(postPolicy(dataJson));
  };

  useEffect(() => {
    if (postPolicyResult || postPolicyError) {
      if (isAddPolicy) {
        postPolicyResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: postPolicyResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("poli_name");
              resetField("poli_description");
              handleCloseAddPolicy(false);
            })
          : Swal.fire("Gagal", postPolicyError, "error");
      }
    }
    // eslint-disable-next-line
  }, [postPolicyResult, postPolicyError]);
  return (
    <Modal show={showModalPolicy} onHide={handleCloseAddPolicy}>
      <Modal.Header closeButton>
        <Modal.Title>Add Policy</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSavePolicy)} className="px-2">
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formPolicyName">
              Policy Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formPolicyName"
                {...register("poli_name")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="6" htmlFor="formPolicyDesc">
              Policy Description
            </Form.Label>
            <Form.Control
              as="textarea"
              id="formPolicyDesc"
              {...register("poli_description")}
              rows={5}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddPolicy}>
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

export default AddPolicy;
