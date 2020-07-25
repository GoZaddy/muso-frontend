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
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_LOADING,
  DELETE_PLAYLIST_FAILURE,
} from "../types/types";
import uuid from "uuid";

const initialState = {
  usersLoading: false,
  usersLoaded: false,
  users: null,
  playlists: null,
  playlistsLoading: false,
  playlistsLoaded: false,
  alert: [],
  addMusicLoading: false,
  createPlaylistLoading: false,
  deletePlaylistLoading: {
    isLoading: false,
    id: null
  }
 
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_FAILURE:
      return {
        ...state,
        usersLoading: false,
        alert: [...state.alert,action.alert],
      };
    case CREATE_PLAYLIST_FAILURE:
    case ADD_MUSIC_FAILURE:
    
      console.log(action)
      return {
        ...state,
        alert: [...state.alert,action.alert],
      };
    case GET_USERS_LOADING:
      return {
        ...state,
        usersLoading: true,
      };

    case CLEAR_ALERT:
      return {
        ...state,
        alert: state.alert.filter(alert => alert.id != action.id),
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        usersLoading: false,
        usersLoaded: true,
      };
    
    case DELETE_PLAYLIST_FAILURE:
    case DELETE_PLAYLIST_SUCCESS:
      
      return {
        ...state,
        deletePlaylistLoading: {
          isLoading: false,
          id: null
        },
        alert: [...state.alert,action.alert]
      }
      

    case ADD_MUSIC_SUCCESS:
    case CREATE_PLAYLIST_SUCCESS:
    
      console.log(action)
      return {
        ...state,
        alert: [...state.alert,action.alert], //error here
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
    case DELETE_PLAYLIST_LOADING:
      return {
        ...state,
        deletePlaylistLoading: {
          isLoading: true,
          id: action.payload
        }
      }
    
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
