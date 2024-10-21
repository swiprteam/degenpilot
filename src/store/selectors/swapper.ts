import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "..";

export const estimationIsEnabledSelector = createSelector(
  (state: IRootState) => state.swapper,
  (state) => {
    const interaction = state.interaction;
    const action = state[interaction];
  
    return !!(
      state.is.init &&
      action.value > 0 &&
      !!action.to &&
      !state.is.estimationLocked &&
      !state.is.onWrite
    );
  }
);



export const canSwapSelector = createSelector(
  (state: IRootState) => state.swapper,
  (state) => {
    const interaction = state.interaction;
    const quote = state[interaction].transaction;

    return !!(quote && !state.is.locked);
  }
);


export const swapTransactionSelector = createSelector(
  (state: IRootState) => state.swapper,
  (state) => state[state.interaction].transaction
);
