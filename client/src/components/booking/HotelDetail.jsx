import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles/hoteldetail.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { format } from "date-fns";
import { CiWarning } from "react-icons/ci";
import { FaCar, FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import {
  createBooking,
  getListBHotelById,
} from "../../actions/bookingHotelAction";
const HotelDetail = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    getDetailHotelResult,
    getDetailHotelLoading,
    getDetailHotelError,
    addBookingResult,
  } = useSelector((state) => state.BookingHotelReducer);

  const hotel = getDetailHotelResult.data;
  useEffect(() => {
    // get data
    dispatch(getListBHotelById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (addBookingResult) {
      navigate(
        `/booking/hotel/create/${addBookingResult.data.booking_order.boor_id}`
      );
    }
  }, [addBookingResult, navigate]);

  const [boor, setBoor] = useState({
    booking_order: {
      boor_user_id: 1,
      boor_hotel_id: +id,
      boor_pay_type: "D",
      boor_is_paid: "DP",
      boor_type: "I",
      boor_cardnumber: null,
      boor_member_type: "VIP",
      boor_status: "BOOKING",
    },
    booking_order_detail: [],
  });

  const [roomName, setRoomName] = useState(null);
  const [faciId, setFaciId] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [price, setPrice] = useState("");
  const [tax, setTax] = useState("");
  const [diskonRoom, setDiskonRoom] = useState("");
  const [disabledRoom, setDisabledRoom] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [boorLength, setBoorLength] = useState(0);

  const addFacilities = (e) => {
    e.preventDefault();
    boor.booking_order_detail.push({
      borde_faci_id: faciId,
      borde_checkin: checkIn,
      borde_checkout: checkOut,
      borde_adults: +adults,
      borde_kids: +kids,
      // borde_price: price - (price * diskonRoom) / 100,
      borde_price: price,
      borde_extra: 0,
      borde_discount: 0,
      borde_tax_persen: tax,
      diskonRoom,
      roomName,
    });
    setBoorLength(boorLength + 1);
    setTotalPrice(totalPrice + price);
    disabledRoom.push(faciId);
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    dispatch(createBooking(boor));
  };

  return (
    <div className="mb-5">
      {getDetailHotelResult ? (
        <>
          <div className="container">
            <div className="row mt-5">
              <form
                action=""
                className="row justify-content-center mb-5 hotel-list-search"
              >
                <div className="col-md-2">
                  <label htmlFor="">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bogor"
                  />
                  <label></label>
                </div>
                <div className="col-md-2">
                  <label htmlFor="">Check In</label>
                  <input type="date" className="form-control" />
                  <label></label>
                </div>
                <div className="col-md-2">
                  <label htmlFor="">Check Out</label>
                  <input type="date" className="form-control" />
                  <label></label>
                </div>
                <div className="col-md-2">
                  <label htmlFor="">Person</label>
                  <div
                    className="form-control d-flex align-items-center"
                    style={{ height: "48px", cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                  >
                    <span>
                      {adults} {adults > 1 ? "Adults" : "Adult"}
                    </span>
                    {kids > 0 && <span className="me-1">, </span>}
                    <span>
                      {kids < 2 && kids > 0 && `${kids} Kid`}{" "}
                      {kids > 1 && `${kids} Kids`}{" "}
                    </span>
                  </div>
                  <label></label>
                </div>
                <div className="col-md-2">
                  <button className="">Search</button>
                </div>
              </form>
            </div>
          </div>

          <div className="hotel-detail">
            <Swiper
              slidesPerView={2.5}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="hotel-detail-slider"
            >
              {hotel.facilities[0].facility_photos[0] ? (
                hotel.facilities[0].facility_photos.map((item) => (
                  <SwiperSlide>
                    <img
                      alt="slid-img"
                      src={item.fapho_url}
                      className="hotel-slider-img"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    alt="slid-img"
                    src="https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
                    className="hotel-slider-img"
                  />
                </SwiperSlide>
              )}
              <SwiperSlide>
                <img
                  alt="slid-img"
                  src="https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
                  className="hotel-slider-img"
                />
              </SwiperSlide>
              {/* <SwiperSlide>
                <img
                  alt="slid-img"
                  src="https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
                  className="hotel-slider-img"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  alt="slid-img"
                  src="https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
                  className="hotel-slider-img"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  alt="slid-img"
                  src="https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
                  className="hotel-slider-img"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  alt="slid-img"
                  src="https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
                  className="hotel-slider-img"
                />
              </SwiperSlide> */}
            </Swiper>
          </div>
          <div className="hotel-detail-description container">
            <div className="row">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-6">
                    <h1>{hotel.hotel_name}</h1>
                    <p>{hotel.hotel_addr.addr_line_1}</p>
                    <div className="hotel-title m-0">
                      <span>VIP Member</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="hotel-rating mt-2">
                      <div className="hotel-rating-star">
                        <span>4.5</span>
                        <FaStar className="hotel-rating-icon" />
                      </div>
                      <div className="hotel-rating-count">
                        (5 Ratings) <span className="text-success">Good</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="fw-bold hotel-detail-description-title">
                    Description
                  </p>
                  <p className="hotel-detail-description-text">
                    {hotel.hotel_description}
                  </p>
                </div>
                <div className="hotel-amenities col-md-6">
                  <p className="fw-bold hotel-detail-description-title">
                    Amenities
                  </p>
                  <div className="row">
                    <div className="mr-2 mb-1 col-sm-3">
                      <FaCar />
                      <span className="ms-1">Parking</span>
                    </div>
                    <div className="mr-2 mb-1 col-sm-3">
                      <FaShoppingCart />
                      <span className="ms-1">Market</span>
                    </div>
                  </div>
                </div>
                <div className="hotel-room-type">
                  <p className="fw-bold hotel-detail-description-title">
                    Available Room(s)
                  </p>
                  <div className="hotel-room-list">
                    <div className="row">
                      {hotel.facilities &&
                        hotel.facilities.map((facility, index) => (
                          <div
                            className="hotel-room-item col-md-12 mb-4"
                            key={facility.faci_id}
                          >
                            <div className="row">
                              <div className="col-md-5">
                                <img
                                  alt="room-img"
                                  src={
                                    facility.facility_photos[0]
                                      ? facility.facility_photos[0].fapho_url
                                      : "https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
                                  }
                                  className="hotel-room-img"
                                />
                              </div>
                              <div className="col-md-7">
                                <h3>{facility.faci_name}</h3>
                                <p>Max Vacant {facility.faci_max_number}</p>
                                <div className="hotel-price m-0">
                                  <div>
                                    <NumericFormat
                                      value={
                                        facility.faci_rate_price -
                                        (facility.faci_rate_price *
                                          facility.faci_discount) /
                                          100
                                      }
                                      displayType="text"
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      prefix="Rp "
                                    />
                                    <span className="hotel-price-per">
                                      /day
                                    </span>
                                  </div>
                                  {facility.faci_discount && (
                                    <>
                                      <span className="hotel-price-undiscount">
                                        <NumericFormat
                                          value={facility.faci_rate_price}
                                          displayType="text"
                                          thousandSeparator="."
                                          decimalSeparator=","
                                          prefix="Rp "
                                        />
                                      </span>
                                      <span className="hotel-price-discount-value">
                                        {facility.faci_discount}% off
                                      </span>
                                    </>
                                  )}
                                </div>
                                <button
                                  className={
                                    disabledRoom.includes(facility.faci_id)
                                      ? "button-hotel-room-book-disabled"
                                      : "button-hotel-room-book"
                                  }
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal2"
                                  onClick={() => {
                                    setRoomName(facility.faci_name);
                                    setPrice(
                                      facility.faci_rate_price -
                                        (facility.faci_rate_price *
                                          facility.faci_discount) /
                                          100
                                    );
                                    setTax(facility.faci_tax_rate);
                                    setFaciId(facility.faci_id);
                                    setDiskonRoom(
                                      facility.faci_discount
                                        ? facility.faci_discount
                                        : 0
                                    );
                                  }}
                                  disabled={disabledRoom.includes(
                                    facility.faci_id
                                  )}
                                >
                                  {disabledRoom.includes(facility.faci_id)
                                    ? "Selected"
                                    : "Book Now"}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="hotel-rating-and-review">
                  <p className="fw-bold hotel-detail-description-title">
                    Rating and Reviews
                  </p>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="hotel-review-rating mt-2 d-flex justify-content-center align-items-center h-75">
                        <div className="hotel-review-rating-star">
                          <span className="hotel-review-rating-rating">
                            4.5
                          </span>
                          <FaStar className="hotel-review-rating-icon" />
                        </div>
                        <div className="hotel-review-rating-count">
                          (5 Ratings) <span className="text-success">Good</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="hotel-rating-persentage row align-items-center  mb-2">
                        <div className="col-sm-1 d-flex align-items-center p-0">
                          <span className="mr-1" style={{ fontSize: "18px" }}>
                            5
                          </span>
                          <FaStar className="text-warning" />
                        </div>
                        <div
                          className="progress col-sm-10 p-0"
                          role="progressbar"
                          aria-label="Success example"
                          aria-valuenow="90"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar bg-warning"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                        <div className="col-sm-1">90%</div>
                      </div>
                      <div className="hotel-rating-persentage row align-items-center  mb-2">
                        <div className="col-sm-1 d-flex align-items-center p-0">
                          <span className="mr-1" style={{ fontSize: "18px" }}>
                            4
                          </span>
                          <FaStar className="text-warning" />
                        </div>
                        <div
                          className="progress col-sm-10 p-0"
                          role="progressbar"
                          aria-label="Success example"
                          aria-valuenow="10"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar bg-warning"
                            style={{ width: "10%" }}
                          ></div>
                        </div>
                        <div className="col-sm-1">10%</div>
                      </div>
                      <div className="hotel-rating-persentage row align-items-center  mb-2">
                        <div className="col-sm-1 d-flex align-items-center p-0">
                          <span className="mr-1" style={{ fontSize: "18px" }}>
                            0
                          </span>
                          <FaStar className="text-warning" />
                        </div>
                        <div
                          className="progress col-sm-10 p-0"
                          role="progressbar"
                          aria-label="Success example"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar bg-warning"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <div className="col-sm-1">0%</div>
                      </div>
                      <div className="hotel-rating-persentage row align-items-center  mb-2">
                        <div className="col-sm-1 d-flex align-items-center p-0">
                          <span className="mr-1" style={{ fontSize: "18px" }}>
                            0
                          </span>
                          <FaStar className="text-warning" />
                        </div>
                        <div
                          className="progress col-sm-10 p-0"
                          role="progressbar"
                          aria-label="Success example"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar bg-warning"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <div className="col-sm-1">0%</div>
                      </div>
                      <div className="hotel-rating-persentage row align-items-center  mb-2">
                        <div className="col-sm-1 d-flex align-items-center p-0">
                          <span className="mr-1" style={{ fontSize: "18px" }}>
                            0
                          </span>
                          <FaStar className="text-warning" />
                        </div>
                        <div
                          className="progress col-sm-10 p-0"
                          role="progressbar"
                          aria-label="Success example"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            className="progress-bar bg-warning"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <div className="col-sm-1">0%</div>
                      </div>
                    </div>
                  </div>
                  <div className="review-list mt-3">
                    <div className="review-item col-md-9">
                      <h5 className="mb-2">Ajip Rosidi 4 Jan 2023</h5>
                      <div
                        className="hotel-rating-star text-center mb-2"
                        style={{ width: "70px" }}
                      >
                        <span>5</span>
                        <FaStar className="hotel-rating-icon" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestiae, repudiandae. Quia eum, temporibus sit
                        repudiandae dolorum illo repellendus error rerum
                        voluptatum aliquid inventore. Perspiciatis vitae
                        nesciunt earum, excepturi at ipsam!
                      </p>
                    </div>
                    <div className="review-item col-md-9">
                      <h5 className="mb-2">John Doe 4 Jan 2023</h5>
                      <div
                        className="hotel-rating-star text-center mb-2"
                        style={{ width: "70px" }}
                      >
                        <span>5</span>
                        <FaStar className="hotel-rating-icon" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                    <div className="review-item col-md-9">
                      <h5 className="mb-2">Doe John 4 Jan 2023</h5>
                      <div
                        className="hotel-rating-star text-center mb-2"
                        style={{ width: "70px" }}
                      >
                        <span>5</span>
                        <FaStar className="hotel-rating-icon" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestiae, repudiandae. Quia eum, temporibus sit
                        repudiandae dolorum illo repellendus error
                      </p>
                    </div>
                    <div className="review-item col-md-9">
                      <h5 className="mb-2">John Doe 4 Jan 2023</h5>
                      <div
                        className="hotel-rating-star text-center mb-2"
                        style={{ width: "70px" }}
                      >
                        <span>5</span>
                        <FaStar className="hotel-rating-icon" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                    <div className="review-item col-md-9">
                      <h5 className="mb-2">Doe John 4 Jan 2023</h5>
                      <div
                        className="hotel-rating-star text-center mb-2"
                        style={{ width: "70px" }}
                      >
                        <span>5</span>
                        <FaStar className="hotel-rating-icon" />
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestiae, repudiandae. Quia eum, temporibus sit
                        repudiandae dolorum illo repellendus error
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="button-hotel-book d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <CiWarning />
                    <span className="ms-1">Show Hotel Policies</span>
                  </button>

                  <div
                    className="modal fade "
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Hotel Policies
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
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ea voluptas ratione animi sequi nesciunt at
                            nisi unde repudiandae iusto optio labore enim,
                            minima molestiae qui amet culpa, quod asperiores
                            voluptatem?
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
              <div className="col-md-5">
                <div className="card rounded-0">
                  {/* {boorLength > 0 ? (
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-center">
                        <h5 className="card-title">Login to see lower price</h5>
                        <button className="button-hotel-room-book m-0 ms-3">
                          Login
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-center">
                        <h5 className="card-title">Your booking list</h5>
                      </div>
                    </div>
                  )} */}
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-center">
                      <h5 className="card-title">Your Booking List</h5>
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    {boorLength > 0 &&
                      boor.booking_order_detail.map((item, index) => (
                        <li className="list-group-item text-center" key={index}>
                          <p>
                            <span>
                              {format(
                                new Date(item.borde_checkin),
                                "E, i LLL YYY"
                              )}{" "}
                              {` - `}
                              {format(
                                new Date(item.borde_checkout),
                                "E, i LLL YYY"
                              )}{" "}
                            </span>
                            {/* <span className="ms-3">1 Room, 2 Guest</span> */}
                            <span className="ms-3">
                              {item.borde_adults + item.borde_kids} Guest
                            </span>
                          </p>
                          <div className="hotel-price m-0 mb-3">
                            <div>
                              <NumericFormat
                                value={item.borde_price}
                                displayType="text"
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="Rp "
                              />
                            </div>
                            {item.diskonRoom && (
                              <>
                                <span className="hotel-price-undiscount">
                                  <NumericFormat
                                    value={item.borde_price}
                                    displayType="text"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="Rp "
                                  />
                                </span>
                                <span className="hotel-price-discount-value">
                                  {item.diskonRoom}% off
                                </span>
                              </>
                            )}
                          </div>
                          {/* <p className="mb-1 text-success">Include Tax</p> */}
                          <h5>{item.roomName}</h5>
                        </li>
                      ))}
                    <li className="list-group-item">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          Total Price{" "}
                          <span
                            className="text-success fw-bold"
                            style={{ fontSize: "12px" }}
                          >
                            {/* {'(tax included)'} */}
                          </span>
                        </div>
                        <div className="fs-3">
                          <NumericFormat
                            value={totalPrice}
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
                    <button
                      className={`button-list-hotel-filter ${
                        boorLength < 1 && "button-disabled"
                      }`}
                      type="button"
                      disabled={boorLength < 1}
                      onClick={(e) => handleCreateBooking(e)}
                    >
                      Continue To Book
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : getDetailHotelLoading ? (
        "Loading ..."
      ) : getDetailHotelError ? (
        getDetailHotelError.response.status === 404 ? (
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
              <h1 className="display-1 fw-bold">404</h1>
              <p className="fs-3">
                {" "}
                <span className="text-yellow">Opps!</span> Hotel Not Found.
              </p>
              <p className="lead">
                The hotel you're looking for doesn't exist. Let's find different
                one
              </p>
              <div className="container">
                <div className="row mt-5">
                  <form
                    action=""
                    className="row justify-content-center mb-5 hotel-list-search"
                  >
                    <div className="col-md-2">
                      <label htmlFor="">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Bogor"
                      />
                      <label></label>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="">Check In</label>
                      <input type="date" className="form-control" />
                      <label></label>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="">Check Out</label>
                      <input type="date" className="form-control" />
                      <label></label>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="">Person</label>
                      <input
                        type="text"
                        className="form-control"
                        value="2 Adults, 1 Children"
                        disabled
                      />
                      <label></label>
                    </div>
                    <div className="col-md-2">
                      <button className="">Search</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          getDetailHotelError.message
        )
      ) : (
        ""
      )}
      <div className="mt-5 2">
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
              onSubmit={(e) => addFacilities(e)}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add Booking for{" "}
                  <span className="text-yellow fw-bold">{roomName}</span>
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
                  <label className="col-form-label">Check In:</label>
                  <input
                    type="date"
                    className="form-control rounded-0"
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Check Out:</label>
                  <input
                    type="date"
                    className="form-control rounded-0"
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Adult(s):</label>
                  <input
                    type="number"
                    className="form-control rounded-0 w-25"
                    onChange={(e) => setAdults(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Kid(s):</label>
                  <input
                    type="number"
                    className="form-control rounded-0 w-25"
                    onChange={(e) => setKids(e.target.value)}
                    required
                  />
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
  );
};

export default HotelDetail;
