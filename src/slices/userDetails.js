import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
};

const userDetails = createSlice({
  name: "userDetailsReducer",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state, action) => {
      state.userDetails = {};
    },
  },
});

export const { setUserDetails, clearUserDetails } = userDetails.actions;

export default userDetails.reducer;
