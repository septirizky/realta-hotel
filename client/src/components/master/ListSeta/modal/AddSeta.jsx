import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { postSeta } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const AddSeta = (props) => {
  const {
    showModalSeta,
    handleCloseAddSeta,
    register,
    resetField,
    handleSubmit,
  } = props;

  const { postSetaResult, postSetaError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const [isAddSeta, setIsAddSeta] = useState(false);

  const handleSaveSeta = (data) => {
    const dataJson = {
      seta_name: data.seta_name,
      seta_seq: data.seta_seq,
    };
    setIsAddSeta(true);
    dispatch(postSeta(dataJson));
  };

  useEffect(() => {
    if (postSetaResult || postSetaError) {
      if (isAddSeta) {
        postSetaResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: postSetaResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              resetField("seta_name");
              resetField("seta_seq");
              handleCloseAddSeta(false);
            })
          : Swal.fire("Gagal", postSetaError, "error");
      }
    }
    // eslint-disable-next-line
  }, [postSetaResult, postSetaError]);
  return (
    <Modal show={showModalSeta} onHide={handleCloseAddSeta}>
      <Modal.Header closeButton>
        <Modal.Title>Add Service Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleSaveSeta)}>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formSetaName">
              Task Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="text"
                id="formSetaName"
                {...register("seta_name")}
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
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddSeta}>
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

export default AddSeta;
