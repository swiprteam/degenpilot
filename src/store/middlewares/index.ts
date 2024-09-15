import { Middleware } from "@reduxjs/toolkit";
import { Serializable } from "../../model/serializable";

export const promiseAwaitingMiddleware: Middleware =
  () => (next) => (action: any) => {
    if (action.payload instanceof Promise) {
      action.payload.then((res: any) => {
        action.payload = res;
        next(action);
      });
    } else if (action.payload?.promise instanceof Promise) {
      action.payload.promise
        .then(() => {
          delete action.payload.promise;
          next(action);
        })
        .catch((e: any) => console.error(e));
    } else {
      next(action);
    }
  };

export const convertClassToObjectMiddleware: Middleware =
  () => (next) => (action: any) => {
    if (action.payload?.map) {
      if (action.payload[0] instanceof Serializable) {
        action.payload = action.payload.map((e: Serializable) => e.toObject());
      }
    } else if ((action.payload as any) instanceof Serializable) {
      action.payload = action.payload.toObject();
    }
    next(action);
  };
