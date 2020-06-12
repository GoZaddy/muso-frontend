import callAxios from "../../utils/callAxios";
import setAuthToken from "../../utils/setAuthToken";

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
  PLAYLISTS_LOAD_ERROR
} from "../types/types";
import axios from "axios";
import { baseURL, token, axiosTokenConfig } from "../../utils/constants";

export const createPlaylist = function (playlist) {
  return async function (dispatch) {
    dispatch({
      type: CREATE_PLAYLIST_LOADING,
    });
    if (localStorage.getItem("musoAdminAuthToken")) {
      setAuthToken(localStorage.getItem("musoAdminAuthToken"));
    }
    try {
      const response = await callAxios("POST", "/playlists", playlist);
      dispatch({
        type: CREATE_PLAYLIST_SUCCESS,
        alert: {
          type: "success",
          message: "Playlist created successfully!",
        },
      });
    } catch (err) {
      dispatch({
        type: CREATE_PLAYLIST_FAILURE,
        payload: err.response.status,
        alert: {
          type: "error",
          message: "Could not create playlist",
        },
      });
    }
  };
};

export const addMusicToPlaylist = function (music) {
  return async function (dispatch) {
    dispatch({
      type: ADD_MUSIC_LOADING,
    });

    if (localStorage.getItem("musoAdminAuthToken")) {
      setAuthToken(localStorage.getItem("musoAdminAuthToken"));
    }

    try {
      const response = await callAxios("POST", "/playlist/music", music);
      dispatch({
        type: ADD_MUSIC_SUCCESS,
        alert: {
          type: "success",
          message: "Song added successfully!",
        },
      });
    } catch (err) {
      dispatch({
        type: ADD_MUSIC_FAILURE,
        payload: err.response.status,
        alert: {
          type: "error",
          message: "Could not add song",
        },
      });
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
      console.log(err.response);
      dispatch({
        type: GET_USERS_FAILURE,
        alert: {
          type: "error",
          message: err.message,
        },
      });
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
      dispatch({
        type: PLAYLISTS_LOAD_ERROR,
        alert: {
          type: "error",
          message: err.response.data
        }
      })
    }

  }
}
//View all users
//Delete user
//add a user
