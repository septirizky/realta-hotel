import {
    DELETE_DEPARTMENT,
    DELETE_EMPLOYEE, DELETE_WORK_ORDER, DELETE_WORK_ORDER_DETAIL,
    GET_DEPARTMENT,
    GET_EMPLOYEE, GET_FACILITIES,
    GET_JOB_ROLE, GET_SERVICE_TASK,
    GET_SHIFT, GET_WORK_ORDER, GET_WORK_ORDER_DETAIL,
    POST_DEPARTMENT, POST_EMPLOYEE, POST_WORK_ORDER, POST_WORK_ORDER_DETAIL, PUT_WORK_ORDER, PUT_WORK_ORDER_DETAIL,
    UPDATE_DEPARTMENT, UPDATE_EMPLOYEE
} from "../actions/hrAction";

const initialState = {
    /*
     * Department
    */
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

    /*
     * Employee
    */
    getEmployeeResult: false,
    getEmployeeLoading: false,
    getEmployeeError: false,

    postEmployeeResult: false,
    postEmployeeLoading: false,
    postEmployeeError: false,

    deleteEmployeeResult: false,
    deleteEmployeeLoading: false,
    deleteEmployeeError: false,

    updateEmployeeResult: false,
    updateEmployeeLoading: false,
    updateEmployeeError: false,

    /*
     * Job Role
    */
    getJobRoleResult: false,
    getJobRoleLoading: false,
    getJobRoleError: false,

    /*
     * Job Role
    */
    getShiftResult: false,
    getShiftLoading: false,
    getShiftError: false,

    /*
     * Service Task
    */
    getServiceTaskResult: false,
    getServiceTaskLoading: false,
    getServiceTaskError: false,

    /*
     * Facilities
    */
    getFacilitiesResult: false,
    getFacilitiesLoading: false,
    getFacilitiesError: false,

    /*
     * Work Order Detail
    */
    getWorkOrderDetailResult: false,
    getWorkOrderDetailLoading: false,
    getWorkOrderDetailError: false,

    postWorkOrderDetailResult: false,
    postWorkOrderDetailLoading: false,
    postWorkOrderDetailError: false,

    putWorkOrderDetailResult: false,
    putWorkOrderDetailLoading: false,
    putWorkOrderDetailError: false,

    deleteWorkOrderDetailResult: false,
    deleteWorkOrderDetailLoading: false,
    deleteWorkOrderDetailError: false,

    /*
     * Work Order
    */
    getWorkOrderResult: false,
    getWorkOrderLoading: false,
    getWorkOrderError: false,

    postWorkOrderResult: false,
    postWorkOrderLoading: false,
    postWorkOrderError: false,

    putWorkOrderResult: false,
    putWorkOrderLoading: false,
    putWorkOrderError: false,

    deleteWorkOrderResult: false,
    deleteWorkOrderLoading: false,
    deleteWorkOrderError: false,
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
        case GET_EMPLOYEE:
            return {
                ...state,
                getEmployeeResult: action.payload.data,
                getEmployeeLoading: action.payload.loading,
                getEmployeeError: action.payload.errorMessage,
            }
        case POST_EMPLOYEE:
            return {
                ...state,
                postEmployeeResult: action.payload.data,
                postEmployeeLoading: action.payload.loading,
                postEmployeeError: action.payload.errorMessage,
            }
        case DELETE_EMPLOYEE:
            return {
                ...state,
                deleteEmployeeResult: action.payload.data,
                deleteEmployeeLoading: action.payload.loading,
                deleteEmployeeError: action.payload.errorMessage,
            }
        case UPDATE_EMPLOYEE:
            return {
                ...state,
                updateEmployeeResult: action.payload.data,
                updateEmployeeLoading: action.payload.loading,
                updateEmployeeError: action.payload.errorMessage,
            }
        case GET_JOB_ROLE:
            return {
                ...state,
                getJobRoleResult: action.payload.data,
                getJobRoleLoading: action.payload.loading,
                getJobRoleError: action.payload.errorMessage,
            }
        case GET_SHIFT:
            return {
                ...state,
                getShiftResult: action.payload.data,
                getShiftLoading: action.payload.loading,
                getShiftError: action.payload.errorMessage,
            }
        case GET_WORK_ORDER:
            return {
                ...state,
                getWorkOrderResult: action.payload.data,
                getWorkOrderLoading: action.payload.loading,
                getWorkOrderError: action.payload.errorMessage,
            }
        case POST_WORK_ORDER:
            return {
                ...state,
                postWorkOrderResult: action.payload.data,
                postWorkOrderLoading: action.payload.loading,
                postWorkOrderError: action.payload.errorMessage,
            }
        case PUT_WORK_ORDER:
            return {
                ...state,
                putWorkOrderResult: action.payload.data,
                putWorkOrderLoading: action.payload.loading,
                putWorkOrderError: action.payload.errorMessage,
            }
        case DELETE_WORK_ORDER:
            return {
                ...state,
                deleteWorkOrderResult: action.payload.data,
                deleteWorkOrderLoading: action.payload.loading,
                deleteWorkOrderError: action.payload.errorMessage,
            }
        case GET_SERVICE_TASK:
            return {
                ...state,
                getServiceTaskResult: action.payload.data,
                getServiceTaskLoading: action.payload.loading,
                getServiceTaskError: action.payload.errorMessage,
            }
        case GET_WORK_ORDER_DETAIL:
            return {
                ...state,
                getWorkOrderDetailResult: action.payload.data,
                getWorkOrderDetailLoading: action.payload.loading,
                getWorkOrderDetailError: action.payload.errorMessage,
            }
        case POST_WORK_ORDER_DETAIL:
            return {
                ...state,
                postWorkOrderDetailResult: action.payload.data,
                postWorkOrderDetailLoading: action.payload.loading,
                postWorkOrderDetailError: action.payload.errorMessage,
            }
        case PUT_WORK_ORDER_DETAIL:
            return {
                ...state,
                putWorkOrderDetailResult: action.payload.data,
                putWorkOrderDetailLoading: action.payload.loading,
                putWorkOrderDetailError: action.payload.errorMessage,
            }
            case DELETE_WORK_ORDER_DETAIL:
            return {
                ...state,
                deleteWorkOrderDetailResult: action.payload.data,
                deleteWorkOrderDetailLoading: action.payload.loading,
                deleteWorkOrderDetailError: action.payload.errorMessage,
            }
        case GET_FACILITIES:
            return {
                ...state,
                getFacilitiesResult: action.payload.data,
                getFacilitiesLoading: action.payload.loading,
                getFacilitiesError: action.payload.errorMessage,
            }
        default:
            return state
    }
}
export default HrReducer