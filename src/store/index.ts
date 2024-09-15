import { PayloadAction, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  convertClassToObjectMiddleware,
  promiseAwaitingMiddleware,
} from "./middlewares";

import localforage from "localforage";
import { Web3Reducer } from "./web3";
import { initStore } from "./api/api";

//import reduxApis, { endpoints } from "./api/api";
export type IRootState = {
  web3: ReturnType<typeof Web3Reducer>;
};

localforage.config({
  driver: localforage.INDEXEDDB, // Utiliser IndexedDB
  name: "redux-store",
  storeName: "reduxStore", // Nom du store IndexedDB
});

export const store = configureStore({
  reducer: {
    web3: Web3Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(convertClassToObjectMiddleware, promiseAwaitingMiddleware),
});
setupListeners(store.dispatch);
initStore(store);

export const dispatch = (action: PayloadAction) => store.dispatch(action);

export const getStoreState = () => {
  return store.getState();
};
