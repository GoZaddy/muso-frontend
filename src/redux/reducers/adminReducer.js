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
  CLEAR_ALERT,
  PLAYLISTS_LOAD_ERROR,
  PLAYLISTS_LOADED,
  PLAYLISTS_LOADING,
} from "../types/types";

const initialState = {
  usersLoading: false,
  usersLoaded: false,
  users: null,
  playlists: null,
  playlistsLoading: false,
  playlistsLoaded: false,
  alert: null,
  addMusicLoading: true,
  createPlaylistLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_FAILURE:
      return {
        ...state,
        usersLoading: false,
        alert: action.alert,
      };
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
        usersLoading: false,
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
    case PLAYLISTS_LOADING:
      return {
        ...state,
        playlists: null,
        playlistsLoading: true,
        playlistsLoaded: false,
      };
    case PLAYLISTS_LOADED:
      return {
        ...state,
        playlists: action.payload,
        playlistsLoaded: true,
        playlistsLoading: false,
      };
    case PLAYLISTS_LOAD_ERROR:
      return {
        ...state,
        playlists: null,
        playlistsLoaded: false,
        playlistsLoading: false,
        alert: action.alert,
      };

    default:
      return state;
  }
};
