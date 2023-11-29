import React from 'react';
import { Link } from 'react-router-dom';
import './styles/booking.css';
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { FaCar, FaShoppingCart, FaStar } from 'react-icons/fa';

const ListHotel = () => {
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="container mt-5 booking-hotel-container">
      <div className="row">
        <form
          action=""
          className="row justify-content-center mb-5 hotel-list-search"
        >
          <div className="col-md-2">
            <label htmlFor="">Location</label>
            <input type="text" className="form-control" placeholder="Bogor" />
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
                  />
                </div>
                <div className="mb-2 col-md-12">
                  <label>To</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="350000"
                  />
                </div>
              </div>
              <div>
                <h5>Hotel Facilities</h5>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Parking
                  </label>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
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
            <div className="row hotel-item">
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
                    <h3>Aston Hotel Sentul</h3>
                    <span>VIP Member</span>
                  </div>
                  <div className="hotel-price">
                    <div>
                      Rp. 350.000
                      <span className="hotel-price-per">/day</span>
                    </div>
                    <span className="hotel-price-undiscount">Rp. 550.000</span>
                    <span className="hotel-price-discount-value">10% off</span>
                  </div>
                  <p className="hotel-address">Near Sentul Golf</p>
                  <div className="hotel-rating">
                    <div className="hotel-rating-star">
                      <span>3.9</span>
                      <FaStar className="hotel-rating-icon" />
                    </div>
                    <div className="hotel-rating-count">
                      (335 Ratings) <span className="text-success">Good</span>
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
            <div className="row hotel-item">
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
                    <h3>Aston Hotel Sentul</h3>
                    <span>VIP Member</span>
                  </div>
                  <p className="hotel-address">Near Sentul Golf</p>
                  <div className="hotel-rating">
                    <div className="hotel-rating-star">
                      <span>3.9</span>
                      <FaStar className="hotel-rating-icon" />
                    </div>
                    <div className="hotel-rating-count">
                      (335 Ratings) <span className="text-success">Good</span>
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
                  <div className="hotel-price">
                    <div>
                      Rp. 350.000
                      <span className="hotel-price-per">/day</span>
                    </div>
                    <span className="hotel-price-undiscount">Rp. 550.000</span>
                    <span className="hotel-price-discount-value">10% off</span>
                  </div>
                </div>
                <div className="hotel-body-bottom">
                  <a href="/#" className="hotel-view-details-button">
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="row hotel-item">
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
                    <h3>Aston Hotel Sentul</h3>
                    <span>VIP Member</span>
                  </div>
                  <p className="hotel-address">Near Sentul Golf</p>
                  <div className="hotel-rating">
                    <div className="hotel-rating-star">
                      <span>3.9</span>
                      <FaStar className="hotel-rating-icon" />
                    </div>
                    <div className="hotel-rating-count">
                      (335 Ratings) <span className="text-success">Good</span>
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
                  <div className="hotel-price">
                    <div>
                      Rp. 350.000
                      <span className="hotel-price-per">/day</span>
                    </div>
                    <span className="hotel-price-undiscount">Rp. 550.000</span>
                    <span className="hotel-price-discount-value">10% off</span>
                  </div>
                </div>
                <div className="hotel-body-bottom">
                  <a href="/#" className="hotel-view-details-button">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHotel;
