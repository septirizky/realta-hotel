import axios from 'axios';
import Swal from 'sweetalert2';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const GET_LIST_B_HOTEL = 'GET_LIST_B_HOTEL';
export const GET_LIST_B_HOTEL_BY_ID = 'GET_LIST_B_HOTEL_BY_ID';
export const ADD_BOOKING = 'ADD_BOOKING';
export const GET_BOOKING_DETAIL = 'GET_BOOKING_DETAIL';
export const GET_SPECIAL_OFFER = 'GET_SPECIAL_OFFER';
export const ADD_APPLY_COUPON = 'ADD_APPLY_COUPON';
export const GET_LIST_B_PRICE_ITEMS = 'GET_LIST_B_PRICE_ITEMS';
export const ADD_BOEX = 'ADD_BOEX';
export const UPDATE_BOOKING_ORDER = 'UPDATE_BOOKING_ORDER';

export const getListBHotel = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_B_HOTEL,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    // get api
    axios({
      method: 'GET',
      url: `${SERVER_URL}/booking/hotel`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get api

        dispatch({
          type: GET_LIST_B_HOTEL,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        //gagal get api
        dispatch({
          type: GET_LIST_B_HOTEL,
          payload: {
            loading: false,
            data: false,
            error: error.message,
          },
        });
      });
  };
};

export const getListBHotelById = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_B_HOTEL_BY_ID,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    // get api
    axios({
      method: 'GET',
      url: `${SERVER_URL}/booking/hotel/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get api
        dispatch({
          type: GET_LIST_B_HOTEL_BY_ID,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        //gagal get api
        console.log('error: ', error);
        dispatch({
          type: GET_LIST_B_HOTEL_BY_ID,
          payload: {
            loading: false,
            data: false,
            error: error,
          },
        });
      });
  };
};

export const createBooking = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_BOOKING,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    axios({
      method: 'POST',
      url: `${SERVER_URL}/booking/booking-orders/create`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        Swal.fire('Berhasil menambah data');
        console.log('response: ', response.data);
        dispatch({
          type: ADD_BOOKING,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        console.log('error: ', error);
        dispatch({
          type: ADD_BOOKING,
          payload: {
            loading: false,
            data: false,
            error: error,
          },
        });
      });
  };
};

export const getBookingDetail = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_BOOKING_DETAIL,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    // get api
    axios({
      method: 'GET',
      url: `${SERVER_URL}/booking/booking-orders/detail/${id}`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get api
        console.log('response: ', response.data);
        dispatch({
          type: GET_BOOKING_DETAIL,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        //gagal get api
        console.log('error: ', error);
        dispatch({
          type: GET_BOOKING_DETAIL,
          payload: {
            loading: false,
            data: false,
            error: error,
          },
        });
      });
  };
};

export const getListSpecialOffer = () => {
  return (dispatch) => {
    dispatch({
      type: GET_SPECIAL_OFFER,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    // get api
    axios({
      method: 'GET',
      url: `${SERVER_URL}/booking/special-offer`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get api

        dispatch({
          type: GET_SPECIAL_OFFER,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        //gagal get api
        dispatch({
          type: GET_SPECIAL_OFFER,
          payload: {
            loading: false,
            data: false,
            error: error,
          },
        });
      });
  };
};

export const createApplyCoupon = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_APPLY_COUPON,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    axios({
      method: 'POST',
      url: `${SERVER_URL}/booking/booking-orders/apply-discount`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        Swal.fire('Coupon Applied!');
        dispatch({
          type: ADD_APPLY_COUPON,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        console.log('error: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
        dispatch({
          type: ADD_APPLY_COUPON,
          payload: {
            loading: false,
            data: false,
            error: error,
          },
        });
      });
  };
};

export const getListPriceItems = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_B_PRICE_ITEMS,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    // get api
    axios({
      method: 'GET',
      url: `${SERVER_URL}/booking/price-items`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get api

        dispatch({
          type: GET_LIST_B_PRICE_ITEMS,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        //gagal get api
        dispatch({
          type: GET_LIST_B_PRICE_ITEMS,
          payload: {
            loading: false,
            data: false,
            error: error,
          },
        });
      });
  };
};

export const createBoex = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_BOEX,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    axios({
      method: 'POST',
      url: `${SERVER_URL}/booking/booking-orders/extra/create`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        Swal.fire('Item Added!');
        dispatch({
          type: ADD_BOEX,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        console.log('error: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
        dispatch({
          type: ADD_BOEX,
          payload: {
            loading: false,
            data: false,
            error: error,
          },
        });
      });
  };
};

export const updateBookingOrder = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOKING_ORDER,
      payload: {
        loading: true,
        data: false,
        error: false,
      },
    });

    axios({
      method: 'PUT',
      url: `${SERVER_URL}/booking/booking-orders/update/${id}`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        Swal.fire('Booking Saved!');
        dispatch({
          type: UPDATE_BOOKING_ORDER,
          payload: {
            loading: false,
            data: response.data,
            error: false,
          },
        });
      })
      .catch((error) => {
        console.log('error: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
        dispatch({
          type: UPDATE_BOOKING_ORDER,
          payload: {
            loading: false,
            data: false,
            error: error,
          },
        });
      });
  };
};
