import callAxios from "../../utils/callAxios";
import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE, ADMIN_AUTH_LOADING, LOGOUT_ADMIN, CLEAR_ALERT } from "../types/types";
import setAuthToken from "../../utils/setAuthToken";
import {v4} from "uuid";
import {ALERT_TIMEOUT} from "../../utils/constants";




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
        const id = v4()
        try{
            const response = await callAxios("POST", "/authenticate", adminDetails)
            console.log("login success")
            
            dispatch({
                type: ADMIN_LOGIN_SUCCESS,
                payload: response.data.token,
                alert: {
                    id: id,                    
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
                    id: id,                    
                    type: "error",
                    message: err.response.data
                }
            })
        }
        finally{
            setTimeout(() => {
                dispatch({
                    type: CLEAR_ALERT,
                    id: id
                })
            }, ALERT_TIMEOUT)
            
        }
        
    }
}

export const logoutAdmin = function(){
    return {
        type: LOGOUT_ADMIN
    }
}
