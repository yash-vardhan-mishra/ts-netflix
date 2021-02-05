import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type UserData = {
  uid: string;
  email: string;
};

interface UserState {
  user: UserData;
}

const initialState: UserState = {
  user: {} as UserData,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {} as UserData;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
