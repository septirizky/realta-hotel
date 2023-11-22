import { ADD_BANK, GET_BANK } from "../actions/paymentAction"

const initialState = {
    getBankResult: false,
    getBankLoading: false,
    getBankError: false,

    addBankResult: false,
    addBankLoading: false,
    addBankError: false,
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
        default: 
            return state
    }
}
