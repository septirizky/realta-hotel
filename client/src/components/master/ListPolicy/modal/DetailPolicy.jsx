import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DetailPolicy = (props) => {
  const {
    showModalPolicy,
    handleCloseDetailPolicy,
    policyId,
    policyName,
    policyDescription,
    setPolicyId,
    setPolicyName,
    setPolicyDescription,
  } = props;

  return (
    <Modal show={showModalPolicy} onHide={handleCloseDetailPolicy}>
      <Modal.Header closeButton>
        <Modal.Title>Detail Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-2">
          <Form.Group as={Row} className="mb-3">
            <Form.Control
              type="hidden"
              value={policyId}
              onChange={(e) => setPolicyId(e.target.value)}
            />
            <Form.Label column sm="4" htmlFor={`formPlaintextName${policyId}`}>
              Policy Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                plaintext
                disabled
                defaultValue={policyName}
                id={`formPlaintextName${policyId}`}
                onChange={(e) => setPolicyName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor={`formPlaintextDesc${policyId}`}>
              Policy Description
            </Form.Label>
            <Form.Control
              as="textarea"
              disabled
              defaultValue={policyDescription}
              id={`formPlaintextDesc${policyId}`}
              onChange={(e) => setPolicyDescription(e.target.value)}
              rows={5}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDetailPolicy}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailPolicy;
