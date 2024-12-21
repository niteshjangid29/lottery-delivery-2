import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currTab: "Home", // Initial state for the selected tab
};

const currTabSlice = createSlice({
  name: "currTab",
  initialState,
  reducers: {
    setCurrTab(state, action) {
      state.currTab = action.payload; // Update the currTab state with the payload
    },
  },
});

export const { setCurrTab } = currTabSlice.actions; // Export the action creator
export default currTabSlice.reducer; // Export the reducer
