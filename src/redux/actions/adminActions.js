import callAxios from "../../utils/callAxios";
import setAuthToken from "../../utils/setAuthToken";
import { CREATE_PLAYLIST_FAILURE, CREATE_PLAYLIST_LOADING, CREATE_PLAYLIST_SUCCESS, ADD_MUSIC_LOADING, ADD_MUSIC_SUCCESS, ADD_MUSIC_FAILURE, GET_USERS_LOADING, GET_USERS_SUCCESS, GET_USERS_FAILURE} from "../types/types";

export const createPlaylist = function(playlist){
    return function(dispatch){
        dispatch({
            type: CREATE_PLAYLIST_LOADING
        })
        if (localStorage.getItem("musoAdminAuthToken")) {
            setAuthToken(localStorage.getItem("musoAdminAuthToken"));
          }
        try{
            const response = callAxios("POST", "/playlists", playlist)
            dispatch({
                type: CREATE_PLAYLIST_SUCCESS,
                alert: {
                    message: "Playlist created successfully!"
                }
            })
        }
        catch(err){
            dispatch({
                type: CREATE_PLAYLIST_FAILURE,
                payload: err.response.status,
                alert: {
                    message: "Could not create playlist"
                }
            })
        }
        

    }
}

export const addMusicToPlaylist = function(music){
    return function(dispatch){
        dispatch({
            type: ADD_MUSIC_LOADING
        })

        if (localStorage.getItem("musoAdminAuthToken")) {
            setAuthToken(localStorage.getItem("musoAdminAuthToken"));
        }
        
        try{
            const response = await callAxios("POST", "/playlist/music", music)
            dispatch({
                type: ADD_MUSIC_SUCCESS,
                alert:{
                    message: "Song added successfully!"
                }
            })
        }
        catch(err){
            dispatch({
                type: ADD_MUSIC_FAILURE,
                payload: err.response.status,
                alert: {
                    message: "Could not add song"
                }
            })
        }
    }
}

export const getAllUsers = function(){
    return function(dispatch){
        dispatch({
            type: GET_USERS_LOADING
        })
        if (localStorage.getItem("musoAdminAuthToken")) {
            setAuthToken(localStorage.getItem("musoAdminAuthToken"));
        }

        try{
            const response = await callAxios("GET","/users")
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: response.data
            })
        }
        catch(err){
            dispatch({
                type: GET_USERS_FAILURE,
                alert: err.message
            })
        }
        
    }
}

//View all users
//Delete user
//add a user 