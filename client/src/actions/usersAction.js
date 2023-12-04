import axios from "axios";


export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_GUEST = 'SIGNUP_GUEST';
export const SIGNIN_GUEST = 'SIGNIN_GUEST';
export const GET_USERS = 'GET_USERS';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const INSERT_PROFILE = 'INSERT_PROFILE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const RegUsers = (data) => {
    return async (dispatch) => {
        dispatch({
            type: REGISTER_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/users/signupUser",
            data : data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: REGISTER_USER,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: REGISTER_USER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const LogUsers = (data) => {
    return async (dispatch) => {
        dispatch({
            type: LOGIN_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/users/signin",
            data : data,
            timeout: 120000
        }).then((res) => {
            console.log(res)
            dispatch({
                type: LOGIN_USER,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: LOGIN_USER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const RegGuest = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SIGNUP_GUEST,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/users/signupGuest",
            data : data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: SIGNUP_GUEST,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: SIGNUP_GUEST,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const LogGuest = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SIGNIN_GUEST,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/users/loginGuest",
            data : data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: SIGNIN_GUEST,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: SIGNIN_GUEST,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const GetUsers = (data) => {
    return async (dispatch) => {
        dispatch({
            type: GET_USERS,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:4000/users/",
            data : data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_USERS,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_USERS,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}


export const DelUsers = (id) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:4000/users/"+id,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DELETE_USER,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DELETE_USER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const UpdUsers = (id,data) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:4000/users/"+id,
            data : data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: UPDATE_USER,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: UPDATE_USER,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const InsProfile = (data) => {
    return async (dispatch) => {
        dispatch({
            type: INSERT_PROFILE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/users/insert/+id",
            data : data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: INSERT_PROFILE,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: INSERT_PROFILE,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const ChaPassword = (id,data) => {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_PASSWORD,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "PATCH",
            url: "http://localhost:4000/users/change-password/"+id,
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: CHANGE_PASSWORD,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: CHANGE_PASSWORD,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}