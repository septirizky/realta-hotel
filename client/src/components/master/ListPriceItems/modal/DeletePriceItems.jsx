import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemPrice } from "../../../../actions/masterAction";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const DeletePriceItems = (props) => {
  const {
    showModalItemPrice,
    handleCloseDeleteItemPrice,
    itemPriceId,
    itemPriceName,
  } = props;

  const { handleSubmit } = useForm();

  const [isDeleteItemPrice, setIsDeleteItemPrice] = useState(false);

  const { deleteIPriceResult, deleteIPriceError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteItemPrice();
    setIsDeleteItemPrice(true);
    dispatch(deleteItemPrice(itemPriceId));
  };

  useEffect(() => {
    if (deleteIPriceResult || deleteIPriceError) {
      if (isDeleteItemPrice) {
        deleteIPriceResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteIPriceResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteItemPrice(false);
            })
          : Swal.fire("Gagal", deleteIPriceError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteIPriceResult, deleteIPriceError]);
  return (
    <Modal show={showModalItemPrice} onHide={handleCloseDeleteItemPrice}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Price Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="prit_id" value={itemPriceId} />
          Are you sure want delete Policy {itemPriceName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteItemPrice}>
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

export default DeletePriceItems;
