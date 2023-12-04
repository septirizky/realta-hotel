/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import {
  GetStockDetail,
  GetHotel,
  GetHotelbyId,
} from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

const StockDetail = () => {
  const [status, setStatus] = useState("");
  const [used, setUsed] = useState("");
  const [idstock, setId] = useState("");
  const [faciid, setFaciId] = useState("");
  const { id } = useParams();
  let active = "";

  const {
    getStockDetailResult,
    getStockDetailLoading,
    getStockDetailError,
    getHotelResult,
    getHotelLoading,
    getHotelError,
  } = useSelector((state) => state.PurchaseReducer);
  console.log(getStockDetailResult, "detail");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetStockDetail(id));
    dispatch(GetHotel());
  }, [dispatch, id]);

  //modal edit

  const [edit, setEdit] = useState(false);
  const handleEditC = () => setEdit(false);
  const editStock = async (id) => {
    try {
      setEdit(true);
      const response = await axios.get(
        `http://localhost:4000/detailinfostockbyid/${id}`
      );
      const data = await response.data.data;
      console.log(data, "detail");
      setId(data.stod_id);
    } catch (error) {
      console.log(error.message);
    }
  };

  //edistockdetai
  const editVendor = (event) => {
    event.preventDefault();
    console.log(status, used, id);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `http://localhost:4000/updatestockdetail/${idstock}`,
          timeout: 12000,
          data: {
            stod_status: status,
            stod_faci_id: used,
          },
        }).then((response) => {
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
            });
            setEdit(false);
            dispatch(GetStockDetail(id));
            setStatus("");
            setUsed("");
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
          setEdit(false);
          setStatus("");
          setUsed("");
        });
      }
    });
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/stock">Stock</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Stock Detail</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
          <div className="w-100">
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Barcode</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>PO NUmber</th>
                    <th>Used In</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getStockDetailResult ? (
                    getStockDetailResult.map((vendor, index) => (
                      <tr key={index}>
                        <td>{vendor.stod_barcode_number}</td>
                        <td>
                          {" "}
                          {vendor.stod_status == 1
                            ? (active = "stocked")
                            : vendor.stod_status == 2
                            ? (active = "expired")
                            : vendor.stod_status == 3
                            ? (active = "broken")
                            : vendor.stod_status == 4
                            ? (active = "used")
                            : null}
                        </td>
                        <td>{vendor.stod_notes}</td>
                        <td>{vendor.pohe_number}</td>
                        <td>{vendor.faci_room_number}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-dark"
                            onClick={() => editStock(vendor.stod_id)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : getStockDetailLoading ? (
                    <p> Loading . . .</p>
                  ) : (
                    <p>
                      {" "}
                      {getStockDetailError
                        ? getStockDetailError
                        : "Data Kosong"}
                    </p>
                  )}
                </tbody>
              </table>
            </>

            <Modal show={edit} onHide={handleEditC}>
              <Modal.Header closeButton>
                <Modal.Title>Switch Status</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form id="create-course-form">
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option></option>
                      <option value="1">1-Stocked</option>
                      <option value="2">2-Expired</option>
                      <option value="3">3-Broken</option>
                      <option value="4">4-Used</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                    style={{ display: "none" }}
                  >
                    <Form.Label>Stock Description</Form.Label>
                    <Form.Control
                      type="email"
                      value={idstock}
                      onChange={(e) => setId(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Used In</Form.Label>
                    <Form.Control
                      as="select"
                      autoFocus
                      value={used}
                      onChange={(e) => {
                        setUsed(e.target.value);
                      }}
                    >
                      <option></option>
                      {getHotelResult ? (
                        getHotelResult.map((x, y) => (
                          <option value={x.faci_id} key={x.faci_id}>
                            {x.faci_room_number}
                          </option>
                        ))
                      ) : getHotelLoading ? (
                        <p> Loading . . .</p>
                      ) : (
                        <p> {getHotelError ? getHotelError : "Data Kosong"}</p>
                      )}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleEditC}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={editVendor}>
                  Simpan
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </MDBBreadcrumb>
      </MDBContainer>
    </section>
  );
};

export default StockDetail;
