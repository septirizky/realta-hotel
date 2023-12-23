import axios from "axios";

export const GET_HOTEL = "GET_HOTEL";
export const ADD_HOTEL = "ADD_HOTEL";
export const UPDATE_HOTEL = "UPDATE_HOTEL";
export const DELETE_HOTEL = "DELETE_HOTEL";

export const GET_CITY = "GET_CITY";

export const getHotel = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_HOTEL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //getAPI
    axios({
      method: "POST",
      url: "http://localhost:4000/hotel",
      data: data,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_HOTEL,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal get API
        dispatch({
          type: GET_HOTEL,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addHotel = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_HOTEL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //ADDAPI
    axios({
      method: "POST",
      url: "http://localhost:4000/hotel/add",
      data: data,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil ADD API
        dispatch({
          type: ADD_HOTEL,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal ADD API
        dispatch({
          type: ADD_HOTEL,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const updateHotel = (data) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_HOTEL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "PUT",
      url: "http://localhost:4000/hotel/" + data.hotelId,
      data: data,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_HOTEL,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal get API
        dispatch({
          type: UPDATE_HOTEL,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteHotel = (idHotel) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_HOTEL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "DELETE",
      url: "http://localhost:4000/hotel/" + idHotel,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: DELETE_HOTEL,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal get API
        dispatch({
          type: DELETE_HOTEL,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getCity = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_CITY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //getAPI
    axios({
      method: "GET",
      url: "http://localhost:4000/city",
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_CITY,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal get API
        dispatch({
          type: GET_CITY,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
