import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  landing: boolean;
  isInit: boolean;
  showVideo: boolean;
}

const initialState: AppState = {
  landing: true,
  isInit: false,
  showVideo: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowLanding: (state, action: PayloadAction<boolean>) => {
      state.landing = action.payload;
    },
    setIsInit: (state, action: PayloadAction<boolean>) => {
      state.isInit = action.payload;
    },
    setShowVideo: (state, action: PayloadAction<boolean>) => {
      state.showVideo = action.payload;
    },
  },
});

export const { setShowLanding, setIsInit, setShowVideo } = appSlice.actions;

export const AppReducer = appSlice.reducer;
