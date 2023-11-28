import { ADD_BANK, 
    UPDATE_BANK, 
    GET_BANK, 
    GET_PAYMENTGATEAWAY, 
    ADD_PAYMENTGATEAWAY, 
    UPDATE_PAYMENTGATEAWAY, 
    GET_USER_ACCOUNT,
    ADD_USER_ACCOUNT,
    UPDATE_USER_ACCOUNT
} from "../actions/paymentAction"

const initialState = {
    getBankResult: false,
    getBankLoading: false,
    getBankError: false,

    addBankResult: false,
    addBankLoading: false,
    addBankError: false,

    updateBankResult:false,
    updateBankLoading:false,
    updateBankError:false,

    getPaymentGateawayResult : false,
    getPaymentGateawayLoading:false,
    getPaymentGateawayError:false,

    addPagaResult :false,
    addPagaLoading:false,
    addPagaError:false,

    updatePaymentGateawayResult:false,
    updatePaymentGateawayLoading:false,
    updatePaymentGateawayError:false,

    getUserAccountResult:false,
    getUserAccountLoading:false,
    getUserAccountError:false,

    addUserAccountResult :false,
    addUserAccountLoading :false,
    addUserAccountError :false,

    updateUserAccountResult:false,
    updateUserAccountLoading:false,
    updateUserAccountError:false,


}

export const paymentReducers = (state = initialState, action)=>{
    switch (action.type) {
        
        case GET_BANK:{
            return{
                ...state,
                getBankResult: action.payload.data,
                getBankLoading: action.payload.loading,
                getBankError: action.payload.errorMessage,
            }
        }

        case ADD_BANK:{
            return{
                ...state,
                addBankResult: action.payload.data,
                addBankLoading: action.payload.loading,
                addBankError: action.payload.errorMessage
            }
        }

        case UPDATE_BANK:{
            return{
                ...state,
                updateBankResult : action.payload.data,
                updateBankLoading : action.payload.loading,
                updateBankError : action.payload.errorMessage,
            }
        }

        case GET_PAYMENTGATEAWAY:{
            return{
                ...state,
                getPaymentGateawayResult:action.payload.data,
                getPaymentGateawayLoading:action.payload.loading,
                getPaymentGateawayError: action.payload.errorMessage
            }
        }
        
        case ADD_PAYMENTGATEAWAY:{
            return{
                ...state,
                addPagaResult:action.payload.data,
                addPagaLoading: action.payload.loading,
                addPagaError: action.payload.errorMessage
            }
        }
        
        case UPDATE_PAYMENTGATEAWAY:{
            return{
                ...state,
                updatePaymentGateawayResult:action.payload.data,
                updatePaymentGateawayLoading:action.payload.loading,
                updatePaymentGateawayError:action.payload.errorMessage
            }
        }

        case GET_USER_ACCOUNT:{
            return{
                ...state,
                getUserAccountResult:action.payload.data,
                getUserAccountLoading:action.payload.loading,
                getUserAccountError:action.payload.errorMessage
            }
        }

        case ADD_USER_ACCOUNT:{
            return{
                ...state,
                addUserAccountResult:action.payload.data,
                addUserAccountLoading:action.payload.loading,
                addUserAccountError:action.payload.errorMessage
            }
        }

        case UPDATE_USER_ACCOUNT:{
            return{
                ...state,
                updateUserAccountResult:action.payload.data,
                updateUserAccountLoading:action.payload.loading,
                updateUserAccountError:action.payload.errorMessage
            }
        }

        default: 
            return state
    }
}
