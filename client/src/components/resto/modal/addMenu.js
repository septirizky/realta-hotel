import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_Menu } from "../../../actions/restoaction.js";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddMenu = (props) => {
  const {
    showModalMenu,
    handleCloseAddMenu,
    register,
    resetField,
    handleSubmit,
  } = props;

  const { addMenuResult, addMenuError } = useSelector(
    (state) => state.restoReducer
  );

  const dispatch = useDispatch();

  const [isAddMenu, setIsAddMenu] = useState(false);

  const handleSaveMenu = (data) => {
    const dataJson = {
      res_menu: data.reme_name,
      price: data.reme_price,
      stats: data.reme_status,
      type: data.reme_type,
      description: data.reme_description
    };
    setIsAddMenu(true);
    dispatch(add_Menu(dataJson));
  };

  useEffect(() => {
    if (addMenuResult || addMenuError) {
      if (isAddMenu) {
        addMenuResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: addMenuResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("reme_name");
              resetField("reme_price");
              resetField("reme_status");
              resetField("reme_type");
              resetField("reme_description");
              
              handleCloseAddMenu(false);
            })
          : Swal.fire("Gagal", addMenuError, "error");
      }
    }
    // eslint-disable-next-line
  }, [addMenuResult, addMenuError]);
  return (
    <Modal show={showModalMenu} onHide={handleCloseAddMenu}>
      <Modal.Header closeButton>
        <Modal.Title>Add Menu</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveMenu)} className="px-2">
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formMenuName">
              Menu Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                placeholder="Name"
                type="text"
                id="formMenuName"
                {...register("reme_name")}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formMenuPrice">
              Price
            </Form.Label>
            <Col sm="6">
              <Form.Control
                placeholder="Price"
                type="text"
                id="formMenuPrice"
                {...register("reme_price")}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formMenuType">
              Type
            </Form.Label>
            <Col sm="6">
              <Form.Control
                placeholder="Type"
                type="text"
                id="formMenuType"
                {...register("reme_type")}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formMenuStatus">
              Status
            </Form.Label>
            <Col sm="6">
            <Form.Select
                className="form-select"
                id="addMenu"
                {...register("reme_status")}
              >
                <option value="Available">Available</option>
                <option value="Empty">Empty</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="6" htmlFor="formMenuDesc">
              Menu Description
            </Form.Label>
            <Form.Control
              as="textarea"
              id="formMenuDesc"
              maxLength={255}
              {...register("reme_description")}
              rows={5}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddMenu}>
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

export default AddMenu;
