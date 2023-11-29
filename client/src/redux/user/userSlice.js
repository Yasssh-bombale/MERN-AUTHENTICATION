import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: false,
  errorMsg: null,
  loading: false,
};

const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
      state.errorMsg = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
      state.errorMsg = null;
    },
    signInFailure: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
      state.currentUser = null;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSclice.actions;
export default userSclice.reducer;
