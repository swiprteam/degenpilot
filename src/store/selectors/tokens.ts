import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "..";

import { Token } from "~/model/token";

export const tokensSelector = createSelector(
  (state: IRootState) => state.tokens,
  (tokens) => {
    return tokens.list.map((n) => new Token(n));
  }
);

export const selectedTokenSelector = createSelector(
  (state: IRootState) => state.tokens,
  (tokens) => {
    return Token.byId[tokens.selected];
  }
);
