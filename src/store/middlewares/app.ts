import { Middleware } from "@reduxjs/toolkit";
import { setShowVideo } from "../app";

const buyMiddleware: Middleware = (store) => (next) => (action: any) => {
  next(action);
  if (action.type === "tokens/swapRight") {
    store.dispatch(setShowVideo(true));
  }
};
export default [buyMiddleware] as Middleware[];
