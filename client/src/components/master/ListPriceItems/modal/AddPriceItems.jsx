import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postItemPrice } from "../../../../actions/masterAction";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const AddPriceItems = (props) => {
  const {
    showModalItemPrice,
    handleCloseAddItemPrice,
    image,
    setImage,
    preview,
    setPreview,
  } = props;

  const { postIPriceResult, postIPriceError } = useSelector(
    (state) => state.masterReducer
  );

  const [hasil, setHasil] = useState({
    prit_name: "",
    prit_price: "",
    prit_description: "",
    prit_type: "",
  });

  const [isAddItemPrice, setIsAddItemPrice] = useState(false);

  const dispatch = useDispatch();

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImage(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const { handleSubmit } = useForm();

  const handleSaveItemPrice = () => {
    const formData = new FormData();
    formData.append("prit_name", hasil.prit_name);
    formData.append("prit_price", hasil.prit_price);
    formData.append("prit_description", hasil.prit_description);
    formData.append("prit_type", hasil.prit_type);
    formData.append("prit_icon", image);
    setIsAddItemPrice(true);
    dispatch(postItemPrice(formData));
  };

  useEffect(() => {
    if (postIPriceResult || postIPriceError) {
      if (isAddItemPrice) {
        postIPriceResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: postIPriceResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              setHasil({
                prit_name: "",
                prit_price: "",
                prit_description: "",
                prit_type: "",
              });
              setImage("");
              setPreview("");
              handleCloseAddItemPrice(false);
            })
          : Swal.fire("Gagal", postIPriceError, "error");
      }
    }
    // eslint-disable-next-line
  }, [postIPriceResult, postIPriceError]);
  return (
    <Modal show={showModalItemPrice} onHide={handleCloseAddItemPrice}>
      <Modal.Header closeButton>
        <Modal.Title>Add Price Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveItemPrice)} className="px-2">
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formPriceItemName">
              Item Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                id="formPriceItemName"
                onChange={(e) =>
                  setHasil({ ...hasil, prit_name: e.target.value })
                }
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formPriceItemType">
              Type
            </Form.Label>
            <Col sm="8">
              <Form.Select
                aria-label="Select Type"
                id="formPriceItemType"
                onChange={(e) =>
                  setHasil({ ...hasil, prit_type: e.target.value })
                }
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
            <Form.Label column sm="4" htmlFor="formPriceItemPrice">
              Price
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                id="formPriceItemPrice"
                onChange={(e) =>
                  setHasil({ ...hasil, prit_price: e.target.value })
                }
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="formPriceItemDesc">Description</Form.Label>
            <Form.Control
              as="textarea"
              id="formPriceItemDesc"
              rows={5}
              onChange={(e) =>
                setHasil({ ...hasil, prit_description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="formPriceItemImage">
              Choice your image
            </Form.Label>
            <Form.Control
              type="file"
              id="formPriceItemImage"
              onChange={loadImage}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Row>
              {preview ? (
                <Col xs={6} md={4}>
                  <Image src={preview} width={150} height={150} roundedCircle />
                </Col>
              ) : (
                <Col xs={6} md={4}>
                  <Image
                    src="https://pkmdurenseribu.depok.go.id/assets/images/default.jpg"
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
          <Button variant="secondary" onClick={handleCloseAddItemPrice}>
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

export default AddPriceItems;
