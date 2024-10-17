import { useSelector } from "react-redux";
import {
  isFlippedSelector,
  isInitSelector,
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

export const useIsFlipped = () => {
  return useSelector(isFlippedSelector);
};
