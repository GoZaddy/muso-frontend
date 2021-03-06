import callAxios from "../../utils/callAxios";
import setAuthToken from "../../utils/setAuthToken";
import {v4} from "uuid";
import {ALERT_TIMEOUT} from "../../utils/constants";


import {
  CREATE_PLAYLIST_FAILURE,
  CREATE_PLAYLIST_LOADING,
  CREATE_PLAYLIST_SUCCESS,
  ADD_MUSIC_LOADING,
  ADD_MUSIC_SUCCESS,
  ADD_MUSIC_FAILURE,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  CLEAR_ALERT,
  PLAYLISTS_LOADING,
  PLAYLISTS_LOADED,
  PLAYLISTS_LOAD_ERROR,
  DELETE_PLAYLIST_LOADING,
  DELETE_PLAYLIST_FAILURE,
  DELETE_PLAYLIST_SUCCESS
} from "../types/types";


export const createPlaylist = function (playlist) {
  return async function (dispatch) {
    dispatch({
      type: CREATE_PLAYLIST_LOADING,
    });
    if (localStorage.getItem("musoAdminAuthToken")) {
      setAuthToken(localStorage.getItem("musoAdminAuthToken"));
    }
    const id = v4();
    try {
      await callAxios("POST", "/playlists", playlist);
      dispatch({
        type: CREATE_PLAYLIST_SUCCESS,
        alert: {
          id,
          type: "success",
          message: "Playlist created successfully!",
        },
      });
    } catch (err) {
      dispatch({
        type: CREATE_PLAYLIST_FAILURE,
        payload: err.response.status,
        alert: {
          id,
          type: "error",
          message: "Could not create playlist: " + err.response.data,
        },
      });
    }
    finally{
      setTimeout(() => {
          dispatch({
              type: CLEAR_ALERT,
              id: id
          })
      }, ALERT_TIMEOUT)
      
  }
  };
};

export const addMusicToPlaylist = function (id, music) {
  return async function (dispatch) {
    dispatch({
      type: ADD_MUSIC_LOADING,
    });

    if (localStorage.getItem("musoAdminAuthToken")) {
      setAuthToken(localStorage.getItem("musoAdminAuthToken"));
    }
    const alertID = v4();
    try {
      await callAxios("POST", `/playlists/${id}/songs`, music);
      dispatch({
        type: ADD_MUSIC_SUCCESS,
        alert: {
          id: alertID,
          type: "success",
          message: "Song added successfully!",
        },
      });
    } catch (err) {
      console.log(err.response)
      dispatch({
        type: ADD_MUSIC_FAILURE,
        alert: {
          id: alertID,
          type: "error",
          message: "Could not add song: " + err.response.data,
        },
      });
    }
    finally{
      setTimeout(() => {
          dispatch({
              type: CLEAR_ALERT,
              id: alertID
          })
      }, ALERT_TIMEOUT)
      
  }
  };
};

export const getAllUsers = function () {
  return async function (dispatch) {
    dispatch({
      type: GET_USERS_LOADING,
    });

    if (localStorage.getItem("musoAdminAuthToken")) {
      setAuthToken(localStorage.getItem("musoAdminAuthToken"));
    }

    try {
      const response = await callAxios("GET", "/users");

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      const id = v4();
      console.log(err.response);
      dispatch({
        type: GET_USERS_FAILURE,
        alert: {
          id,
          type: "error",
          message: err.message,
        },
      });
      setTimeout(() => {
        dispatch({
            type: CLEAR_ALERT,
            id: id
        })
    }, ALERT_TIMEOUT)
    }
    
  };
};

export const clearAlertAdmin = function () {
  return {
    type: CLEAR_ALERT,
  };
};

export const getAllPlaylists = function(){
  return async function(dispatch){
    dispatch({
      type: PLAYLISTS_LOADING
    })

    if (localStorage.getItem("musoAdminAuthToken")) {
      setAuthToken(localStorage.getItem("musoAdminAuthToken"));
    }

    try {
      const response = await callAxios("GET", "/playlists")
      console.log(response)
      dispatch({
        type: PLAYLISTS_LOADED,
        payload: response.data
      })
    }
    catch(err){
      const id = v4();
      console.log(err.message)
      dispatch({
        type: PLAYLISTS_LOAD_ERROR,
        alert: {
          id,
          type: "error",
          message: err.message
        }
      });
      setTimeout(() => {
        dispatch({
            type: CLEAR_ALERT,
            id: id
        })
    }, ALERT_TIMEOUT)
    }
   
  }
}


export const deletePlaylist = function(id){
  return async function(dispatch){
    dispatch({
      type: DELETE_PLAYLIST_LOADING
    });

    if (localStorage.getItem("musoAdminAuthToken")){
      setAuthToken(localStorage.getItem("musoAdminAuthToken"));
    }

    const alertID = v4();
    try{
      await callAxios("DELETE", `/playlists/${id}`);
      dispatch({
        type: DELETE_PLAYLIST_SUCCESS,
        payload: id,
        alert: {
          id: alertID,
          type:"success",
          message: "Song deleted successfully"
        }
      })
    } catch (err){
      console.log(err.response)
      dispatch({
        type: DELETE_PLAYLIST_FAILURE,
        alert: {
          id: alertID,
          type: "error",
          message: "Could not delete playlist: " + err.response.data,
        },
      });
    }
    finally {
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERT,
          id: alertID
        })
      }, ALERT_TIMEOUT);
      window.location.reload();
    }
  }
}
//View all users
//Delete user
//add a user
