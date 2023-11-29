import React from 'react';
import './styles/bookingcreate.css';

import { MdArrowBackIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const BookingInvoice = () => {
  return (
    <div className="mb-5 booking-create">
      <div className="hotel-detail-description container">
        <div className="row">
          <div className="col-md-12">
            <div className="w-100 d-flex align-items-center justify-content-between">
              <h3>
                <Link to={`/booking/hotel/create/1`}>
                  <MdArrowBackIos className="text-decoration-none text-black" />
                </Link>{' '}
                Invoice
              </h3>
              <button className="button-hotel-book px-5">Print</button>
            </div>
            <hr />
            <div className="booking-invoice">
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
                    <tr>
                      <td>BO-20230123-001</td>
                      <td>23 Jan 2023</td>
                      <td>TRX#20230123-0002</td>
                      <td>23 Jan 2023</td>
                      <td>Paid</td>
                      <td>GoTo</td>
                    </tr>
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
                      <td>Ajip</td>
                      <td>0823 123 678</td>
                      <td>VIP</td>
                      <td>23 May 2022</td>
                      <td>+150</td>
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
                      <th scope="col">Discount</th>
                      <th scope="col">Point Member</th>
                      <th scope="col" className="text-end">
                        Sub Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Indonesia Standar Double</td>
                      <td>1</td>
                      <td>2 Adult, 0 Child</td>
                      <td>Rp. 300.000</td>
                      <td>Rp. 15.000</td>
                      <td>Rp. 15.000{'(100 Pts)'}</td>
                      <td className="text-end">Rp. 270.000</td>
                    </tr>
                    <tr>
                      <td>Extra Bed</td>
                      <td>1</td>
                      <td></td>
                      <td>Rp. 45.000</td>
                      <td></td>
                      <td></td>
                      <td className="text-end">Rp. 45.000</td>
                    </tr>
                    <tr>
                      <td>Softdrink</td>
                      <td>2</td>
                      <td></td>
                      <td>Rp. 20.000</td>
                      <td></td>
                      <td></td>
                      <td className="text-end">Rp. 20.000</td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                        <hr />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}></td>
                      <td className="fw-bold">Total Amount</td>
                      <td className="text-end fw-bold">Rp. 335.000</td>
                    </tr>
                    <tr>
                      <td colSpan={5}></td>
                      <td className="fw-bold">Tax</td>
                      <td className="text-end fw-bold">10%</td>
                    </tr>
                    <tr>
                      <td colSpan={5}></td>
                      <td className="fw-bold">Payment Amount</td>
                      <td className="text-end fw-bold">Rp. 368.500</td>
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
