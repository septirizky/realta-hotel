import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { addPhoto } from "../../../../actions/facilitiesAction";

const Upload = (props) => {
  const {
    showModalPhoto,
    handleCloseAddPhoto,
    register,
    handleSubmit,
    reset,
    params_faci_id,
    setValue,
  } = props;

  const { addPhotoResult, addPhotoError } = useSelector(
    (state) => state.HotelReducer
  );

  const dispatch = useDispatch();

  const [isAddPhoto, setIsAddPhoto] = useState(false);

  const handleUpload = (data) => {
    const formData = new FormData();
    console.log(data.fapho_photo_filename);
    for (let i = 0; i < data.fapho_photo_filename.length; i++) {
      formData.append(`files`, data.fapho_photo_filename[i]);
    }
    formData.append(`primary`, 0);
    formData.append(`faci_id`, data.fapho_faci_id);

    setIsAddPhoto(true);
    dispatch(addPhoto(formData));
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
    setValue("fapho_faci_id", params_faci_id);
    // eslint-disable-next-line
  }, [addPhotoResult, addPhotoError, params_faci_id]);

  return (
    <Modal show={showModalPhoto} onHide={handleCloseAddPhoto}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Photo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpload)} className="px-2">
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Control
              type="file"
              multiple
              id="formPhotoName"
              {...register("fapho_photo_filename")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-dark"
            onClick={handleCloseAddPhoto}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            type="submit"
            className="btn custom-btn-yellow"
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Upload;
