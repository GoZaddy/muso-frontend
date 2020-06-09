import {
  PLAYLIST_LOADING,
  PLAYLISTS_LOADED,
  SUBSCRIBE_MODAL_CLOSED,
  SUBSCRIBE_MODAL_OPENED,
  CLEAR_ALERT,
  PLAYLIST_LOAD_ERROR
} from "../types/types";

const initialState = {
  isPlayistsLoading: false,
  isPlaylistsLoaded: false,
  playlists: null,
  alert: null,
  isSubscribeButtonClicked: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYLIST_LOADING:
      return {
        ...state,
        isPlayistsLoading: true,
      };

      case CLEAR_ALERT:
        return {
          ...state,
          alert: null
        }
    case PLAYLISTS_LOADED:
      return {
        ...state,
        playlists: action.payload,
        isPlaylistsLoaded: true,
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
    case PLAYLIST_LOAD_ERROR:
      return {
        ...state,
        playlists: null,
        alert: action.alert
      }
    default:
      return state;
  }
};
