import axios from "axios";

export const GET_VENDOR = "GET_VENDOR";
export const GET_VENDORSTOCK = "GET_VENDORSTOCK";
export const GET_VENDORID = "GET_VENDORID";
export const GET_POSTVENDOR = "GET_POSTVENDOR";
export const GET_DELETEVENDOR = "GET_DELETEVENDOR";

export const GET_STOCK = "GET_STOCK";
export const GET_STOCKDETAIL = "GET_STOCKDETAIL";

export const GET_ORDER = "GET_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const ADDSTATUS_ORDER = "ADDSTATUS_ORDER";
export const GET_PURCHASE = "GET_PURCHASE";
export const GET_GALLERY = "GET_GALLERY";

export const GET_HOTEL = "GET_HOTEL";
export const GET_HOTELID = "GET_HOTELID";

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
      url: "http://localhost:4000/vendor",
      timeout: 120000,
    })
      .then((res) => {
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
export const GetPostVendor = (data) => {
  return async (dispatch) => {
    dispatch({
      type: GET_POSTVENDOR,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "POST",
      url: `http://localhost:4000/insertvendor`,
      timeout: 120000,
      data: data,
    })
      .then((res) => {
        dispatch({
          type: GET_POSTVENDOR,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_POSTVENDOR,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const GetDeleteVendor = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_DELETEVENDOR,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "DELETE",
      url: `http://localhost:4000/deletevendor/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_DELETEVENDOR,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_DELETEVENDOR,
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
      url: `http://localhost:4000/liststockvendorproduct/${id}`,
      timeout: 120000,
    })
      .then((res) => {
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
      url: `http://localhost:4000/getvendorbyId/${id}`,
      timeout: 120000,
    })
      .then((res) => {
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
      url: "http://localhost:4000/liststocks",
      timeout: 120000,
    })
      .then((res) => {
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
      url: `http://localhost:4000/detailinfostock/${id}`,
      timeout: 120000,
    })
      .then((res) => {
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
      url: `http://localhost:4000/listorderdetail/${id}`,
      timeout: 120000,
    })
      .then((res) => {
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
export const Deleteorderheader = (id) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_ORDER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "DELETE",
      url: `http://localhost:4001/deletepurchaseheader/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: DELETE_ORDER,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: DELETE_ORDER,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};
export const PostStatusHeader = (status, id) => {
  // console.log(status, id, "345");
  return async (dispatch) => {
    dispatch({
      type: ADDSTATUS_ORDER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "POST",
      url: `http://localhost:4001/updatestatuspurchase/${id}`,
      timeout: 120000,
      data: { status },
    })
      .then((res) => {
        console.log(res.data, "rrrr");
        dispatch({
          type: ADDSTATUS_ORDER,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: ADDSTATUS_ORDER,
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
      url: "http://localhost:4000/listhotel",
      timeout: 120000,
    })
      .then((res) => {
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
export const GetHotelbyId = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_HOTELID,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "GET",
      url: `http://localhost:4001/listhotelId/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: GET_HOTELID,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_HOTELID,
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
      url: "http://localhost:4000/listpurchase",
      timeout: 120000,
    })
      .then((res) => {
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
      url: "http://localhost:4000/listgallery",
      timeout: 120000,
    })
      .then((res) => {
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
