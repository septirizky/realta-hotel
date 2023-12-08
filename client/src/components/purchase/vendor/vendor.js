/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { GetVendor } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate, generatePath } from "react-router-dom";
import "jquery/dist/jquery.min.js";
import { BiPlus } from "react-icons/bi";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

const Vendor = () => {
  const { getVendorResult, getVendorLoading, getVendorError } = useSelector(
    (state) => state.PurchaseReducer
  );
  const [vendor_name, setVendor] = useState("");
  const [status, setStatus] = useState("");
  const [vendro_weburl, setSite] = useState("");
  const [vendor_register_date, setDate] = useState("");
  const [vendor_priority, setPriority] = useState("");
  const [id, setId] = useState("");
  const [formKeyword, setFormKeyword] = useState("");

  //modal add
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //modal edit
  const [edit, setEdit] = useState(false);
  const handleEditC = () => setEdit(false);

  const handleEditS = async (id) => {
    setEdit(true);

    console.log(id, "23dd");
    const response = await axios.get(`http://localhost:4000/vendorbyId/${id}`);
    const data = await response.data.data;
    console.log(data, "123");
    setVendor(data.vendor_name);
    setStatus(data.vendor_active);
    setSite(data.vendro_weburl);
    setDate(data.vendor_register_date);
    setPriority(data.vendor_priority);
    setId(data.vendor_entity_id);
  };

  //Tambah Vendor
  let active = "";
  let priorityy = "";
  const InsertVendor = (event) => {
    event.preventDefault();

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
          url: `http://localhost:4000/insertvendor`,
          timeout: 12000,
          data: {
            vendor_name,
            status,
            vendro_weburl,
            vendor_register_date,
            vendor_priority,
          },
        }).then((response) => {
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
              text: "Login Succes",
            });
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
          setShow(false);
          dispatch(GetVendor());
          setVendor("");
          setStatus("");
          setSite("");
          setDate("");
          setPriority("");
        });
      }
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetVendor({ vendor_name: formKeyword }));
  }, [dispatch]);

  const navigate = useNavigate();
  const addproduct = async (id) => {
    navigate(generatePath("/Purchase/vendor/:id/addproduct", { id: id }));
  };

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EBAB2D",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            method: "DELETE",
            url: `http://localhost:4000/deletevendor/${id}`,
          });

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          dispatch(GetVendor());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  //updatevendor
  const editVendor = async (e) => {
    if (vendor_name == "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Vendor Name Kosong",
      });
      return false;
    } else if (status == "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Status Kosong",
      });
      return false;
    } else if (vendro_weburl == "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "URL Kosong",
      });
      return false;
    } else if (vendor_register_date == "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Register Date Kosong",
      });
      return false;
    } else if (vendor_priority == "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Priority Kosong",
      });
      return false;
    }

    e.preventDefault();
    console.log(id, "23");
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EBAB2D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `http://localhost:4000/updatevendor`,
          timeout: 12000,
          data: {
            vendor_name,
            status,
            vendro_weburl,
            vendor_register_date,
            vendor_priority,
            id,
          },
        }).then((response) => {
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
              text: "Update Succes",
            });
            setEdit(false);
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
          setShow(false);
          dispatch(GetVendor());
          setVendor("");
          setStatus("");
          setSite("");
          setDate("");
          setPriority("");
        });
      }
    });
  };

  return (
    <section>
      {" "}
      <MDBContainer fluid className="p-4">
        <h3>Vendor</h3>
        <MDBRow>
          <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
            <MDBBreadcrumbItem>
              <a href="/Purchase/gallery">Home</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>Vendor</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <div className="row mb-4 justify-content-between">
            <div className="col-sm-3 align-content-center mt-2">
              <button
                type="button"
                className="btn btn-sm btn-warning text-white"
                onClick={handleShow}
              >
                <BiPlus size="26" /> Add Vendor
              </button>
            </div>
            <div className="col-sm-2">
              <div className="form-floating">
                <input
                  type="text"
                  onChange={(e) => setFormKeyword(e.target.value)}
                  value={formKeyword}
                  className="form-control text-dark form-control-sm"
                  id="searchDept"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="searchDept">Search Vendor</label>
              </div>
            </div>
          </div>
        </MDBRow>
        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
          <div className="w-100">
            {" "}
            <>
              {" "}
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th className="col-md-1">No</th>
                    <th className="col-md-1">Vendor</th>
                    <th className="col-md-1">Status</th>
                    <th className="col-md-1">Priority</th>
                    <th className="col-md-1">Register At</th>
                    <th className="col-md-1">Web URL</th>
                    <th className="col-md-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {getVendorResult ? (
                    getVendorResult.map((vendor, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{vendor.vendor_name}</td>
                        <td>
                          {vendor.vendor_active == 1
                            ? (active = "active")
                            : vendor.vendor_active == 0
                            ? (active = "InActive")
                            : null}
                        </td>
                        <td>
                          {" "}
                          {vendor.vendor_priority == 1
                            ? (priorityy = "Highest")
                            : vendor.vendor_priority == 0
                            ? (priorityy = "Lowest")
                            : null}
                        </td>
                        <td>{vendor.vendor_register_date}</td>
                        <td>{vendor.vendro_weburl}</td>
                        <td>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title=""
                            split
                            variant="Secondary"
                          >
                            <Dropdown.Item
                              onClick={() =>
                                handleEditS(vendor.vendor_entity_id)
                              }
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                addproduct(vendor.vendor_entity_id)
                              }
                            >
                              Add Item Product
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                deleteHandler(vendor.vendor_entity_id)
                              }
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  ) : getVendorLoading ? (
                    <p> Loading . . .</p>
                  ) : (
                    <p> {getVendorError ? getVendorError : "Data Kosong"}</p>
                  )}
                </tbody>
              </table>
            </>
          </div>
        </MDBBreadcrumb>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Edit Vendor Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="create-course-form">
              <Form.Group
                className="mb-12"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Vendor</Form.Label>
                <Form.Control
                  type="email"
                  value={vendor_name}
                  onChange={(e) => setVendor(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group controlId="formBasicSelect">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setStatus(e.target.value);
                  }}
                >
                  <option></option>
                  <option value="1">1-Active</option>
                  <option value="0">0-InActive</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Site</Form.Label>
                <Form.Control
                  value={vendro_weburl}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setSite(e.target.value);
                  }}
                  autoFocus
                />
              </Form.Group>
              <Form.Group controlId="duedate">
                <Form.Label>Register Date</Form.Label>
                <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  value={vendor_register_date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicSelect">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={vendor_priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option></option>
                  <option value="1">1-Highest</option>
                  <option value="0">0-Lowest</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="warning" className="text-white" onClick={InsertVendor}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={edit} onHide={handleEditC}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Edit Vendor Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="create-course-form">
              <Form.Group
                className="mb-12"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Vendor</Form.Label>
                <Form.Control
                  type="email"
                  value={vendor_name}
                  onChange={(e) => setVendor(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group controlId="formBasicSelect">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setStatus(e.target.value);
                  }}
                >
                  <option></option>
                  <option value="1">1-Active</option>
                  <option value="0">0-InActive</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Site</Form.Label>
                <Form.Control
                  value={vendro_weburl}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setSite(e.target.value);
                  }}
                  autoFocus
                />
              </Form.Group>
              <Form.Group controlId="duedate">
                <Form.Label>Register Date</Form.Label>
                <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Due date"
                  value={vendor_register_date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="duedate" style={{ display: "none" }}>
                <Form.Label>Register Date</Form.Label>
                <Form.Control type="email" value={id} />
              </Form.Group>
              <Form.Group controlId="formBasicSelect">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={vendor_priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option></option>
                  <option value="1">1-Highest</option>
                  <option value="0">0-Lowest</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditC}>
              Cancel
            </Button>
            <Button variant="warning" className="text-white" onClick={editVendor}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </MDBContainer>
    </section>
  );
};

export default Vendor;
