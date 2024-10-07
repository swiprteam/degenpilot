import { dispatch } from "~/store";
import { setShowBuy } from "~/store/app";

export const closeBuyMenu = () => {
  dispatch(setShowBuy(false));
};
export const openBuyMenu = () => {
  dispatch(setShowBuy(true));
};
