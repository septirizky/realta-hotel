import {
    REGISTER_USER,
    LOGIN_USER,
    SIGNUP_GUEST,
    SIGNIN_GUEST,
    GET_USERS,
    DELETE_USER,
    UPDATE_USER,
    INSERT_PROFILE,
    CHANGE_PASSWORD
} from "../actions/usersAction";

const initialState = {
    registerUserResult: false,
    registerUserLoading: false,
    registerUserError: false,
  
    loginUserResult: false,
    loginUserLoading: false,
    loginUserError: false,
  
    signupGuestResult: false,
    signupGuestLoading: false,
    signupGuestError: false,
  
    signinGuestResult: false,
    signinGuestLoading: false,
    signinGuestError: false,
  
    getUsersResult: false,
    getUsersLoading: false,
    getUsersError: false,
  
    deleteUsersResult: false,
    deleteUsersLoading: false,
    deleteUsersError: false,
  
    updateUsersResult: false,
    updateUsersLoading: false,
    updateUsersError: false,
  
    insertProfileResult: false,
    insertProfileLoading: false,
    insertProfileError: false,
  
    changePasswordResult: false,
    changePasswordLoading: false,
    changePasswordError: false,
};

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                registerUserLoading: action.payload.loading,
                registerUserResult: action.payload.data,
                registerUserError: action.payload.errorMessage
            };
        case LOGIN_USER:
            return {
                ...state,
                loginUserLoading: action.payload.loading,
                loginUserResult: action.payload.data,
                loginUserError: action.payload.errorMessage
            };
        case SIGNUP_GUEST:
            return {
                ...state,
                signupGuestLoading: action.payload.loading,
                signupGuestResult: action.payload.data,
                signupGuestError: action.payload.errorMessage
            };
        case SIGNIN_GUEST:
            return {
                ...state,
                loginGuestLoading: action.payload.loading,
                loginGuestResult: action.payload.data,
                loginGuestError: action.payload.errorMessage
            };
        case GET_USERS:
            return {
                ...state,
                getUsersLoading: action.payload.loading,
                getUsersResult: action.payload.data,
                getUsersError: action.payload.errorMessage
            };
        case DELETE_USER:
            return {
                ...state,
                deleteUsersLoading: action.payload.loading,
                deleteUsersResult: action.payload.data,
                deleteUsersError: action.payload.errorMessage
            };
        case UPDATE_USER:
            return {
                ...state,
                updateUsersLoading: action.payload.loading,
                updateUsersResult: action.payload.data,
                updateUsersError: action.payload.errorMessage
            };
        case INSERT_PROFILE:
            return {
                ...state,
                insertProfileLoading: action.payload.loading,
                insertProfileResult: action.payload.data,
                insertProfileError: action.payload.errorMessage
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                changePasswordLoading: action.payload.loading,
                changePasswordResult: action.payload.data,
                changePasswordError: action.payload.errorMessage
            };
        default:
            return state;
    }
};

export default UsersReducer;
