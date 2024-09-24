import { useSelector } from "react-redux";
import { isInitSelector, landingSelector } from "~/store/selectors/app";

export const useShowLanding = () => {
  return useSelector(landingSelector);
};

export const useIsInit = () => {
  return useSelector(isInitSelector);
};
