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
            <input
              type="text"
              className="form-control"
              value="2 Adults, 1 Children"
              disabled
            />
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
              <button className="btn btn-danger">Clear All</button>
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
              <button className="button-list-hotel-filter">Save Filter</button>
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
                          src="https://source.unsplash.com/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
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
                              Rp. 350.000
                              <span className="hotel-price-per">/day</span>
                            </div>
                            <span className="hotel-price-undiscount">
                              Rp. 550.000
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
                              <span>3.9</span>
                              <FaStar className="hotel-rating-icon" />
                            </div>
                            <div className="hotel-rating-count">
                              (335 Ratings){" "}
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
                            Indonesia Standar Double
                          </div>
                        </div>
                        <div className="hotel-body-bottom">
                          <Link
                            to={`/booking/hotel/1`}
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
    </div>
  );
};

export default ListHotel;
