import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "..";

export const isInitSelector = createSelector(
  (state: IRootState) => state.app,
  (app) => {
    return app.isInit;
  }
);

export const showVideoSelector = createSelector(
  (state: IRootState) => state.app,
  (app) => {
    return app.showVideo;
  }
);

export const showBuySelector = createSelector(
  (state: IRootState) => state.app,
  (app) => {
    return app.showBuy;
  }
);

export const isFlippedSelector = createSelector(
  (state: IRootState) => state.app,
  (app) => {
    return app.isFlipped;
  }
);
