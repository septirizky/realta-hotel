import axios from "axios";

export const GET_FACIHIS = "GET_FACIHIS";
export const ADD_FACIHIS = "ADD_FACIHIS";

export const getFacilityHistory = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_FACIHIS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //getAPI
    axios({
      method: "GET",
      url: "http://localhost:4000/hotel/facilities/facility_history/",
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_FACIHIS,
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
          type: GET_FACIHIS,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addFacilityHistory = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_FACIHIS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //ADDAPI
    axios({
      method: "POST",
      url: "http://localhost:4000/hotel/facilities/facility_history/",
      data: data,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil ADD API
        dispatch({
          type: ADD_FACIHIS,
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
          type: ADD_FACIHIS,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
