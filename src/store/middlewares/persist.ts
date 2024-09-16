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

export default [persistAPIDataMiddleware] as Middleware[];
