import axios from "axios";

export const GET_BANK = "GET_BANK";
export const ADD_BANK = "ADD_BANK";

export const getBank = ()=>{
    return async (dispatch) => {
        dispatch({
            type: GET_BANK,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method: "GET",
            url: 'http://localhost:4000/getAllBank',
            timeout: 120000
        })
        .then((res)=>{
            // console.log(res.data)
            dispatch({
                type: GET_BANK,
                payload: {
                    loading: false,
                    data: res.data,
                    errorMessage: false
                }
            })
        })
        .catch((err)=>{
            // console.log('3. Error',err.message)
            dispatch({
                type: GET_BANK,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: err.message
                }
            })
        })
    }
}

export const AddBank = (data)=>{
    return async(dispatch)=>{
        dispatch({
            type:ADD_BANK,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method:'POST',
            url: 'http://localhost:4000/createBank',
            timeout:12000,
            data: data
        })
        .then((result)=>{
            // console.log(result)
            dispatch({
                type:ADD_BANK,
                payload: {
                loading: false,
                data: result.data.message,
                errorMessage: false
            }
            })
        })
        .catch((error)=>{
            dispatch({
                type:ADD_BANK,
                 payload: {
                loading: false,
                data: false,
                errorMessage: error.response.data.message
            }
            })
        })
    }
}