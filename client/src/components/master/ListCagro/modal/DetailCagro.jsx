import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const DetailCagro = (props) => {
  const {
    showModalCagro,
    handleCloseDetailCagro,
    cagroId,
    cagroName,
    cagroType,
    cagroDesc,
    cagroIcon,
    policyName,
  } = props;

  return (
    <Modal show={showModalCagro} onHide={handleCloseDetailCagro}>
      <Modal.Header closeButton>
        <Modal.Title>Detail Category Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-2">
          <Form.Group as={Row} className="mb-3">
            <Form.Control type="hidden" value={cagroId} />
            <Form.Label column sm="4" htmlFor={`formPlaintextName${cagroId}`}>
              Category Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                plaintext
                disabled
                id={`formPlaintextName${cagroId}`}
                defaultValue={cagroName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor={`formPlaintextType${cagroId}`}>
              Type
            </Form.Label>
            <Col sm="8">
              <Form.Control
                plaintext
                disabled
                id={`formPlaintextType${cagroId}`}
                defaultValue={cagroType}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              sm="4"
              htmlFor={`formPlaintextPoliName${cagroId}`}
            >
              Policy Rules
            </Form.Label>
            <Col sm="8">
              <Form.Control
                plaintext
                disabled
                id={`formPlaintextPoliName${cagroId}`}
                defaultValue={policyName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor={`formPlaintextDesc${cagroId}`}>
              Description
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                disabled
                id={`formPlaintextDesc${cagroId}`}
                defaultValue={cagroDesc}
                rows={5}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Row>
              <Col xs={6} md={4}>
                <Image src={cagroIcon} width={150} height={150} roundedCircle />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDetailCagro}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailCagro;
