import axios from "axios";

export const GET_MENU = "GET_MENU";

export const getMenu = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_MENU,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //getAPI
     axios({
      method: "POST",
      url: "http://localhost:4000/resto",
      data:data,
      // timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_MENU,
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
          type: GET_MENU,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const ADD_MENU = "ADD_MENU";
export const add_Menu = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_MENU,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //getAPI
     axios({
      method: "POST",
      url: "http://localhost:4000/restom",
      data:data
      // timeout: 120000,
    })
      .then((response) => {
         console.log('3. Berhasil Dapet Data : ', response.data.data);
        //berhasil get API
        dispatch({
          type: ADD_MENU,
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
          type: ADD_MENU,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const UPDATE_MENU = "UPDATE_MENU";
export const update_Menu = (data, reme_id) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_MENU,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //getAPI
     axios({
      method: "PATCH",
      url: "http://localhost:4000/resto/" + reme_id,
      data:data
      // timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: UPDATE_MENU,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal UPDATE API
        dispatch({
          type: UPDATE_MENU,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const DELETE_MENU = "DELETE_MENU";
export const delete_Menu = (reme_id) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: DELETE_MENU,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //getAPI
     axios({
      method: "DELETE",
      url: "http://localhost:4000/resto/" + reme_id,
      // timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: DELETE_MENU,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal DELETE API
        dispatch({
          type: DELETE_MENU,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const ADD_PHOTO = "ADD_PHOTO";
export const add_Photo = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_PHOTO,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //getAPI
     axios({
      method: "POST",
      url: "http://localhost:4000/resto/photo",
      data:data
      // timeout: 120000,
    })
      .then((response) => {
         console.log('3. Berhasil Dapet Data : ', response.data.message);
        
        //berhasil get API
        dispatch({
          type: ADD_PHOTO,
          payload: {
            loading: false,
            data: response.data.message,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal ADD API
        dispatch({
          type: ADD_PHOTO,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const GET_MENUDETAIL = "GET_MENUDETAIL";

export const getMenuDetail = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_MENUDETAIL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //getAPI
     axios({
      method: "POST",
      url: "http://localhost:4000/resto/menu",
      data:data,
      // timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_MENUDETAIL,
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
          type: GET_MENUDETAIL,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};