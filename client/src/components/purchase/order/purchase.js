/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { GetPurchaseOrder } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const PurchaseOrder = () => {
  const { getPurchaseResult, getPurchaseLoading, getPurchaseError } =
    useSelector((state) => state.PurchaseReducer);
  console.log(getPurchaseResult, "order");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("1. use effect home");
    dispatch(GetPurchaseOrder());
  }, [dispatch]);
  let active = "";
  return (
    <div>
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
                    : vendor.vendor_active == 2
                    ? (active = "Approve")
                    : vendor.vendor_active == 3
                    ? (active = "Rejected")
                    : vendor.vendor_active == 4
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
                    <Dropdown.Item href="/detailorder">Details</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Switch Status
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
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
  );
};

export default PurchaseOrder;
