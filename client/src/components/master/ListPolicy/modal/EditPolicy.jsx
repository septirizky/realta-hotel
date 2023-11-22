import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePolicy } from "../../../../actions/masterAction";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditPolicy = (props) => {
  const {
    showModalPolicy,
    handleCloseEditPolicy,
    register,
    resetField,
    handleSubmit,
    policyId,
    policyName,
    policyDescription,
    setPolicyName,
    setPolicyDescription,
  } = props;

  const { updatePolicyResult, updatePolicyError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isUpdatePolicy, setIsUpdatePolicy] = useState(false);

  const handleUpdatePolicy = (data) => {
    const dataJson = {
      poli_name: data.poli_name,
      poli_description: data.poli_description,
    };

    setIsUpdatePolicy(true);
    dispatch(updatePolicy(dataJson, policyId));
  };

  useEffect(() => {
    if (updatePolicyResult || updatePolicyError) {
      if (isUpdatePolicy) {
        updatePolicyResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updatePolicyResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("poli_id");
              resetField("poli_name");
              resetField("poli_description");
              handleCloseEditPolicy(false);
            })
          : Swal.fire("Gagal", updatePolicyError, "error");
      }
    }
    // eslint-disable-next-line
  }, [updatePolicyResult, updatePolicyError]);
  return (
    <Modal show={showModalPolicy} onHide={handleCloseEditPolicy}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Policy</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdatePolicy)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formPolicyName">
              Policy Name
            </Form.Label>
            <Col sm="6">
              <Form.Control type="hidden" value={policyId} />
              <Form.Control
                type="text"
                id="formPolicyName"
                {...register("poli_name")}
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
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
              value={policyDescription}
              onChange={(e) => setPolicyDescription(e.target.value)}
              maxLength={255}
              rows={5}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditPolicy}>
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

export default EditPolicy;
