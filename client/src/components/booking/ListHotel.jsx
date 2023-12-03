import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/booking.css";
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { FaCar, FaShoppingCart, FaStar } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { getListBHotel } from "../../actions/bookingHotelAction";

const ListHotel = () => {
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [filter, setFilter] = useState({
    hotelName: undefined,
    minRateprice: undefined,
    maxRatePrice: undefined,
  });

  const [search, setSearch] = useState(undefined);
  const [filterMinPrice, setFilterMinPrice] = useState(undefined);
  const [filterMaxPrice, setFilterMaxPrice] = useState(undefined);

  const { getListBHotelResult, getListBHotelLoading, getListBHotelError } =
    useSelector((state) => state.BookingHotelReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListBHotel(filter));
  }, [dispatch, filter, search, filterMinPrice, filterMaxPrice]);

  const handleSearchOnChange = (e) => {
    setFilter({
      ...filter,
      hotelName: e.target.value,
      minRateprice: filterMinPrice,
      maxRatePrice: filterMaxPrice,
    });
  };

  const handleFilterMinPrice = (e) => {
    setFilter({
      ...filter,
      hotelName: filter.hotelName,
      minRatePrice: e.target.value,
      maxRatePrice: filter.maxRatePrice,
    });
  };

  const handleFilterMaxPrice = (e) => {
    setFilter({
      ...filter,
      hotelName: filter.hotelName,
      minRatePrice: filter.minRateprice,
      maxRatePrice: e.target.value,
    });
  };

  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);

  // const handlePerson = (e) => {
  //   e.preventDefault()

  // }

  console.log("getListBHotelResult: ", getListBHotelResult);
  console.log("filter:", filter);

  return (
    <div className="container mt-5 booking-hotel-container">
      <div className="row">
        <form
          action=""
          className="row justify-content-center mb-5 hotel-list-search"
          // onSubmit={(e) => handleSubmitSearch(e)}
        >
          <div className="col-md-2">
            <label htmlFor="">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bogor"
              // onChange={(e) => setSearch(e.target.value)}
              onChange={(e) => handleSearchOnChange(e)}
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
            {/* <input
              type="text"
              className="form-control"
              value="2 Adults, 1 Children"
              disabled
            /> */}
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
            <button type="submit">Searchs</button>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="row">
            <div className="d-flex justify-content-between mb-3">
              <h4>Filter</h4>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setFilter({
                    hotelName: undefined,
                    minRateprice: undefined,
                    maxRatePrice: undefined,
                  });
                  setFilterMinPrice(undefined);
                  setFilterMaxPrice(undefined);
                }}
              >
                Clear All
              </button>
            </div>
            <form action="">
              <div className="mb-3">
                <h5>Price Range</h5>
                <div className="mb-2 col-md-12">
                  <label>From</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    onChange={(e) => handleFilterMinPrice(e)}
                  />
                </div>
                <div className="mb-2 col-md-12">
                  <label>To</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="350000"
                    onChange={(e) => handleFilterMaxPrice(e)}
                  />
                </div>
              </div>
              <div>
                <h5>Hotel Facilities</h5>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Parking
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Security
                  </label>
                </div>
              </div>
              {/* <button className="button-list-hotel-filter">Save Filter</button> */}
            </form>
          </div>
        </div>
        <div className="col-md-9">
          {/* <div>Home / Hotel / Bogor</div> */}
          <div className="hotel-list">
            {getListBHotelResult ? (
              getListBHotelResult.data.length < 1 ? (
                "Data tidak ditemukan"
              ) : (
                getListBHotelResult.data.map((hotel) => {
                  return (
                    <div className="row hotel-item" key={hotel.hotel_id}>
                      <div className="col-md-6">
                        {/* <>
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-1.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-2.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-3.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-4.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-5.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-6.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-7.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-8.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-9.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-10.jpg"
                      />
                    </SwiperSlide>
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-1.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-2.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-3.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-4.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-5.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-6.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-7.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-8.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-9.jpg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        alt="slid-img"
                        src="https://swiperjs.com/demos/images/nature-10.jpg"
                      />
                    </SwiperSlide>
                  </Swiper>
                </> */}
                        <img
                          alt="slid-img"
                          src={
                            hotel.facilities[0].facility_photos[0]
                              ? hotel.facilities[0].facility_photos[0].fapho_url
                              : "https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
                          }
                          className="hotel-img"
                        />
                      </div>
                      <div className="col-md-6 hotel-body">
                        <div className="hotel-body-top">
                          <div className="hotel-title">
                            <h3>{hotel.hotel_name}</h3>
                            <span>VIP Member</span>
                          </div>
                          <div className="hotel-price">
                            <div>
                              <NumericFormat
                                value={
                                  hotel.facilities[0].faci_rate_price -
                                  (hotel.facilities[0].faci_rate_price *
                                    hotel.facilities[0].faci_discount) /
                                    100
                                }
                                displayType="text"
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="Rp "
                              />
                              <span className="hotel-price-per">/day</span>
                            </div>
                            <span className="hotel-price-undiscount">
                              <NumericFormat
                                value={hotel.facilities[0].faci_rate_price}
                                displayType="text"
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="Rp "
                              />
                            </span>
                            <span className="hotel-price-discount-value">
                              10% off
                            </span>
                          </div>
                          <p className="hotel-address">
                            {hotel.hotel_addr.addr_line_1}
                          </p>
                          <div className="hotel-rating">
                            <div className="hotel-rating-star">
                              <span>4.5</span>
                              <FaStar className="hotel-rating-icon" />
                            </div>
                            <div className="hotel-rating-count">
                              (5 Ratings){" "}
                              <span className="text-success">Good</span>
                            </div>
                          </div>
                          <div className="hotel-facilities">
                            <div className="mr-2 hotel-facilities-item">
                              <FaCar />
                              <span>Parking</span>
                            </div>
                            <div className="mr-2 hotel-facilities-item">
                              <FaShoppingCart />
                              <span>Market</span>
                            </div>
                          </div>
                          <div className="hotel-default-room">
                            {hotel.facilities[0].faci_name}
                          </div>
                        </div>
                        <div className="hotel-body-bottom">
                          <Link
                            to={`/booking/hotel/${hotel.hotel_id}`}
                            className="hotel-view-details-button"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : getListBHotelLoading ? (
              <p>Loading . . .</p>
            ) : (
              <p>{getListBHotelError ? getListBHotelError : "Data Kosong"}</p>
            )}
          </div>
        </div>
      </div>

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
            // onSubmit={(e) => addFacilities(e)}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Person
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
                <label className="col-form-label">Adult(s):</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  onChange={(e) => setAdults(+e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Kid(s):</label>
                <input
                  type="number"
                  className="form-control rounded-0"
                  onChange={(e) => setKids(+e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
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
  );
};

export default ListHotel;
