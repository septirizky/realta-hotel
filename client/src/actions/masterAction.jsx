import axios from "axios";

// show locations
export const GET_REGION = "GET_REGION";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_PROVINCE = "GET_PROVINCE";
export const GET_CITY = "GET_CITY";

// show policy
export const GET_POLICY = "GET_POLICY";

// add locations region
export const POST_REGION = "POST_REGION";
// update locations region
export const UPDATE_REGION = "UPDATE_REGION";
// delete locations region
export const DELETE_REGION = "DELETE_REGION";

// add locations country
export const POST_COUNTRY = "POST_COUNTRY";
// update locations country
export const UPDATE_COUNTRY = "UPDATE_COUNTRY";
// delete locations country
export const DELETE_COUNTRY = "DELETE_COUNTRY";

// add locations province
export const POST_PROVINCE = "POST_PROVINCE";
// update locations province
export const UPDATE_PROVINCE = "UPDATE_PROVINCE";
// delete locations province
export const DELETE_PROVINCE = "DELETE_PROVINCE";

// add locations city
export const POST_CITY = "POST_CITY";
// update locations city
export const UPDATE_CITY = "UPDATE_CITY";
// delete locations city
export const DELETE_CITY = "DELETE_CITY";

// add policy
export const POST_POLICY = "POST_POLICY";
// edit policy
export const UPDATE_POLICY = "UPDATE_POLICY";
// delete policy
export const DELETE_POLICY = "DELETE_POLICY";

// locations
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

export const postRegions = (dataRegion) => {
  return async (dispatch) => {
    dispatch({
      type: POST_REGION,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:4000/regions",
      timeout: 120000,
      data: dataRegion,
    })
      .then((res) => {
        dispatch({
          type: POST_REGION,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_REGION,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const updateRegions = (dataRegion, idRegion) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_REGION,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "PUT",
      url: "http://localhost:4000/regions/" + idRegion,
      data: dataRegion,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_REGION,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_REGION,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const deleteRegions = (idRegion) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_REGION,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "DELETE",
      url: "http://localhost:4000/regions/" + idRegion,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: DELETE_REGION,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_REGION,
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

export const postCountry = (dataCountry) => {
  return async (dispatch) => {
    dispatch({
      type: POST_COUNTRY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:4000/country",
      timeout: 120000,
      data: dataCountry,
    })
      .then((res) => {
        dispatch({
          type: POST_COUNTRY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const updateCountry = (dataCountry, idCountry) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_COUNTRY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "PUT",
      url: "http://localhost:4000/country/" + idCountry,
      data: dataCountry,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_COUNTRY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const deleteCountry = (idCountry) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_COUNTRY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "DELETE",
      url: "http://localhost:4000/country/" + idCountry,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: DELETE_COUNTRY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const getProvince = (idProvince) => {
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
      url: "http://localhost:4000/province/" + idProvince,
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

export const postProvince = (dataProvince) => {
  return async (dispatch) => {
    dispatch({
      type: POST_PROVINCE,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:4000/province",
      timeout: 120000,
      data: dataProvince,
    })
      .then((res) => {
        dispatch({
          type: POST_PROVINCE,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_PROVINCE,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const updateProvince = (dataProvince, idProvince) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_PROVINCE,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "PUT",
      url: "http://localhost:4000/province/" + idProvince,
      data: dataProvince,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_PROVINCE,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_COUNTRY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const deleteProvince = (idProvince) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_PROVINCE,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "DELETE",
      url: "http://localhost:4000/province/" + idProvince,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: DELETE_PROVINCE,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_PROVINCE,
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

export const postCity = (dataCity) => {
  return async (dispatch) => {
    dispatch({
      type: POST_CITY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:4000/city",
      timeout: 120000,
      data: dataCity,
    })
      .then((res) => {
        dispatch({
          type: POST_CITY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_CITY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const updateCity = (dataCity, idCity) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_CITY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "PUT",
      url: "http://localhost:4000/city/" + idCity,
      data: dataCity,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_CITY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_CITY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const deleteCity = (idCity) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_CITY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "DELETE",
      url: "http://localhost:4000/city/" + idCity,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: DELETE_CITY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_CITY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

// policy
export const getPolicy = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_POLICY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:4000/policy",
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_POLICY,
          payload: {
            data: res.data.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_POLICY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const postPolicy = (dataPolicy) => {
  return async (dispatch) => {
    dispatch({
      type: POST_POLICY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:4000/policy",
      timeout: 120000,
      data: dataPolicy,
    })
      .then((res) => {
        dispatch({
          type: POST_POLICY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_POLICY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const updatePolicy = (dataPolicy, idPolicy) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_POLICY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "PUT",
      url: "http://localhost:4000/policy/" + idPolicy,
      data: dataPolicy,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: UPDATE_POLICY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_POLICY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};

export const deletePolicy = (idPolicy) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_POLICY,
      payload: {
        data: false,
        loading: true,
        errorMsg: false,
      },
    });

    await axios({
      method: "DELETE",
      url: "http://localhost:4000/policy/" + idPolicy,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: DELETE_POLICY,
          payload: {
            data: res.data,
            loading: false,
            errorMsg: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: DELETE_POLICY,
          payload: {
            data: false,
            loading: false,
            errorMsg: err.response.data.message,
          },
        });
      });
  };
};
