import callAxios from "../../utils/callAxios";
import {  SUBSCRIBE_MODAL_CLOSED, SUBSCRIBE_MODAL_OPENED, CURRENT_PLAYLIST_LOADING, CURRENT_PLAYLIST_LOAD_ERROR, CURRENT_PLAYLIST_LOADED, CLEAR_ALERT } from "../types/types";

export const loadCurrentPlaylist = function(){
    return async function(dispatch){
        dispatch({
            type: CURRENT_PLAYLIST_LOADING
        })
        try{
            const response = await callAxios("GET", "/playlist")
            dispatch({
                type: CURRENT_PLAYLIST_LOADED,
                payload: response.data
            })
        }
        catch(err){
            dispatch({
                type: CURRENT_PLAYLIST_LOAD_ERROR,
                payload: err.response.status,
                alert: {
                    type: "error",
                    message: err.message
                }
            })
        }  
    }
}


export const openSubscribeModal = function(){
    return {
        type: SUBSCRIBE_MODAL_OPENED
    }
}

export const closeSubscribeModal = function(){
    return {
        type: SUBSCRIBE_MODAL_CLOSED
    }
}

export const clearAlertVisitor  =  function(){
    return {
        type: CLEAR_ALERT
    }
}
