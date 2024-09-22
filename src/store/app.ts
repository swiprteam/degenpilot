import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  landing: boolean;
}

const initialState: AppState = {
  landing: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowLanding: (state, action: PayloadAction<boolean>) => {
      state.landing = action.payload;
    },
  },
});

export const { setShowLanding } = appSlice.actions;

export const AppReducer = appSlice.reducer;
