import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IVideoResult } from "../models";

interface PlayerState {
  isOpened: boolean;
  videoData: IVideoResult;
}

const initialState: PlayerState = {
  isOpened: false,
  videoData: {
    id: "",
    key: "",
    name: "",
    site: "",
    type: "",
  },
};

export const videoPlayer = createSlice({
  name: "playerState",
  initialState,
  reducers: {
    openPlayer: (state) => {
      state.isOpened = true;
    },
    closePlayer: (state) => {
      state.isOpened = false;
    },
    setVideoData: (state, action: PayloadAction<IVideoResult>) => {
      return { ...state, videoData: action.payload };
    },
  },
});

export const { openPlayer, closePlayer, setVideoData } = videoPlayer.actions;

export const selectPlayerState = (state: RootState) =>
  state.playerState.isOpened;
export const selectVideoData = (state: RootState) =>
  state.playerState.videoData;

export default videoPlayer.reducer;
