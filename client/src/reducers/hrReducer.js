import {
    DELETE_DEPARTMENT,
    DeleteDepartment,
    GET_DEPARTMENT,
    POST_DEPARTMENT,
    UPDATE_DEPARTMENT
} from "../actions/hrAction";

const initialState = {
    getDepartmentResult: false,
    getDepartmentLoading: false,
    getDepartmentError: false,

    postDepartmentResult: false,
    postDepartmentLoading: false,
    postDepartmentError: false,

    deleteDepartmentResult: false,
    deleteDepartmentLoading: false,
    deleteDepartmentError: false,

    updateDepartmentResult: false,
    updateDepartmentLoading: false,
    updateDepartmentError: false,
}
const HrReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPARTMENT:
            return {
                ...state,
                getDepartmentResult: action.payload.data,
                getDepartmentLoading: action.payload.loading,
                getDepartmentError: action.payload.errorMessage,
            }
            case POST_DEPARTMENT:
            return {
                ...state,
                postDepartmentResult: action.payload.data,
                postDepartmentLoading: action.payload.loading,
                postDepartmentError: action.payload.errorMessage,
            }
            case DELETE_DEPARTMENT:
            return {
                ...state,
                deleteDepartmentResult: action.payload.data,
                deleteDepartmentLoading: action.payload.loading,
                deleteDepartmentError: action.payload.errorMessage,
            }
            case UPDATE_DEPARTMENT:
            return {
                ...state,
                updateDepartmentResult: action.payload.data,
                updateDepartmentLoading: action.payload.loading,
                updateDepartmentError: action.payload.errorMessage,
            }
        default:
            return state
    }
}
export default HrReducer