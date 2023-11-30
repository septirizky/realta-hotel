import React, { useEffect, useState } from 'react';
import './styles/bookingcreate.css';

import { FaPlus, FaTimes } from 'react-icons/fa';
import { MdArrowBackIos } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createApplyCoupon,
  createBoex,
  getBookingDetail,
  getListPriceItems,
  getListSpecialOffer,
  updateBookingOrder,
} from '../../actions/bookingHotelAction';
import { NumericFormat } from 'react-number-format';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const BookingCreate = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();
  const {
    getDetailBookingResult,
    // getDetailBookingLoading,
    // getDetailBookingError,

    getSpecialOfferResult,
    // getSpecialOfferLoading,
    // getSpecialOfferError,
    addApplyCouponResult,
    getListPriceItemsResult,
    // getListPriceItemsLoading,
    // getListPriceItemsError,
    addBoexResult,
    updateBookingOrderResult,
  } = useSelector((state) => state.BookingHotelReducer);

  useEffect(() => {
    // get data
    dispatch(getBookingDetail(id));
  }, [dispatch, id]);

  const booking = getDetailBookingResult.data;

  useEffect(() => {
    dispatch(getListSpecialOffer());
    dispatch(getListPriceItems());
  }, [dispatch]);

  useEffect(() => {
    if (addApplyCouponResult) {
      dispatch(getBookingDetail(id));
    }
  }, [addApplyCouponResult, dispatch, id]);

  useEffect(() => {
    if (addBoexResult) {
      dispatch(getBookingDetail(id));
    }
  }, [addBoexResult, dispatch, id]);

  const [socoSpofId, setSocoSpofId] = useState('');
  const [socoBordeId, setSocoBordeId] = useState('');

  const handleSubmitCoupon = (e) => {
    e.preventDefault();

    dispatch(
      createApplyCoupon({
        soco_borde_id: socoBordeId,
        soco_spof_id: socoSpofId,
      })
    );
  };

  const [boexBordeId, setBoexBordeId] = useState(null);
  const [boexBordeName, setBoexBordeName] = useState('');
  const [pritDetail, setPritDetail] = useState(null);
  const [boexQty, setBoexQty] = useState(null);

  function pritSelected(event) {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    setPritDetail(itemSelected);
    return;
  }

  const handleSubmitBoex = (e) => {
    e.preventDefault();

    dispatch(
      createBoex({
        boex_borde_id: boexBordeId,
        boex_prit_id: pritDetail.prit_id,
        boex_price: +pritDetail.prit_price,
        boex_qty: boexQty,
        boex_measure_unit: 'buah',
      })
    );
  };

  const [paymentType, setPaymentType] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmitPay = (e) => {
    if (!cardNumber || !paymentType) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please input your payment type and account payment',
      });
      return;
    }

    e.preventDefault();

    dispatch(
      updateBookingOrder(id, {
        boor_cardnumber: cardNumber,
        boor_pay_type: paymentType,
      })
    );
    setPaymentType('');
    setCardNumber('');
  };

  useEffect(() => {
    if (updateBookingOrderResult) {
      navigate(
        `/booking/hotel/invoice/${updateBookingOrderResult.data.boor_id}`
      );
    }
  }, [updateBookingOrderResult, navigate]);

  // console.log('boexPritId: ', boexPritId);
  // console.log('pritDetail: ', pritDetail);

  return (
    <div className="mb-5 booking-create">
      <div className="hotel-detail-description container">
        <div className="row">
          <div className="col-md-7">
            <h3>
              <Link to={`/booking/hotel/1`}>
                <MdArrowBackIos className="text-decoration-none text-black" />
              </Link>
              Modify your booking
            </h3>
            <hr />
            <div className="booking-create-details">
              <p className="fw-bold hotel-detail-description-title mb-2">
                Enter your details
              </p>
              <p className="mb-4">
                We will use these details to share your booking information
              </p>
              <form action="" className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="John Doe"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-0"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="08231234568"
                  />
                </div>
              </form>
            </div>
            <div className="booking-create-extra">
              <p className="fw-bold hotel-detail-description-title mb-2">
                Complete your booking
              </p>
              <div>
                {booking &&
                  booking.borde.map((item) => {
                    let totalPrice = 0;
                    return (
                      <table
                        className="table table-bordered caption-top"
                        key={item.borde_id}
                      >
                        <caption className="fw-bold">
                          {item.facilities.faci_name}:
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Price</th>
                            <th scope="col">
                              <button
                                className="btn btn-primary rounded-0"
                                onClick={() => {
                                  setBoexBordeId(item.borde_id);
                                  setBoexBordeName(item.facilities.faci_name);
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal3"
                              >
                                <FaPlus /> Add
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {booking &&
                            item.booking_order_detail_extras.map((boex) => {
                              totalPrice +=
                                boex.boex_prit.prit_price * boex.boex_qty;
                              return (
                                <tr key={boex.boex_id}>
                                  <td>{boex.boex_prit.prit_name}</td>
                                  <td>{boex.boex_qty}</td>
                                  <td>
                                    <NumericFormat
                                      value={
                                        boex.boex_prit.prit_price *
                                        boex.boex_qty
                                      }
                                      displayType="text"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                    />
                                  </td>
                                  <td>
                                    <button className="btn btn-sm btn-danger rounded-0">
                                      <FaTimes /> Delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          <tr>
                            <td colSpan={3} className="text-start fw-bold">
                              Total:{' '}
                              <NumericFormat
                                value={totalPrice}
                                displayType="text"
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="Rp "
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  })}
              </div>
            </div>
            <div className="booking-create-details">
              <p className="fw-bold hotel-detail-description-title mb-2">
                Payment
              </p>
              <form action="" className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Type</label>
                  <select
                    name=""
                    id=""
                    className="form-control rounded-0"
                    onChange={(e) => setPaymentType(e.target.value)}
                    required
                  >
                    <option></option>
                    <option value="CR">Credit Card</option>
                    <option value="C">Cash</option>
                    <option value="D">Debet</option>
                    <option value="PG">Payment Gateway</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Account Payment</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="123456678"
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card rounded-0">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center">
                  <h5 className="card-title">Login to see lower price</h5>
                  <button className="button-hotel-room-book m-0 ms-3">
                    Login
                  </button>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                {booking &&
                  booking.borde.map((item, index) => (
                    <li className="list-group-item text-center" key={index}>
                      <p>
                        <span>
                          {format(new Date(item.borde_checkin), 'E, i LLL YYY')}{' '}
                          {` - `}
                          {format(
                            new Date(item.borde_checkout),
                            'E, i LLL YYY'
                          )}{' '}
                        </span>
                        {/* <span className="ms-3">1 Room, 2 Guest</span> */}
                        <span className="ms-3">
                          {item.borde_adults + item.borde_kids} Guest
                        </span>
                      </p>
                      <div className="hotel-price m-0 mb-1">
                        <div>
                          <NumericFormat
                            value={
                              item.facilities.faci_rate_price -
                              (item.facilities.faci_rate_price *
                                item.facilities.faci_discount) /
                                100
                            }
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="Rp "
                          />
                        </div>
                        {+item.facilities.faci_discount > 0 && (
                          <>
                            <span className="hotel-price-undiscount">
                              <NumericFormat
                                value={item.facilities.faci_rate_price}
                                displayType="text"
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="Rp "
                              />
                            </span>
                            <span className="hotel-price-discount-value">
                              {item.facilities.faci_discount}% off
                            </span>
                          </>
                        )}
                      </div>
                      {/* <p className="mb-1 text-success">Include Tax</p> */}
                      <p
                        className="mb-3 text-danger"
                        style={{ fontSize: '12px' }}
                      >
                        Before Tax {item.facilities.faci_tax_rate}%
                      </p>
                      <h5>{item.facilities.faci_name}</h5>
                    </li>
                  ))}
                <li className="list-group-item">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="fs-3">Get Coupon</div>
                    <button
                      className="button-hotel-book"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                    >
                      Apply Coupon
                    </button>
                    {/* <div className="fs-3">
                      <NumericFormat
                        value={
                          booking && booking.boor.boor_discount
                            ? booking.boor.boor_discount
                            : 0
                        }
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp "
                      />
                    </div> */}
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>Your Savings</div>
                    <div className="fs-5">
                      <NumericFormat
                        value={
                          booking && booking.boor.boor_discount
                            ? booking.boor.boor_discount
                            : 0
                        }
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp "
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      Total Price{' '}
                      <span
                        className="text-success fw-bold"
                        style={{ fontSize: '12px' }}
                      >
                        {/* {'(tax included)'} */}
                      </span>
                    </div>
                    <div className="fs-3">
                      <NumericFormat
                        value={booking && booking.boor.boor_total_amount}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp "
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <div className="card-body">
                {/* <Link to={`/booking/hotel/create/1`}> */}
                <button
                  className={`button-list-hotel-filter`}
                  type="button"
                  onClick={(e) => handleSubmitPay(e)}
                >
                  {/* Create Booking Order */}
                  Pay
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
          {/* <div className="col-md-5">
            <div className="card rounded-0">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center">
                  <h5 className="card-title">Login to see lower price</h5>
                  <button className="button-hotel-room-book m-0 ms-3">
                    Login
                  </button>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item text-center">
                  <p>
                    <span>Friday, 10 Feb - Sat, 11 Feb</span>
                    <span className="ms-3">1 Room, 2 Guest</span>
                  </p>
                  <div className="hotel-price m-0 mb-3">
                    <div>Rp. 350.000</div>
                    <span className="hotel-price-undiscount">Rp. 550.000</span>
                    <span className="hotel-price-discount-value">10% off</span>
                  </div>
                  <p className="mb-1 text-success">Include Tax</p>
                  <h5>Indonesia Standar Double</h5>
                </li>
                <li className="list-group-item">
                  <div className="d-flex align-items-center justify-content-between">
                    <button className="button-hotel-book">Apply Coupon</button>
                    <div className="fs-3">Rp. -50.000</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>Your Savings</div>
                    <div className="fs-5">Rp. -50.000</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      Total Price{' '}
                      <span
                        className="text-success fw-bold"
                        style={{ fontSize: '12px' }}
                      >
                        {'(tax included)'}
                      </span>
                    </div>
                    <div className="fs-3">Rp. 300.000</div>
                  </div>
                </li>
              </ul>
              <div className="card-body">
                <Link to={`/booking/hotel/invoice/1`}>
                  <button className="button-list-hotel-filter">
                    Create Booking Order
                  </button>
                </Link>
                <button
                  className="border-0 text-decoration-underline text-primary mt-3"
                  data-bs-toggle="modal"
                  type="button"
                  data-bs-target="#cancelpolicy"
                >
                  Cancellation Policy
                </button>

                <div
                  className="modal fade "
                  id="cancelpolicy"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Cancellation Policies
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea voluptas ratione animi sequi nesciunt at nisi
                          unde repudiandae iusto optio labore enim, minima
                          molestiae qui amet culpa, quod asperiores voluptatem?
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* modal */}

          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <form
                className="modal-content rounded-0"
                onSubmit={(e) => handleSubmitCoupon(e)}
              >
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Apply Coupon
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="col-form-label">
                      Select Your Booking Facility:
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-control rounded-0"
                      onChange={(e) => setSocoBordeId(e.target.value)}
                      required
                    >
                      <option></option>
                      {booking &&
                        booking.borde.map((item) => (
                          <option key={item.borde_id} value={item.borde_id}>
                            {item.facilities.faci_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Select Coupon:</label>
                    <select
                      name=""
                      id=""
                      className="form-control rounded-0"
                      onChange={(e) => setSocoSpofId(e.target.value)}
                      required
                    >
                      <option></option>
                      {getSpecialOfferResult &&
                        getSpecialOfferResult.data.rows.map((item) => (
                          <option key={item.spof_id} value={item.spof_id}>
                            {item.spof_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="button-hotel-room-book"
                    data-bs-dismiss="modal"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal3"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <form
                className="modal-content rounded-0"
                onSubmit={(e) => handleSubmitBoex(e)}
              >
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add Extra Item for{' '}
                    <span className="text-yellow">{boexBordeName}</span>
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="col-form-label">Select Item:</label>
                    <select
                      name=""
                      id=""
                      className="form-control rounded-0"
                      onChange={(e) => pritSelected(e)}
                      required
                    >
                      <option></option>
                      {getListPriceItemsResult &&
                        getListPriceItemsResult.data.map((item) => (
                          <option
                            key={item.prit_id}
                            // value={item.prit_id}
                            value={JSON.stringify(item)}
                          >
                            {item.prit_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Quantity:</label>
                    <input
                      type="number"
                      className="form-control rounded-0 w-25"
                      onChange={(e) => setBoexQty(e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <table>
                      <tbody>
                        <tr>
                          <td className="p-1">Price</td>
                          <td className="p-1">
                            :{' '}
                            <NumericFormat
                              value={pritDetail ? pritDetail.prit_price : 0}
                              displayType="text"
                              thousandSeparator="."
                              decimalSeparator=","
                              prefix="Rp "
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="p-1">Type</td>
                          <td className="p-1">
                            : {pritDetail && pritDetail.prit_type}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-1" style={{ verticalAlign: 'top' }}>
                            Description
                          </td>
                          <td className="p-1">
                            : {pritDetail && pritDetail.prit_description}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="button-hotel-room-book"
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCreate;
