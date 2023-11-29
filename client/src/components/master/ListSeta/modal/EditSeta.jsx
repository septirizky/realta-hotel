import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { updateSeta } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const EditSeta = (props) => {
  const {
    showModalSeta,
    handleCloseEditSeta,
    register,
    resetField,
    handleSubmit,
    setaId,
    setSetaId,
    setaName,
    setSetaName,
    setaSeq,
    setSetaSeq,
  } = props;

  const { updateSetaResult, updateSetaError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isUpdateSeta, setIsUpdateSeta] = useState(false);

  const handleUpdateSeta = (data) => {
    const dataJson = {
      seta_name: data.seta_name,
      seta_seq: data.seta_seq,
    };
    setIsUpdateSeta(true);
    dispatch(updateSeta(dataJson, setaId));
  };

  useEffect(() => {
    if (updateSetaResult || updateSetaError) {
      if (isUpdateSeta) {
        updateSetaResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: updateSetaResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("seta_id");
              resetField("seta_name");
              resetField("seta_seq");
              handleCloseEditSeta(false);
            })
          : Swal.fire("Gagal", updateSetaError, "error");
      }
    }
    // eslint-disable-next-line
  }, [updateSetaResult, updateSetaError]);
  return (
    <Modal show={showModalSeta} onHide={handleCloseEditSeta}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdateSeta)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formSetaName">
              Task Name
            </Form.Label>
            <Form.Control
              type="hidden"
              value={setaId}
              onChange={(e) => setSetaId(e.target.value)}
            />
            <Col sm="6">
              <Form.Control
                type="text"
                id="formSetaName"
                {...register("seta_name")}
                value={setaName}
                onChange={(e) => setSetaName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formSetaSeq">
              Sequence Order
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formSetaSeq"
                {...register("seta_seq")}
                value={setaSeq}
                onChange={(e) => setSetaSeq(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditSeta}>
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

export default EditSeta;
