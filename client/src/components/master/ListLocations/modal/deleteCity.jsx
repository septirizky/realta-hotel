import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteCity } from "../../../../actions/masterAction";
import Swal from "sweetalert2";

const DeleteCity = (props) => {
  const {
    showModalCity,
    handleCloseDeleteCity,
    cityId,
    cityName,
    handleSubmit,
  } = props;

  const [isDeleteCity, setIsDeleteCity] = useState(false);

  const { deleteCityResult, deleteCityError } = useSelector(
    (state) => state.masterReducer
  );

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleCloseDeleteCity();
    setIsDeleteCity(true);
    dispatch(deleteCity(cityId));
  };

  useEffect(() => {
    if (deleteCityResult || deleteCityError) {
      if (isDeleteCity) {
        deleteCityResult
          ? Swal.fire({
              title: "Sukses",
              icon: "success",
              text: deleteCityResult.message,
              confirmButtonText: "OK",
            }).then(() => {
              handleCloseDeleteCity(false);
            })
          : Swal.fire("Gagal", deleteCityError, "error");
      }
    }
    // eslint-disable-next-line
  }, [deleteCityResult, deleteCityError]);
  return (
    <Modal show={showModalCity} onHide={handleCloseDeleteCity}>
      <Modal.Header closeButton>
        <Modal.Title>Delete City</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleDelete)}>
        <Modal.Body>
          <input type="hidden" name="city_id" value={cityId} />
          Are you sure want delete City {cityName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteCity}>
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

export default DeleteCity;
