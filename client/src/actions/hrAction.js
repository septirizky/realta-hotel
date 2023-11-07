import axios from "axios";

export const GET_USERS = "GET_USERS"

export const GetUsers = () => {
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
            url: "http://localhost:3000/posts",
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