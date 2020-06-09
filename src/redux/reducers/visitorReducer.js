import {
  PLAYLIST_LOADING,
  PLAYLISTS_LOADED,
  SUBSCRIBE_MODAL_CLOSED,
  SUBSCRIBE_MODAL_OPENED,
} from "../types/types";

const initialState = {
  isPlayistsLoading: false,
  isPlaylistsLoaded: false,
  isSubscribeButtonClicked: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYLIST_LOADING:
      return {
        ...state,
        isPlayistsLoading: true,
      };

    case PLAYLISTS_LOADED:
      return {
        ...state,
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
    default:
      return state;
  }
};
