import axios from "axios";

export const GET_BANK = "GET_BANK";
export const ADD_BANK = "ADD_BANK";
export const UPDATE_BANK = "UPDATE_BANK";

export const GET_PAYMENTGATEAWAY = "GET_PAYMENTGATEAWAY";
export const ADD_PAYMENTGATEAWAY = "ADD_PAYMENTGATEAWAY";
export const UPDATE_PAYMENTGATEAWAY = "UPDATE_PAYMENTGATEAWAY";

export const GET_USER_ACCOUNT = "GET_USER_ACCOUNT";
export const ADD_USER_ACCOUNT = "ADD_USER_ACCOUNT";
export const UPDATE_USER_ACCOUNT = "UPDATE_USER_ACCOUNT";

export const getBank = (bank_name)=>{
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
            method: "POST",
            url: 'http://localhost:4000/searchBank',
            data:bank_name,
            timeout: 120000
        })
        .then((res)=>{
            // console.log(res.data)
            dispatch({
                type: GET_BANK,
                payload: {
                    loading: false,
                    data: res.data.data,
                    errorMessage: false
                }
            })
        })
        .catch((err)=>{
            // console.log('3. Error',err)
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
            timeout:1200,
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
            // console.log(error.response.data.message)
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

export const updateBank = (data)=>{
    return async(dispatch)=>{
        dispatch({
            type:UPDATE_BANK,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        await axios({
            method:'PUT',
            url: 'http://localhost:4000/updateBank/'+ data.bank_entity_id,
            data: data,
            timeout:12000
        })
        .then((result)=>{
            
            dispatch({
                type:UPDATE_BANK,
                payload: {
                    loading: false,
                    data: result.data.message,
                    errorMessage: false
                }
            })
        })
        .catch((error)=>{
            
            dispatch({
                type:UPDATE_BANK,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: error.response.data.message
                }
            })
        })
    }
}

export const getPaymentGateaway = (paga_code)=>{
    return async (dispatch)=>{
        dispatch({
            type:GET_PAYMENTGATEAWAY,
            payload:{
                loading :true,
                data:false,
                errorMessage:false
            }
        })
        await axios({
            method: 'POST',
            url: 'http://localhost:4000/searchPaymentGateaway',
            data: paga_code,
            timeout:12000
        })
        .then((result)=>{
            // console.log(result)
            dispatch({
                type:GET_PAYMENTGATEAWAY,
                payload:{
                    loading :false,
                    data:result.data.data,
                    errorMessage:false
                }
            })
        })
        .catch((error)=>{
            console.log(error)
            dispatch({
                type:GET_PAYMENTGATEAWAY,
                payload:{
                    loading :false,
                    data:false,
                    errorMessage:error.message
                }
            })
        })
    }
}

export const addPaga = (data)=>{
    return async(dispatch)=>{
        dispatch({
            type:ADD_PAYMENTGATEAWAY,
            payload:{
                loading:false,
                data:false,
                errorMessage:false
            }
        })
        await axios({
            method:'POST',
            url: 'http://localhost:4000/addPaymentGateaway',
            timeout:12000,
            data:data
        })
        .then((result)=>{
            dispatch({
                type:ADD_PAYMENTGATEAWAY,
                payload:{
                    loading:false,
                    data:result.data.message,
                    errorMessage:false
                }
            })
        })
        .catch((error)=>{
            dispatch({
                type:ADD_PAYMENTGATEAWAY,
                payload:{
                    loading:false,
                    data:false,
                    errorMessage:error.response.data.message
                }
            })
        })
    }
}

export const updatePaymentGateaway = (data)=>{
    return async(dispatch)=>{
        dispatch({
            type:UPDATE_PAYMENTGATEAWAY,
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        })
        await axios({
            method:'PUT',
            url: 'http://localhost:4000/updatePaymentGateaway/'+data.paga_entity_id,
            data:data,
            timeout:12000
        })
        .then((result)=>{
            // console.log(result)
            dispatch({
                type:UPDATE_PAYMENTGATEAWAY,
                payload:{
                    loading:false,
                    data:result.data.message,
                    errorMessage:false
                }
            })
        })
        .catch((error)=>{
            // console.log(error)
            dispatch({
                type:UPDATE_PAYMENTGATEAWAY,
                payload:{
                    loading:false,
                    data:false,
                    errorMessage:error.response.data.message
                }
            })
        })
    }
}

export const getUserAccount = (usac_user_id)=>{
    return async(dispatch)=>{
        dispatch({
            type:GET_USER_ACCOUNT,
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        })
        await axios({
            method:'GET',
            url:'http://localhost:4000/getUserAccountById/'+ usac_user_id,
            timeout:12000,
        })
        .then((result)=>{
            // console.log(result.data.data)
            dispatch({
                type:GET_USER_ACCOUNT,
                payload:{
                    loading:false,
                    data:result.data.data,
                    errorMessage:false
                }
            })
        })
        .catch((error)=>{
            // console.log(error.message)
            dispatch({
                type:GET_USER_ACCOUNT,
                payload:{
                    loading:false,
                    data:false,
                    errorMessage:error.message
                }
            })
        })
    }
}

export const addUserAccount = (data)=>{
    return async (dispatch)=>{
        dispatch({
            type:ADD_USER_ACCOUNT,
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        })
        await axios({
            method:'POST',
            url:'http://localhost:4000/addUserAccount',
            data:data,
            timeout:12000
        })
        .then((result)=>{
            console.log(result.data.message)
            dispatch({
                type:ADD_USER_ACCOUNT,
                payload:{
                    loading:false,
                    data:result.data.message,
                    errorMessage:false
                }
            })
        })
        .catch((error)=>{
            console.log(error)
            dispatch({
                type:ADD_USER_ACCOUNT,
                payload:{
                    loading:false,
                    data:false,
                    errorMessage:error.response.data.message
                }
            })
        })
    }
}


export const updateUserAccount = (data)=>{
    return async(dispatch)=>{
        dispatch({
            type:UPDATE_USER_ACCOUNT,
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        })
        await axios({
            method:'PUT',
            url:'http://localhost:4000/updateUserAccount/'+ data.usac_id,
            data:data,
            timeout:12000
        })
        .then((result)=>{
            // console.log(result)
            dispatch({
                type:UPDATE_USER_ACCOUNT,
                payload:{
                    loading:false,
                    data:result.data.message,
                    errorMessage:false
                }
            })
        })
        .catch((error)=>{
            console.log(error)
            dispatch({
                type:UPDATE_USER_ACCOUNT,
                payload:{
                    loading:false,
                    data:false,
                    errorMessage:error.message
                }
            })
        })
    }
}