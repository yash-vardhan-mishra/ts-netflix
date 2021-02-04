import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import videoPlayer from "../features/videoPlayer";
import counterSlice from "../features/counterSlice";

export const store = configureStore({
  reducer: {
    playerState: videoPlayer,
    counter: counterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
