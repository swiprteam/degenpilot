import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { setItem } from "~/services/persist";
export const CACHE_VERSION = 2;
const persistAPIDataMiddleware: Middleware = () => (next) => (action: any) => {
  next(action);
  const regex = new RegExp(/^api\/(.*)\/fulfilled$/);
  if (regex.test(action.type)) {
    const match = action.type.match(regex);
    if (match)
      setItem(`${match[1]}_${CACHE_VERSION}`, JSON.stringify(action.payload));
  }
};

const persistSelected: Middleware =
  () => (next) => (action: PayloadAction<string>) => {
    next(action);
    if (action.type === "tokens/select") {
      setItem("selected_token", action.payload);
    }
  };

const persistTokenHistoryMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    next(action);
    if (
      action.type === "tokens/swapRight" ||
      action.type === "tokens/swapLeft"
    ) {
      setItem("history", JSON.stringify(store.getState().tokens.history));
    }
  };

export default [
  persistAPIDataMiddleware,
  persistTokenHistoryMiddleware,
  persistSelected,
] as Middleware[];
