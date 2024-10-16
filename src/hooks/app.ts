import { useSelector } from "react-redux";
import {
  isInitSelector,
  landingSelector,
  showBuySelector,
  showVideoSelector,
} from "~/store/selectors/app";

export const useIsInit = () => {
  return useSelector(isInitSelector);
};

export const useShowVideo = () => {
  return useSelector(showVideoSelector);
};

export const useShowBuy = () => {
  return useSelector(showBuySelector);
};
