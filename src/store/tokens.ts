import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TokenInterface } from "~/types/interfaces";
import { fetchTokens } from "./api/api";

export interface TokensState {
  loading: {
    tokens: boolean;
  };
  list: TokenInterface[];
  selected: number;
}

const initialState: TokensState = {
  loading: {
    tokens: true,
  },
  list: [],
  selected: null,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenInterface[]>) => {
      state.list = action.payload;
      state.loading.tokens = false;
      if (state.selected === null) state.selected = 0;
    },
    setSelected: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.loading.tokens = true;
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.loading.tokens = false;
        state.list = action.payload;
      });
  },
});

export const { setTokens, setSelected } = tokensSlice.actions;

export const TokensReducer = tokensSlice.reducer;
