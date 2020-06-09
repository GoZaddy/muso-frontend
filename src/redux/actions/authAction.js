import callAxios from "../../utils/callAxios";
import setAuthToken from "../../utils/setAuthToken";
import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE, ADMIN_AUTH_LOADING, LOGOUT_ADMIN } from "../types/types";



/*
export const loadAdminDetails = function () {
  return async function (dispatch) {
    if (localStorage.getItem("musoAdminAuthToken")) {
      setAuthToken(localStorage.getItem("musoAdminAuthToken"));
    }
    dispatch({
        type: ADMIN_DETAILS_LOADING
    })
    try {
      const response = callAxios("GET", "/api/authenticate"); //endpoint doesn't exist yet
      dispatch({
          type: ADMIN_DETAILS_LOADED,
          payload: response.data.admin
      });
    }
    catch(err){
        dispatch({
            type: AUTH_ERROR,
            payload: err.response

        })

        setTimeout(
            () =>{
                dispatch({
                    type: REDIRECT_TO_LOGIN
                })
            }, 500
        )


    }
  };
};
*/

export const loginAdmin = function(adminDetails){
    
    return async function(dispatch){
        dispatch({
            type: ADMIN_AUTH_LOADING
        })
        try{
            const response = await callAxios("POST", "/authenticate", adminDetails)
            console.log("login success")
            dispatch({
                type: ADMIN_LOGIN_SUCCESS,
                payload: response.data.token,
                alert: {
                    type: "success",
                    message: "Log in successful!"
                }
            })
        }
        catch(err){
            console.log(err.response)
            dispatch({
                type: ADMIN_LOGIN_FAILURE,
                payload: err.response.status,
                alert:{
                    type: "error",
                    message: err.message
                }
            })
        }
        
    }
}

export const logoutAdmin = function(){
    return {
        type: LOGOUT_ADMIN
    }
}
