/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable eqeqeq */
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import {
  GetPurchaseOrder,
  Deleteorderheader,
  PostStatusHeader,
} from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate, generatePath } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const PurchaseOrder = () => {
  const {
    getPurchaseResult,
    getPurchaseLoading,
    getPurchaseError,
    deleteheaderResult,
    addstatusheaderResult,
  } = useSelector((state) => state.PurchaseReducer);
  const [DelOrder, setDelOrder] = useState(false);
  const [AddStatus, setIsAddStatus] = useState(false);
  const [status, setStatus] = useState("");
  const [Idstatus, setIdStatus] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (DelOrder) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } else if (AddStatus) {
      Swal.fire({
        icon: "success",
      });
    }
    dispatch(GetPurchaseOrder());
    setDelOrder(false);
    setIsAddStatus(false);
  }, [dispatch, deleteheaderResult, addstatusheaderResult]);

  let active = "";
  const navigate = useNavigate();
  const detailorder = (id) => {
    navigate(generatePath("/detailorder/:id", { id: id }));
  };

  const deleteorder = (id, name, event) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        event.preventDefault();
        setDelOrder(true);
        dispatch(Deleteorderheader(id));
      }
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const ubahstatus = async (id) => {
    setShow(true);
    setIdStatus(id);
  };
  const InsertStatus = () => {
    setIsAddStatus(true);
    console.log(status, Idstatus);
    dispatch(PostStatusHeader(status.toString(), Idstatus));
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
              <MDBBreadcrumbItem active>Purchase Order</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
          <div className="w-100">
            <table className="table">
              <thead>
                <tr>
                  <th>PO Number</th>
                  <th>PO Date</th>
                  <th>Vendor Target</th>
                  <th>Line Items</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {getPurchaseResult ? (
                  getPurchaseResult.map((vendor, index) => (
                    <tr key={index}>
                      <td>{vendor.pohe_number}</td>
                      <td>{vendor.pohe_order_date}</td>
                      <td>{vendor.vendor_name}</td>
                      <td>{vendor.pode_line_total}</td>
                      <td>{vendor.pohe_total_amount}</td>
                      <td>
                        {vendor.pohe_status == 1
                          ? (active = "Pending")
                          : vendor.pohe_status == 2
                          ? (active = "Approve")
                          : vendor.pohe_status == 3
                          ? (active = "Rejected")
                          : vendor.pohe_status == 4
                          ? (active = "Complete")
                          : null}
                      </td>
                      <td>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title=""
                          split
                          variant="Secondary"
                        >
                          <Dropdown.Item
                            onClick={() => detailorder(vendor.pohe_number)}
                          >
                            Details
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => ubahstatus(vendor.pohe_id, e)}
                          >
                            Switch Status
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) =>
                              deleteorder(vendor.pohe_id, vendor.vendor_name, e)
                            }
                          >
                            Delete
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  ))
                ) : getPurchaseLoading ? (
                  <p> Loading . . .</p>
                ) : (
                  <p> {getPurchaseError ? getPurchaseError : "Data Kosong"}</p>
                )}
              </tbody>
            </table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Switch Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="create-course-form">
                <Form.Group controlId="formBasicSelect">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option></option>
                    <option value="2">Approved</option>
                    <option value="3">Rejected</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={InsertStatus}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </MDBBreadcrumb>
      </MDBContainer>
    </section>
  );
};

export default PurchaseOrder;
