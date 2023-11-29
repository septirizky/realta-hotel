import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deletePolicy } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const DeletePolicy = (props) => {
  const {
    showModalPolicy,
    handleCloseDeletePolicy,
    policyName,
    policyId,
    handleSubmit,
  } = props;

  const [isDeletePolicy, setIsDeletePolicy] = useState(false);

  const { deletePolicyResult, deletePolicyError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeletePolicy();
    setIsDeletePolicy(true);
    dispatch(deletePolicy(policyId));
  };

  useEffect(() => {
    if (deletePolicyResult || deletePolicyError) {
      if (isDeletePolicy) {
        deletePolicyResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deletePolicyResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeletePolicy(false);
            })
          : Swal.fire("Gagal", deletePolicyError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deletePolicyResult, deletePolicyError]);
  return (
    <Modal show={showModalPolicy} onHide={handleCloseDeletePolicy}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Policy</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="poli_id" value={policyId} />
          Are you sure want delete Policy {policyName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeletePolicy}>
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

export default DeletePolicy;
