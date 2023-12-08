import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./styles/bookingcreate.css";

import { format } from "date-fns";
import { MdArrowBackIos } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBookingPaymentByBoorNumber } from "../../actions/bookingHotelAction";

const BookingInvoice = () => {
  let { id } = useParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    getBookingPaymentByBoorNumberResult,
    getBookingPaymentByBoorNumberLoading,
    getBookingPaymentByBoorNumberError,
  } = useSelector((state) => state.BookingHotelReducer);

  const invoice = getBookingPaymentByBoorNumberResult.data;
  useEffect(() => {
    // get data
    dispatch(getBookingPaymentByBoorNumber(id));
  }, [dispatch, id]);

  const componentPrintRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
  });

  console.log("invoice: ", invoice);

  return (
    <div className="mb-5 booking-create">
      <div className="hotel-detail-description">
        <div className="row">
          <div className="col-md-12">
            <div className="w-100 d-flex align-items-center justify-content-between container">
              <h3>
                <Link to={`/booking/hotel/create/1`}>
                  <MdArrowBackIos className="text-decoration-none text-black" />
                </Link>{" "}
                Invoice
              </h3>
              <button className="button-hotel-book px-5" onClick={handlePrint}>
                Print
              </button>
            </div>
            <hr className="mb-0" />
            <div
              className="booking-invoice container mt-2"
              ref={componentPrintRef}
            >
              <div className="booking-invoice-detail">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Booking Order</th>
                      <th scope="col">Order Date</th>
                      <th scope="col">Invoice Number</th>
                      <th scope="col">Invoice Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Payment Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice && (
                      <tr>
                        <td>{invoice.payment.patr_order_number}</td>
                        <td>
                          {format(
                            new Date(invoice.boor.boor_order_date),
                            "E, i LLL YYY"
                          )}
                        </td>
                        <td>{invoice.payment.patr_trx_number}</td>
                        <td>
                          {format(
                            new Date(invoice.payment.patr_modified_date),
                            "E, i LLL YYY"
                          )}
                        </td>
                        <td>
                          {invoice.boor.boor_is_paid === "DP"
                            ? "Down Payment"
                            : ""}
                          {invoice.boor.boor_is_paid === "P" ? "PAID" : ""}
                          {invoice.boor.boor_is_paid === "R" ? "Refund" : ""}
                        </td>
                        <td>
                          {invoice.boor.boor_pay_type === "CR"
                            ? "CREDIT CARD"
                            : ""}
                          {invoice.boor.boor_pay_type === "C " ? "CASH" : ""}
                          {invoice.boor.boor_pay_type === "D " ? "DEBIT" : ""}
                          {invoice.boor.boor_pay_type === "PG"
                            ? "PAYMENT GATEWAY"
                            : ""}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="booking-invoice-customer">
                <p className="fw-bold hotel-detail-description-title mb-2">
                  Customer
                </p>

                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Full Name</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Member</th>
                      <th scope="col">Member Date</th>
                      <th scope="col">Remaining Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {invoice && invoice.payment.patr_user.user_full_name}
                      </td>
                      <td>
                        {invoice && invoice.payment.patr_user.user_phone_number}
                      </td>
                      <td>
                        {invoice &&
                          invoice.payment.patr_user.user_member &&
                          invoice.payment.patr_user.user_member.usme_memb_name}
                      </td>
                      <td>
                        {invoice &&
                          format(
                            new Date(
                              invoice.payment.patr_user.user_modified_date
                            ),
                            "i LLL YYY"
                          )}
                      </td>
                      <td>
                        {invoice &&
                          invoice.payment.patr_user.user_member &&
                          invoice.payment.patr_user.user_member.usme_points}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="booking-invoice-billing">
                <p className="fw-bold hotel-detail-description-title mb-2">
                  Billing
                </p>

                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Facilities</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Vacant</th>
                      <th scope="col">Price</th>
                      {/* <th scope="col">Discount</th> */}
                      <th scope="col">Point Member</th>
                      <th scope="col" className="text-end">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice &&
                      invoice.borde.map((item) => {
                        // setTotalTax()
                        return (
                          <>
                            <tr>
                              <td className="fw-bold">
                                {item.facilities.faci_name}
                              </td>
                              <td className="fw-bold">1</td>
                              <td className="fw-bold">
                                {item.borde_adults} Adults, {item.borde_kids}{" "}
                                Kids
                              </td>
                              <td className="fw-bold">
                                {
                                  <NumericFormat
                                    value={item.borde_price}
                                    displayType="text"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="Rp "
                                  />
                                }
                              </td>
                              {/* <td className="fw-bold">
                                {+item.borde_discount > 0 && (
                                  <NumericFormat
                                    value={item.borde_discount}
                                    displayType="text"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="Rp "
                                  />
                                )}
                              </td> */}
                              {/* <td className="fw-bold">Rp. 15.000{"(100 Pts)"}</td> */}
                              <td className="fw-bold"></td>
                              <td className="text-end fw-bold">
                                <NumericFormat
                                  value={item.borde_price}
                                  displayType="text"
                                  thousandSeparator="."
                                  decimalSeparator=","
                                  prefix="Rp "
                                />
                                ,00
                              </td>
                            </tr>
                            {item.booking_order_detail_extras &&
                              item.booking_order_detail_extras.map((boex) => {
                                return (
                                  <tr>
                                    <td>{boex.boex_prit.prit_name}</td>
                                    <td>{boex.boex_qty}</td>
                                    <td></td>
                                    <td>
                                      <NumericFormat
                                        value={boex.boex_price}
                                        displayType="text"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix="Rp "
                                      />
                                    </td>
                                    <td></td>
                                    {/* <td></td> */}
                                    <td className="text-end">
                                      <NumericFormat
                                        value={boex.boex_subtotal}
                                        displayType="text"
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix="Rp "
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            <tr>
                              <td colSpan={4}></td>
                              <td className="fw-bold">Discount</td>
                              <td className="text-end fw-bold">
                                {+item.borde_discount > 0 && "- "}
                                <NumericFormat
                                  value={item.borde_discount}
                                  displayType="text"
                                  thousandSeparator="."
                                  decimalSeparator=","
                                  prefix="Rp "
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={4}></td>
                              <td className="fw-bold">Sub Total</td>
                              <td className="text-end fw-bold">
                                <NumericFormat
                                  value={item.borde_subtotal}
                                  displayType="text"
                                  thousandSeparator="."
                                  decimalSeparator=","
                                  prefix="Rp "
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={4}></td>
                              <td className="fw-bold">Tax</td>
                              <td className="text-end fw-bold">
                                {item.facilities.faci_tax_rate}%
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={4}></td>
                              <td className="fw-bold">Total Amount</td>
                              <td className="text-end fw-bold">
                                <NumericFormat
                                  value={item.borde_subtotal_with_tax}
                                  displayType="text"
                                  thousandSeparator="."
                                  decimalSeparator=","
                                  prefix="Rp "
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={7} className="p-0">
                                <hr />
                              </td>
                            </tr>
                          </>
                        );
                      })}

                    {/* <tr>
                      <td>Softdrink</td>
                      <td>2</td>
                      <td></td>
                      <td>Rp. 20.000</td>
                      <td></td>
                      <td></td>
                      <td className="text-end">Rp. 20.000</td>
                    </tr> */}
                    {/* <tr>
                      <td colSpan={7}>
                        <hr />
                      </td>
                    </tr> */}
                    {/* <tr>
                      <td colSpan={4}></td>
                      <td className="fw-bold">Total Amount</td>
                      <td className="text-end fw-bold">
                        <NumericFormat
                          value={invoice && invoice.boor.boor_total_amount}
                          displayType="text"
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="Rp "
                        />
                      </td>
                    </tr> */}
                    {/* <tr>
                      <td colSpan={4}></td>
                      <td className="fw-bold">Total Tax</td>
                      <td className="text-end fw-bold">
                        <NumericFormat
                          // value={totalTax}
                          displayType="text"
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="Rp "
                        />
                      </td>
                    </tr> */}
                    <tr>
                      <td colSpan={4}></td>
                      <td className="fw-bold">Payment Amount</td>
                      <td className="text-end fw-bold">
                        <NumericFormat
                          value={invoice && invoice.boor.boor_payment_amount}
                          displayType="text"
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="Rp "
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInvoice;
