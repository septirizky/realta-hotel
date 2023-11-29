import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const DetailPriceItems = (props) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const {
    showModalItemPrice,
    handleCloseDetailItemPrice,
    itemPriceId,
    itemPriceName,
    itemPricePrit,
    itemPriceDescription,
    itemPriceType,
    itemPriceIcon,
  } = props;

  return (
    <Modal show={showModalItemPrice} onHide={handleCloseDetailItemPrice}>
      <Modal.Header closeButton>
        <Modal.Title>Detail Price Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-2">
          <Form.Group as={Row} className="mb-3">
            <Form.Control type="hidden" value={itemPriceId}></Form.Control>
            <Form.Label
              column
              sm="4"
              htmlFor={`formPlaintextItemPriceName${itemPriceId}`}
            >
              Item Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                plaintext
                disabled
                id={`formPlaintextItemPriceName${itemPriceId}`}
                defaultValue={itemPriceName}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              sm="4"
              htmlFor={`formPlaintextItemPricePrit${itemPriceId}`}
            >
              Price
            </Form.Label>
            <Col sm="8">
              <Form.Control
                plaintext
                disabled
                id={`formPlaintextItemPricePrit${itemPriceId}`}
                defaultValue={formatRupiah(itemPricePrit)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              sm="4"
              htmlFor={`formPlaintextItemPriceDesc${itemPriceId}`}
            >
              Description
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                disabled
                id={`formPlaintextItemPriceDesc${itemPriceId}`}
                defaultValue={itemPriceDescription}
                rows={5}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              sm="4"
              htmlFor={`formPlaintextItemPriceType${itemPriceId}`}
            >
              Type
            </Form.Label>
            <Col sm="8">
              <Form.Control
                plaintext
                disabled
                id={`formPlaintextItemPriceType${itemPriceId}`}
                defaultValue={itemPriceType}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Row>
              <Col xs={6} md={4}>
                <Image
                  src={itemPriceIcon}
                  width={150}
                  height={150}
                  roundedCircle
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDetailItemPrice}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailPriceItems;
