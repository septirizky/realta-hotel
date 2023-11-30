import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_Menu } from "../../../actions/restoaction.js";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditMenu = (props) => {
  const {
    showModalMenu,
    handleCloseEditMenu,
    register,
    resetField,
    handleSubmit,
    menuId,
    menuName,
    menuPrice,
    menuType,
    menuStatus,
    setMenuId,
    setMenuName,
    setPrice,
    setType,
    setStatus,
  } = props;

  const { updateMenuResult, updateMenuError } = useSelector(
    (state) => state.restoReducer
  );

  const dispatch = useDispatch();

  const [isUpdateMenu, setIsUpdateMenu] = useState(false);

  const handleUpdateMenu = (data) => {
    const dataJson = {
      rem_id : data.reme_id,  
      res_menu: data.reme_name,
      price: data.reme_price,
      type: data.reme_type,
      stats: data.reme_status,
    };

    setIsUpdateMenu(true);
    dispatch(update_Menu(dataJson, menuId));
  };

  useEffect(() => {
    if (updateMenuResult || updateMenuError) {
      if (isUpdateMenu) {
        updateMenuResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateMenuResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("reme_id");
              resetField("reme_name");
              resetField("reme_price");
              resetField("reme_type");
              resetField("reme_status");
              handleCloseEditMenu(false);
            })
          : Swal.fire("Gagal", updateMenuError, "error");
      }
    }
    // eslint-disable-next-line
  }, [updateMenuResult, updateMenuError]);
  return (
    <Modal show={showModalMenu} onHide={handleCloseEditMenu}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Menu</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdateMenu)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formMenuId">
              Menu Id
            </Form.Label>
            <Col sm="6">
              <Form.Control type="hidden" value={menuId} />
              <Form.Control
                type="text"
                id="formMenuId"
                {...register("reme_id")}
                value={menuId}
                onChange={(e) => setMenuId(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formMenuName">
              Menu Name
            </Form.Label>
            <Col sm="6">
              <Form.Control type="hidden" value={menuName} />
              <Form.Control
                type="text"
                id="formMenuName"
                {...register("reme_name")}
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formPrice">
              Price
            </Form.Label>
            <Col sm="6">
              <Form.Control type="hidden" value={menuPrice} />
              <Form.Control
                type="text"
                id="formPrice"
                {...register("reme_price")}
                value={menuPrice}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formMenuType">
              Type
            </Form.Label>
            <Col sm="6">
              <Form.Control type="hidden" value={menuType} />
              <Form.Control
                type="text"
                id="formMenuType"
                {...register("reme_type")}
                value={menuType}
                onChange={(e) => setType(e.target.value)}
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
                id="editMenu"
                {...register("reme_status")}
                value={menuStatus}
              onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Available">Available</option>
                <option value="Empty">Empty</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditMenu}>
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

export default EditMenu;