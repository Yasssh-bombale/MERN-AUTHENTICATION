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
    updateUserStart: (state) => {
      state.loading = true;
      state.error = false;
      state.errorMsg = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.errorMsg = null;
      state.error = false;
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.errorMsg = action.payload;
      state.error = true;
      state.currentUser = null;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.errorMsg = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = true;
      state.errorMsg = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSclice.actions;
export default userSclice.reducer;
