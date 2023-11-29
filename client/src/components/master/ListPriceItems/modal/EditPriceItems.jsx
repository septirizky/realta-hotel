import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateItemPrice } from "../../../../actions/masterAction";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const EditPriceItems = (props) => {
  const {
    showModalItemPrice,
    handleCloseEditItemPrice,
    itemPriceId,
    itemPriceName,
    setItemPriceName,
    itemPricePrit,
    setItemPricePrit,
    itemPriceDescription,
    setItemPriceDescription,
    itemPriceType,
    setItemPriceType,
    itemPriceIcon,
    image,
    setImage,
  } = props;

  const { handleSubmit } = useForm();

  const { updateIPriceResult, updateIPriceError } = useSelector(
    (state) => state.masterReducer
  );

  const [preview, setPreview] = useState("");

  const [isUpdateItemPrice, setIsUpdateItemPrice] = useState(false);

  const dispatch = useDispatch();

  const [isUpdateImage, setIsUpdateImage] = useState(false);

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setIsUpdateImage(true);
      setImage(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const handleUpdateItemPrice = () => {
    const formData = new FormData();
    formData.append("prit_name", itemPriceName);
    formData.append("prit_price", itemPricePrit);
    formData.append("prit_description", itemPriceDescription);
    formData.append("prit_type", itemPriceType);
    formData.append("prit_icon", image);
    setIsUpdateItemPrice(true);
    dispatch(updateItemPrice(itemPriceId, formData));
  };

  useEffect(() => {
    if (updateIPriceResult || updateIPriceError) {
      if (isUpdateItemPrice) {
        updateIPriceResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateIPriceResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              setItemPriceName("");
              setItemPricePrit("");
              setItemPriceDescription("");
              setItemPriceType("");
              setImage("");
              setPreview("");
              setIsUpdateImage(false);
              handleCloseEditItemPrice(false);
            })
          : Swal.fire("Gagal", updateIPriceError, "error");
      }
    }
    // eslint-disable-next-line
  }, [updateIPriceResult, updateIPriceError]);

  return (
    <Modal show={showModalItemPrice} onHide={handleCloseEditItemPrice}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Price Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdateItemPrice)} className="px-2">
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Control type="hidden" value={itemPriceId}></Form.Control>
            <Form.Label
              column
              sm="4"
              htmlFor={`formPriceItemName${itemPriceId}`}
            >
              Item Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                id={`formPriceItemName${itemPriceId}`}
                value={itemPriceName}
                onChange={(e) => setItemPriceName(e.target.value)}
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
              <Form.Select
                aria-label="Select Type"
                id={`formPlaintextItemPriceType${itemPriceId}`}
                value={itemPriceType}
                onChange={(e) => setItemPriceType(e.target.value)}
              >
                <option value="">Select Your Type</option>
                <option value="Softdrink">Softdrink</option>
                <option value="Snack">Snack</option>
                <option value="Food">Food</option>
                <option value="Facility">Facility</option>
                <option value="Service">Service</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label
              column
              sm="4"
              htmlFor={`formPriceItemPrice${itemPriceId}`}
            >
              Price
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                id={`formPriceItemPrice${itemPriceId}`}
                value={itemPricePrit}
                onChange={(e) => setItemPricePrit(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor={`formPriceItemDesc${itemPriceId}`}>
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              id={`formPriceItemDesc${itemPriceId}`}
              rows={5}
              value={itemPriceDescription}
              onChange={(e) => setItemPriceDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor={`formPriceItemImage${itemPriceId}`}>
              Choice your image
            </Form.Label>
            <Form.Control
              type="file"
              id={`formPriceItemImage${itemPriceId}`}
              onChange={loadImage}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Row>
              {isUpdateImage ? (
                <Col xs={6} md={4}>
                  <Image src={preview} width={150} height={150} roundedCircle />
                </Col>
              ) : (
                <Col xs={6} md={4}>
                  <Image
                    src={itemPriceIcon}
                    width={150}
                    height={150}
                    roundedCircle
                  />
                </Col>
              )}
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditItemPrice}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditPriceItems;
