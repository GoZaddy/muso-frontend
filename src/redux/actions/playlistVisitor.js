import callAxios from "../../utils/callAxios";
import {
  SUBSCRIBE_MODAL_CLOSED,
  SUBSCRIBE_MODAL_OPENED,
  RECENT_PLAYLISTS_LOADING,
  RECENT_PLAYLISTS_LOAD_ERROR,
  RECENT_PLAYLISTS_LOADED,
  CLEAR_ALERT,
  OLDER_PLAYLISTS_LOADING,
  OLDER_PLAYLISTS_LOAD_ERROR,
  OLDER_PLAYLISTS_LOADED,
} from "../types/types";

export const loadRecentPlaylists = function () {
  return async function (dispatch) {
    dispatch({
      type: RECENT_PLAYLISTS_LOADING,
    });
    try {
      const response = await callAxios("GET", "/playlists/get-recent");
      dispatch({
        type: RECENT_PLAYLISTS_LOADED,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: RECENT_PLAYLISTS_LOAD_ERROR,
        payload: err.response.status,
        alert: {
          type: "error",
          message: err.message,
        },
      });
    }
  };
};

export const loadOlderPlaylists = function () {
  return async function (dispatch) {
    dispatch({
      type: OLDER_PLAYLISTS_LOADING,
    });
    try {
      const response = await callAxios("GET", "/playlist/get-older");
      dispatch({
        type: OLDER_PLAYLISTS_LOADED,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: OLDER_PLAYLISTS_LOAD_ERROR,
        payload: err.response.status,
        alert: {
          type: "error",
          message: err.message,
        },
      });
    }
  };
};

export const openSubscribeModal = function () {
  return {
    type: SUBSCRIBE_MODAL_OPENED,
  };
};

export const closeSubscribeModal = function () {
  return {
    type: SUBSCRIBE_MODAL_CLOSED,
  };
};

export const clearAlertVisitor = function () {
  return {
    type: CLEAR_ALERT,
  };
};
