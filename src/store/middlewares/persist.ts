import { Middleware } from "@reduxjs/toolkit";
import localforage from "localforage";

const persistAPIDataMiddleware: Middleware = () => (next) => (action: any) => {
  next(action);
  const regex = new RegExp(/^api\/(.*)\/fulfilled$/);
  if (regex.test(action.type)) {
    const match = action.type.match(regex);
    if (match) localforage.setItem(match[1], JSON.stringify(action.payload));
  }
};

const persistTokenHistoryMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    next(action);
    if (
      action.type === "tokens/swapRight" ||
      action.type === "tokens/swapLeft"
    ) {
      localforage.setItem(
        "history",
        JSON.stringify(store.getState().tokens.history)
      );
    }
  };

const persistShowLandingMiddleware: Middleware =
  () => (next) => (action: any) => {
    next(action);
    if (action.type === "app/setShowLanding") {
      localforage.setItem("landing", action.payload);
    }
  };

export default [
  persistAPIDataMiddleware,
  persistTokenHistoryMiddleware,
  persistShowLandingMiddleware,
] as Middleware[];
