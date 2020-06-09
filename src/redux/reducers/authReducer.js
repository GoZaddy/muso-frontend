import {
  LOGOUT_ADMIN,
  REDIRECT_TO_LOGIN,
  ADMIN_LOGIN_FAILURE,
  AUTH_ERROR,
  CLEAR_REDIRECT_TO_LOGIN,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_AUTH_LOADING
} from "../types/types";

const initialState = {
  loginLoading: false,
  adminDetailsLoading: false,
  isAdminAuthenticated: localStorage.getItem("musoAdminAuthToken") ? true : false,
  adminDetails: null,
  redirectToLogin: false,
  alert: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_ADMIN:
      localStorage.removeItem("musoAdminAuthToken");
      setTimeout(() => {
        window.location.reload();
      }, 300);
      return {
        ...state,
        isAdminAuthenticated: false,
        adminDetails: null,
        alert: null,
      };
    
      case ADMIN_AUTH_LOADING: 
        return {
          ...state,
          loginLoading: true
        }
      case ADMIN_LOGIN_SUCCESS:
        localStorage.setItem("musoAdminAuthToken", action.payload)
        return {
          ...state,
          loginLoading: false,
          isAdminAuthenticated: true
        }
    case AUTH_ERROR:
      localStorage.removeItem("musoAdminAuthToken");
      return {
        ...state,
        isAdminAuthenticated: false,
        
        adminDetails: null,
        alert: {
          type: "error",
          message:
            "Admin details could not be retrieved! You will be logged out soon",
        },
      };
    case ADMIN_LOGIN_FAILURE: 
        localStorage.removeItem("musoAdminAuthToken");
        return {
            ...state,
            loginLoading: false,
            alert: action.alert
        }
    /*case ADMIN_DETAILS_LOADING:
      return {
        ...state,
        adminDetailsLoading: true,
      };
    case ADMIN_DETAILS_LOADED:
      return {
        ...state,
        adminDetailsLoading: false,
        adminDetails: action.payload,
      };*/

    case REDIRECT_TO_LOGIN:
      return {
        ...state,
        redirectToLogin: true,
      };
    case CLEAR_REDIRECT_TO_LOGIN:
      return {
        ...state,
        redirectToLogin: false,
      };

    default:
      return state;
  }
};
