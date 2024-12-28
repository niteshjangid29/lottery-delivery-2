// locationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  city: string ;
  state: string ;
  country: string ;
}

const initialState: LocationState = {
  city: "",
  state: "",
  country: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.country = action.payload.country;
    },
    clearLocation: (state) => {
      state.city = "";
      state.state = "";
      state.country = "";
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
