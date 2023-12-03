import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_Menu } from "../../../actions/restoaction";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DeleteMenu = (props) => {
  const {
    showModalMenu,
    handleCloseDeleteMenu,
    menuName,
    menuId,
    handleSubmit,
  } = props;

  const { deleteMenuResult, deleteMenuError } = useSelector(
    (state) => state.restoReducer
  );

  const [isDeleteMenu, setIsDeleteMenu] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteMenu();
    setIsDeleteMenu(true);
    dispatch(delete_Menu(menuId));
  };

  useEffect(() => {
    if (deleteMenuResult || deleteMenuError) {
      if (isDeleteMenu) {
        deleteMenuResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteMenuResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteMenu(false);
            })
          : Swal.fire("Gagal", deleteMenuError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteMenuResult, deleteMenuError]);

  return (
    <Modal show={showModalMenu} onHide={handleCloseDeleteMenu}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Menu</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="reme_id" value={menuId} />
          Are you sure want delete Menu {menuName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteMenu}>
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteMenu;
