import { PayloadAction, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  convertClassToObjectMiddleware,
  promiseAwaitingMiddleware,
} from "./middlewares";
import persistMiddleware from "./middlewares/persist";
import appMiddleware from "./middlewares/app";
import tokensMiddleware from "./middlewares/tokens";
import swapperMiddleware from './middlewares/swapper';
import localforage from "localforage";
import { Web3Reducer } from "./web3";
import { initStore } from "./api/api";
import { TokensReducer } from "./tokens";
import { AppReducer } from "./app";
import { SwapperReducer } from "./swapper";

export type IRootState = {
  web3: ReturnType<typeof Web3Reducer>;
  tokens: ReturnType<typeof TokensReducer>;
  app: ReturnType<typeof AppReducer>;
  swapper: ReturnType<typeof SwapperReducer>
};

localforage.config({
  driver: localforage.INDEXEDDB, // Utiliser IndexedDB
  name: "redux-store",
  storeName: "reduxStore", // Nom du store IndexedDB
});

export const store = configureStore({
  reducer: {
    web3: Web3Reducer,
    tokens: TokensReducer,
    app: AppReducer,
    swapper: SwapperReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      convertClassToObjectMiddleware,
      promiseAwaitingMiddleware,
      ...persistMiddleware,
      ...appMiddleware,
      ...tokensMiddleware,
      ...swapperMiddleware
    ),
});

setupListeners(store.dispatch);
initStore(store);

export const dispatch = (action: PayloadAction<any>) => store.dispatch(action);

export const getStoreState = () => {
  return store.getState();
};
