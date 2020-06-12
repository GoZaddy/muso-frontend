import {
 
  SUBSCRIBE_MODAL_CLOSED,
  SUBSCRIBE_MODAL_OPENED,
  CLEAR_ALERT,
  CURRENT_PLAYLIST_LOADING,
  CURRENT_PLAYLIST_LOADED,
  CURRENT_PLAYLIST_LOAD_ERROR,
} from "../types/types";

const initialState = {
  isPlayistLoading: false,
  isPlaylistLoaded: false,
  currentPlaylist: null,
  alert: null,
  isSubscribeButtonClicked: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PLAYLIST_LOADING:
      return {
        ...state,
        isPlayistLoading: true,
      };

      case CLEAR_ALERT:
        return {
          ...state,
          alert: null
        }
    case CURRENT_PLAYLIST_LOADED:
      return {
        ...state,
        playlist: action.payload,
        isPlaylistLoaded: true,
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
    case CURRENT_PLAYLIST_LOAD_ERROR:
      return {
        ...state,
        playlist: null,
        isPlayistLoading: false,
        isPlaylistLoaded: false,
        alert: action.alert
      }
    default:
      return state;
  }
};
