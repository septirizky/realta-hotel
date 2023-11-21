import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { GetOrder } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const PurchaseOrder = () => {
  const { getOrderResult, getOrderLoading, getOrderError } = useSelector(
    (state) => state.PurchaseReducer
  );
  console.log(getOrderResult, "order");
  const dispatch = useDispatch();
  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  useEffect(() => {
    console.log("1. use effect home");
    dispatch(GetOrder());
  }, [dispatch]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Receive Qty</th>
            <th>Reject Qty</th>
            <th>Total</th>
            <th>
              {" "}
              <button className="btn btn-sm btn-dark">Add</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {getOrderResult ? (
            getOrderResult.map((vendor, index) => (
              <tr key={index}>
                <td>{vendor.stock_name}</td>
                <td>{vendor.stock_quantity}</td>
                <td>{vendor.pode_price}</td>
                <td>{vendor.pode_received_qty}</td>
                <td>{vendor.pode_rejected_qty}</td>
                <td>{vendor.pode_line_total}</td>
                <td>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title=""
                    split
                    variant="Secondary"
                  >
                    <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Add Item Product
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))
          ) : getOrderLoading ? (
            <p> Loading . . .</p>
          ) : (
            <p> {getOrderError ? getOrderError : "Data Kosong"}</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrder;
