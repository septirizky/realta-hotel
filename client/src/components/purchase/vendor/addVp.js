import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { GetVendorsStock, GetStock } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BiPlus } from "react-icons/bi";

const AddVendorProduct = () => {
  const [qty, setQty] = useState("");
  const [remaining, setRemaining] = useState("");
  const [price, setPrice] = useState("");
  const [stockid, setStockid] = useState("");
  const [formKeyword, setFormKeyword] = useState("");

  const {
    getVendorPResult,
    getVendorPLoading,
    getVendorPError,
    getStockResult,
    getStockLoading,
    getStockError,
  } = useSelector((state) => state.PurchaseReducer);
  const { id } = useParams();
  console.log(getStockResult, "dd");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetVendorsStock(id));
    dispatch(GetStock({ stock_name: formKeyword }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, formKeyword]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //inputvendorstock

  console.log(id, stockid);
  const insertVendorstock = (event) => {
    event.preventDefault();
    console.log(id, stockid, qty, remaining, price);
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
          url: `http://localhost:4000/insertstockvendorproduct`,
          timeout: 12000,
          data: {
            vepro_qty_stocked: qty,
            vepro_qty_remaining: remaining,
            vepro_price: price,
            vepro_stock_id: stockid,
            vepro_vendor_id: id,
          },
        }).then((response) => {
          if (response.data.data !== 400) {
            Swal.fire({
              icon: "success",
            });
          } else {
            Swal.fire({
              icon: "warning",
              text: response.data.code,
            });
          }
          setShow(false);
          dispatch(GetVendorsStock(id));
          setStockid("");
          setQty("");
          setRemaining("");
          setPrice("");
        });
      }
    });
  };

  return (
    <section>
      <MDBContainer fluid className="p-4">
        <h3>Vendor Product</h3>
        <MDBBreadcrumb className="rounded-3 p-3 mb-4 bg-white">
          <MDBBreadcrumbItem>
            <Link to="/Purchase/gallery">Home</Link>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem>
            <Link to="/Purchase/vendor">Vendor</Link>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem active>
            Add Vendor
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <div className="row mb-4 justify-content-between">
          <div className="col-sm-3 align-content-center mt-2">
            <button
              type="button"
              className="btn btn-sm btn-warning text-white"
              onClick={handleShow}
            >
              <BiPlus size="26" /> Add Vendor product
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

        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>No</th>
              <th>Stock</th>
              <th>Qty Stocked</th>
              <th>Qty Remaining</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {getVendorPResult ? (
              getVendorPResult.map((vendor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{vendor.stock_name}</td>
                  <td>{vendor.vepro_qty_stocked}</td>
                  <td>{vendor.vepro_qty_remaining}</td>
                  <td>{vendor.vepro_price}</td>
                </tr>
              ))
            ) : getVendorPLoading ? (
              <p> Loading . . .</p>
            ) : (
              <p> {getVendorPError ? getVendorPError : "Data Kosong"}</p>
            )}
          </tbody>
        </table>
        {/* <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          style={{ display: "none" }}
        >
          <Form.Label>Remaining</Form.Label>
          <Form.Control
            type="email"
            autoFocus
            value={stockid}
            onChange={(e) => setStockid(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          style={{ display: "none" }}
        >
          <Form.Label>Remaining</Form.Label>
          <Form.Control
            type="email"
            autoFocus
            value={vendorid}
            onChange={(e) => setVendorId(e.target.value)}
          />
        </Form.Group> */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Edit Vendor Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-12"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Stock Name</Form.Label>
                <Form.Control
                  as="select"
                  autoFocus
                  value={stockid}
                  onChange={(e) => {
                    setStockid(e.target.value);
                  }}
                >
                  <option></option>
                  {getStockResult ? (
                    getStockResult.map((x, y) => (
                      <option value={x.stock_id} key={x.stock_id}>
                        {x.stock_name}
                      </option>
                    ))
                  ) : getStockLoading ? (
                    <p> Loading . . .</p>
                  ) : (
                    <p> {getStockError ? getStockError : "Data Kosong"}</p>
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Qty Stocked</Form.Label>
                <Form.Control
                  type="email"
                  autoFocus
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Remaining</Form.Label>
                <Form.Control
                  autoFocus
                  value={remaining}
                  onChange={(e) => setRemaining(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Set Price</Form.Label>
                <Form.Control
                  type="email"
                  autoFocus
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="warning" className="text-white" onClick={insertVendorstock}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </MDBContainer>
    </section>
  );
};

export default AddVendorProduct;
