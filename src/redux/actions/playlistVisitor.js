import callAxios from "../../utils/callAxios";
import setAuthToken from "../../utils/setAuthToken";
import { PLAYLISTS_LOADED, PLAYLIST_LOADING, PLAYLIST_LOAD_ERROR, SUBSCRIBE_MODAL_CLOSE, SUBSCRIBE_MODAL_OPENED } from "../types/types";

export const loadCurrentPlaylist = function(){
    return function(dispatch){
        dispatch({
            type: PLAYLIST_LOADING
        })
        try{
            const response = await callAxios("GET", "/playlist")
            dispatch({
                type: PLAYLISTS_LOADED,
                payload: response.data
            })
        }
        catch(err){
            dispatch({
                type: PLAYLIST_LOAD_ERROR,
                payload: err.response.status,
                alert: {
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
        type: SUBSCRIBE_MODAL_CLOSE
    }
}
