import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "..";

export const landingSelector = createSelector(
  (state: IRootState) => state.app,
  (app) => {
    return app.landing;
  }
);
export const isInitSelector = createSelector(
  (state: IRootState) => state.app,
  (app) => {
    return app.isInit;
  }
);
