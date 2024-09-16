import { createSelector } from "@reduxjs/toolkit";
import { Chain } from "~/model/chain";
import { IRootState } from "..";

export const chainsIsLoadingSelector = createSelector(
  (state: IRootState) => state.web3,
  (web3) => web3.loading.chains
);

export const chainsSelector = createSelector(
  (state: IRootState) => state.web3,
  (web3) => {
    return web3.chains.map((n) => new Chain(n));
  }
);
