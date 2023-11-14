import axios from "axios";

// show locations
export const GET_REGION = "GET_REGION";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_PROVINCE = "GET_PROVINCE";
export const GET_CITY = "GET_CITY";

export const getRegions = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_REGION,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/regions",
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_REGION,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_REGION,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const getCountry = (idRegion) => {
  return async (dispatch) => {
    dispatch({
      type: GET_COUNTRY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/country/" + idRegion,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_COUNTRY,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const getProvince = (idCountry) => {
  return async (dispatch) => {
    dispatch({
      type: GET_PROVINCE,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/province/" + idCountry,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_PROVINCE,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PROVINCE,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const getCity = (idProvince) => {
  return async (dispatch) => {
    dispatch({
      type: GET_CITY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/city/" + idProvince,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_CITY,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_CITY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};
