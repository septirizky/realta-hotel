import { GET_MENU,
  ADD_MENU,
  UPDATE_MENU,
  DELETE_MENU

} from "../actions/restoaction";

const initialState = {
  getMenuResult: false,
  getMenuLoading: false,
  getMenuError: false,


  addMenuResult: false,
  addMenuLoading: false,
  addMenuError: false,

  updateMenuResult: false,
  updateMenuLoading: false,
  updateMenuError: false,

  deleteMenuResult: false,
  deleteMenuLoading: false,
  deleteMenuError: false,
};

const restoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        getMenuResult: action.payload.data,
        getMenuLoading: action.payload.loading,
        getMenuError: action.payload.errorMessage,
      };


    case ADD_MENU:
      return {
        ...state,
        addMenuResult: action.payload.data,
        addMenuLoading: action.payload.loading,
        addMenuError: action.payload.errorMessage,
      };

    case UPDATE_MENU:
      return {
        ...state,
        updateMenuResult: action.payload.data,
        updateMenuLoading: action.payload.loading,
        updateMenuError: action.payload.errorMessage,
      };

    case DELETE_MENU:
      return {
        ...state,
        deleteMenuResult: action.payload.data,
        deleteMenuLoading: action.payload.loading,
        deleteMenuError: action.payload.errorMessage,
      };
default:
      return state;
  }
};

export default restoReducer;

