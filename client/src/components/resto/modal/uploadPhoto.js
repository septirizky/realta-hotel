import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { add_Photo } from "../../../actions/restoaction.js";

const Upload = (props) => {
  const {
    showModalPhoto,
    handleCloseAddPhoto,
    register,
    handleSubmit,
    reset,
    params_reme_id,
    setValue,
  } = props;

  const { addPhotoResult, addPhotoError } = useSelector(
    (state) => state.restoReducer
  );

  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   setFile(e.target.files);
  // };

  const [isAddPhoto, setIsAddPhoto] = useState(false);

  const handleUpload = (data) => {
    const formData = new FormData();
    console.log(data.remp_photo_filename);
    for (let i = 0; i < data.remp_photo_filename.length; i++) {
      formData.append('files', data.remp_photo_filename[i]);
    }
    formData.append('primary', 0);
    formData.append('reme_id', data.remp_reme_id);

    setIsAddPhoto(true);
    dispatch(add_Photo(formData));
  };

  useEffect(() => {
    if (addPhotoResult || addPhotoError) {
      if (isAddPhoto) {
        addPhotoResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: addPhotoResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              reset();
              handleCloseAddPhoto(false);
            })
          : Swal.fire("Gagal", addPhotoError, "error");
      }
    }
    setValue("remp_reme_id", params_reme_id);
    // eslint-disable-next-line
  }, [addPhotoResult, addPhotoError, params_reme_id]);
  return (
    <Modal show={showModalPhoto} onHide={handleCloseAddPhoto}>
      <Modal.Header closeButton>
        <Modal.Title>Add Photo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpload)} className="px-2">
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" htmlFor="formPhotoName">
              Photo Name
            </Form.Label>
            <Col sm="6">
              <Form.Control
                placeholder="Name"
                type="file"
                multiple
                id="formPhotoName"
                {...register("remp_photo_filename")}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddPhoto}>
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

export default Upload;
