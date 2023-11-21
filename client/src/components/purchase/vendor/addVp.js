import React, { useEffect, useState } from "react";
import { GetVendorsStock } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AddVendorProduct = () => {
  const [stock_name, setStock] = useState("");
  const [qty, setQty] = useState("");
  const [remaining, setRemaining] = useState("");
  const [price, setPrice] = useState("");
  const [vendorid, setVendorId] = useState("");
  const [stockid, setStockid] = useState("");

  const { getVendorPResult, getVendorPLoading, getVendorPError } = useSelector(
    (state) => state.PurchaseReducer
  );
  const { id } = useParams();
  console.log(id, "dd");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetVendorsStock(id));
    GetVendorsStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const GetVendorsStocks = async () => {
    console.log(id, "23dd");
    const response = await axios.get(
      `http://localhost:4001/liststockvendorproduct/${id}`
    );
    const data = await response.data.data;
    // eslint-disable-next-line array-callback-return
    data.map((vendor) => {
      console.log(vendor.vendor_entity_id, "123");
      setVendorId(vendor.vendor_entity_id);
      setStockid(vendor.stock_id);
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
  };

  //inputvendorstock

  console.log(vendorid, stockid);
  const insertVendorstock = (event) => {
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
          url: `http://localhost:4001/insertstockvendorproduct`,
          timeout: 12000,
          data: {
            vepro_qty_stocked: qty,
            vepro_qty_remaining: remaining,
            vepro_price: price,
            vepro_stock_id: stockid,
            vepro_vendor_id: vendorid,
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
          setStock("");
          setQty("");
          setRemaining("");
          setPrice("");
        });
      }
    });
  };
  return (
    <div className="MainDiv">
      <div className="container">
        <Link to="/vendor">
          <p className="btn btn-sm btn-dark">Back</p>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Qty Stocked</th>
              <th>Qty Remaining</th>
              <th>Price</th>
              <th>
                {" "}
                <button className="btn btn-sm btn-dark" onClick={handleShow}>
                  Add
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {getVendorPResult ? (
              getVendorPResult.map((vendor, index) => (
                <tr key={index}>
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
        <Form.Group
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
        </Form.Group>
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
                  type="email"
                  autoFocus
                  value={stock_name}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-4"
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
            <Button variant="primary" onClick={insertVendorstock}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddVendorProduct;
