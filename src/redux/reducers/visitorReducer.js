import {
  SUBSCRIBE_MODAL_CLOSED,
  SUBSCRIBE_MODAL_OPENED,
  CLEAR_ALERT,
  RECENT_PLAYLISTS_LOADING,
  RECENT_PLAYLISTS_LOADED,
  RECENT_PLAYLISTS_LOAD_ERROR,
  OLDER_PLAYLISTS_LOADING,
  OLDER_PLAYLISTS_LOAD_ERROR,
  OLDER_PLAYLISTS_LOADED,
} from "../types/types";

const initialState = {
  olderPlaylistsLoading: false,
  olderPlaylistsLoaded: false,
  recentPlaylistsLoading: false,
  recentPlaylistsLoaded: false,
  olderPlaylists: null,
  recentPlaylists: null,
  alert: [],
  isSubscribeButtonClicked: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ALERT:
      return {
        ...state,
        alert: state.alert.filter(alert => alert.id != action.id),
      };
    case RECENT_PLAYLISTS_LOADING:
      return {
        ...state,
        recentPlaylistsLoading: true,
        recentPlaylistsLoaded: false,
      };
    case RECENT_PLAYLISTS_LOADED:
      return {
        ...state,
        recentPlaylists: action.payload,
        recentPlaylistsLoading: false,
        recentPlaylistsLoaded: true,
      };
    case RECENT_PLAYLISTS_LOAD_ERROR:
      return {
        ...state,
        recentPlaylists: null,
        recentPlaylistsLoading: false,
        recentPlaylistsLoaded: false,
        alert: [...state.alert,action.alert],
      };

    case OLDER_PLAYLISTS_LOADING:
      return {
        ...state,
        olderPlaylistsLoading: true,
        olderPlaylistsLoaded: false,
      };
    case OLDER_PLAYLISTS_LOADED:
      return {
        ...state,
        olderPlaylists: action.payload,
        olderPlaylistsLoading: false,
        olderPlaylistsLoaded: true,
      };
    case OLDER_PLAYLISTS_LOAD_ERROR:
      return {
        ...state,
        olderPlaylists: null,
        olderPlaylistsLoading: false,
        olderPlaylistsLoaded: false,
        alert: [...state.alert,action.alert],
      };
    case SUBSCRIBE_MODAL_OPENED:
      return {
        ...state,
        isSubscribeButtonClicked: true,
      };
    case SUBSCRIBE_MODAL_CLOSED:
      return {
        ...state,
        isSubscribeButtonClicked: false,
      };

    default:
      return state;
  }
};
