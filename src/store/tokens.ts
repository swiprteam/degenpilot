import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TokenInterface } from "~/types/interfaces";
import { fetchTokens } from "./api/api";

export type TokenHistory = {
  left: string[];
  right: string[];
};
export interface TokensState {
  loading: {
    tokens: boolean;
  };
  list: TokenInterface[];
  history: TokenHistory;
}

const initialState: TokensState = {
  loading: {
    tokens: true,
  },
  list: [],
  history: {
    left: [],
    right: [],
  },
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    initHistory: (state, action: PayloadAction<TokenHistory>) => {
      if (action.payload.left.length === 0 && action.payload.right.length === 0)
        return;
      state.history = action.payload;
    },
    setTokens: (state, action: PayloadAction<TokenInterface[]>) => {
      state.list = action.payload;
      state.loading.tokens = false;
    },
    swapRight: (state, action: PayloadAction<TokenInterface>) => {
      state.history.right.push(action.payload.id);
    },
    swapLeft: (state, action: PayloadAction<TokenInterface>) => {
      state.history.left.push(action.payload.id);
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

export const { setTokens, swapLeft, swapRight, initHistory } =
  tokensSlice.actions;

export const TokensReducer = tokensSlice.reducer;
