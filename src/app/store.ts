import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import videoPlayer from "../features/videoPlayer";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    playerState: videoPlayer,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
