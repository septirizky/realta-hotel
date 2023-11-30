/* eslint-disable no-const-assign */
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {
  const state = JSON.parse(localStorage.getItem("access_token"));
  console.log(state, "45");

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;
    state.map((item) => {
      const t = item.vepro_price
        .replace("Rp", "")
        .replace(".", "")
        .replace(".", "");
      const a = Number(t);
      console.log(a * item.qty);
      return (subtotal += a * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    const orderheader = [];
    const orderdetail = [];
    state.map((item) => {
      const ponumber = "PO" + new Date().valueOf();
      const tax = Math.round(subtotal * 0.1);
      const total = Math.round(subtotal * 0.1 + subtotal);
      // const today = new Date();
      // const dd = String(today.getDate()).padStart(2, "0");
      // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      // var yyyy = today.getFullYear();

      // today = mm + "/" + dd + "/" + yyyy;

      orderheader.push({
        pohe_number: ponumber,
        pohe_status: 1,
        pohe_order_date: new Date(),
        pohe_subtotal: subtotal,
        pohe_tax: tax,
        pohe_total_amount: total,
        pohe_refund: 0,
        pohe_arrival_date: new Date(),
        pohe_pay_type: "TR",
        pohe_emp_id: 1,
        pohe_vendor_id: item.vendor_entity_id,
      });
      orderdetail.push({
        pode_order_qty: item.qty,
        pode_price: item.vepro_price,
        pode_line_total: item.qty,
        pode_received_qty: 0,
        pode_rejected_qty: 0,
        pode_stocked_qty: item.stock_quantity,
        pode_modified_date: new Date(),
        pode_stock_id: item.stock_id,
      });
      // return orderheader & orderdetail;
    });
    const inputdata = (event) => {
      event.preventDefault();
      console.log(orderheader, orderdetail, "90");
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
            url: `http://localhost:4001/insertorder`,
            timeout: 12000,
            data: { orderdetail, orderheader },
          }).then((response) => {
            if (response.data.data !== 400) {
              Swal.fire({
                icon: "success",
              });
              // setEdit(false);
              // dispatch(GetStock());
              // setStock("");
              // setDesc("");
              // setPoint("");
              // setQty("");
              // setUsed("");
              // setScrap("");
              // setSize("");
              // setColor("");
            } else {
              Swal.fire({
                icon: "warning",
                text: response.data.code,
              });
            }
            // setShow(false);
          });
        }
      });
    };
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item Ordered</h5>
                  </div>
                  <div className="card-body">
                    {state.map((product) => {
                      return (
                        <div key={product.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={`http://localhost:4001/pictstockphoto/${product.spho_photo_filename}`}
                                  // className="w-100"
                                  alt={product.title}
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </div>
                            <div className="col-lg-7 col-md-1">
                              <p>
                                <strong> {product.stock_name}</strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-7 col-md-6 ">
                              <p>
                                <strong> Vendor {product.vendor_name}</strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>
                            <div className="col-lg-7 col-md-6">
                              <strong>
                                {product.vepro_price} x {product.qty} =Rp.
                                {product.vepro_price
                                  .replace("Rp", "")
                                  .replace(".", "")
                                  .replace(".", "") * product.qty}
                              </strong>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Product
                        <span>{totalItems}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Sub Total
                        <span>Rp. {Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Tax
                        <span>10 %</span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>
                            Rp. {Math.round(subtotal * 0.1 + subtotal)}
                          </strong>
                        </span>
                      </li>
                    </ul>
                    ;
                    <button
                      onClick={inputdata}
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container my-3 py-3">
        <hr />
        {state ? <ShowCart /> : <EmptyCart />}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Cart;
