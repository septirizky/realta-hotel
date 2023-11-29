import axios from "axios";

export const GET_VENDOR = "GET_VENDOR";
export const GET_VENDORSTOCK = "GET_VENDORSTOCK";
export const GET_VENDORID = "GET_VENDORID";

export const GET_STOCK = "GET_STOCK";
export const GET_STOCKDETAIL = "GET_STOCKDETAIL";

export const GET_ORDER = "GET_ORDER";
export const GET_PURCHASE = "GET_PURCHASE";
export const GET_GALLERY = "GET_GALLERY";

export const GET_HOTEL = "GET_HOTEL";

export const ADDITEM = "ADDITEM";
export const DELITEM = "DELITEM";

export const GetVendor = () => {
  return (dispatch) => {
    dispatch({
      type: GET_VENDOR,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: "http://localhost:4001/vendor",
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_VENDOR,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_VENDOR,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const GetVendorsStock = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_VENDORSTOCK,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: `http://localhost:4001/liststockvendorproduct/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_VENDORSTOCK,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_VENDORSTOCK,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const GetVendorId = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_VENDORID,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: `http://localhost:4001/getvendorbyId/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_VENDORID,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_VENDORID,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const GetStock = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_STOCK,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "GET",
      url: "http://localhost:4001/liststocks",
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_STOCK,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_STOCK,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const GetStockDetail = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_STOCKDETAIL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "GET",
      url: `http://localhost:4001/detailinfostock/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_STOCKDETAIL,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_STOCKDETAIL,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const GetOrder = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "GET",
      url: `http://localhost:4001/listorderdetail/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_ORDER,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const GetHotel = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_HOTEL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "GET",
      url: "http://localhost:4001/listhotel",
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_HOTEL,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_HOTEL,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const GetPurchaseOrder = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_PURCHASE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "GET",
      url: "http://localhost:4001/listpurchase",
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_PURCHASE,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_PURCHASE,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};

export const GetGallery = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_GALLERY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "GET",
      url: "http://localhost:4001/listgallery",
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_GALLERY,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_GALLERY,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const addCart = (listuser) => {
  return {
    type: "ADDITEM",
    payload: listuser,
  };
};

// For Delete Item to Cart
export const delCart = (listuser) => {
  return {
    type: "DELITEM",
    payload: listuser,
  };
};
