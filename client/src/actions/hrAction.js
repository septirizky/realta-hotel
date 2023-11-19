import axios from "axios";

export const GET_DEPARTMENT = "GET_DEPARTMENT"
export const POST_DEPARTMENT = "POST_DEPARTMENT"
export const DELETE_DEPARTMENT = "DELETE_DEPARTMENT"
export const UPDATE_DEPARTMENT = "UPDATE_DEPARTMENT"

export const GetDepartment = () => {
    return async (dispatch) => {
        dispatch({
            type: GET_DEPARTMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: "http://localhost:4000/hr/department",
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: GET_DEPARTMENT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: GET_DEPARTMENT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}

export const PostDepartment = (data) => {
    return async (dispatch) => {
        dispatch({
            type: POST_DEPARTMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "POST",
            url: "http://localhost:4000/hr/department",
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: POST_DEPARTMENT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: POST_DEPARTMENT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const DeleteDepartment = (id) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_DEPARTMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "DELETE",
            url: "http://localhost:4000/hr/department/"+id,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}
export const UpdateDepartment = (id, data) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_DEPARTMENT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "PUT",
            url: "http://localhost:4000/hr/department/"+id,
            data: data,
            timeout: 120000
        }).then((res) => {
            dispatch({
                type: UPDATE_DEPARTMENT,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        }).catch((e) => {
            dispatch({
                type: UPDATE_DEPARTMENT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: e.response.data.message
                }
            })
        })
    }
}