import { Middleware } from "@reduxjs/toolkit";
import { Token } from "~/model/token";
import { dispatch } from "..";
import { ActionInteraction, select } from "../swapper";

export const CACHE_VERSION = 2;
const onSelectedTokenChangeMiddleware: Middleware = () => (next) => (action: any) => {
  next(action);
  if (['tokens/select', 'tokens/selectFirstToken','tokens/next','tokens/prev'].includes(action.type)) {
    dispatch(select({
      token: Token.byId[action.payload] as Token,
      for: 'to',
      interaction: ActionInteraction.SWAP,
    }))
  }
};

export default [
  onSelectedTokenChangeMiddleware,
] as Middleware[];
