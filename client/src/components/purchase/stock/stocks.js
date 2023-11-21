import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { GetStock } from "../../../actions/purchaseAction";
import { useDispatch, useSelector } from "react-redux";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Swal from "sweetalert2";
import axios from "axios";

const Stock = () => {
  const { getStockResult, getStockLoading, getStockError } = useSelector(
    (state) => state.PurchaseReducer
  );
  console.log(getStockResult, "123");
  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("1. use effect home");
    dispatch(GetStock());
  }, [dispatch]);

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios({
            method: "DELETE",
            url: `http://localhost:4001/deletestocks/${id}`,
          });
          dispatch(GetStock());
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Stock</th>
          <th>Re-Order Point</th>
          <th>Qty</th>
          <th>Used</th>
          <th>Scrap</th>
          <th>Size Color</th>
          <th>
            {" "}
            <button className="btn btn-sm btn-dark">Add</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {getStockResult ? (
          getStockResult.map((vendor, index) => (
            <tr key={index}>
              <td>{vendor.stock_description}</td>
              <td>{vendor.stock_reorder_point}</td>
              <td>{vendor.stock_quantity}</td>
              <td>{vendor.stock_used}</td>
              <td>{vendor.stock_scrap}</td>
              <td>{vendor.stock_color}</td>
              <td>
                <DropdownButton
                  id="dropdown-basic-button"
                  title=""
                  split
                  variant="Secondary"
                >
                  <Dropdown.Item href="#">Edit</Dropdown.Item>
                  <Dropdown.Item href="#">Upload Photo</Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteHandler(vendor.stock_id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Detail Info Stock</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))
        ) : getStockLoading ? (
          <p> Loading . . .</p>
        ) : (
          <p> {getStockError ? getStockError : "Data Kosong"}</p>
        )}
      </tbody>
    </table>
  );
};

export default Stock;
