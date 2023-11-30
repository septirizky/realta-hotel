import axios from "axios";

export const GET_FACI = "GET_FACI";
export const ADD_FACI = "ADD_FACI";
export const UPDATE_FACI = "UPDATE_FACI";
export const DELETE_FACI = "DELETE_FACI";
export const GET_CATEGORY = "GET_CATEGORY";

export const getCategory = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_CATEGORY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //getAPI
    axios({
      method: "GET",
      url: "http://localhost:4000/category",
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_CATEGORY,
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
          type: GET_CATEGORY,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getFacilities = (idHotel) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_FACI,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //getAPI
    axios({
      method: "GET",
      url: "http://localhost:4000/hotel/facilities/" + idHotel,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_FACI,
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
          type: GET_FACI,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addFacilities = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_FACI,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //ADDAPI
    axios({
      method: "POST",
      url: "http://localhost:4000/hotel/facilities/",
      data: data,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil ADD API
        dispatch({
          type: ADD_FACI,
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
          type: ADD_FACI,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const updateFacilities = (data) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_FACI,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "PUT",
      url: "http://localhost:4000/hotel/facilities/" + data.faciId,
      data: data,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_FACI,
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
          type: UPDATE_FACI,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteFacilities = (idFaci) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_FACI,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "DELETE",
      url: "http://localhost:4000/hotel/facilities/" + idFaci,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: DELETE_FACI,
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
          type: DELETE_FACI,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
