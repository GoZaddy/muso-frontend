import {
  GET_USERS_FAILURE,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  CREATE_PLAYLIST_FAILURE,
  ADD_MUSIC_FAILURE,
  ADD_MUSIC_SUCCESS,
  CREATE_PLAYLIST_SUCCESS,
  ADD_MUSIC_LOADING,
  CREATE_PLAYLIST_LOADING,
  CLEAR_ALERT
} from "../types/types";

const initialState = {
  usersLoading: false,
  usersLoaded: false,
  users: null,
  alert: null,
  addMusicLoading: true,
  createPlaylistLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_FAILURE:
    case CREATE_PLAYLIST_FAILURE:
    case ADD_MUSIC_FAILURE:
      return {
        ...state,
        alert: action.alert,
      };
    case GET_USERS_LOADING:
      return {
        ...state,
        usersLoading: true,
      };

    case CLEAR_ALERT:
      return {
        ...state,
        alert: null,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        usersLoaded: true,
      };

    case ADD_MUSIC_SUCCESS:
    case CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        alert: action.alert,
      };
    case ADD_MUSIC_LOADING:
      return {
        ...state,
        addMusicLoading: true,
      };
    case CREATE_PLAYLIST_LOADING:
      return {
        ...state,
        createPlaylistLoading: true,
      };
    default:
      return state;
  }
};
