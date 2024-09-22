import { useSelector } from "react-redux";
import { landingSelector } from "~/store/selectors/app";

export const useShowLanding = () => {
  return useSelector(landingSelector);
};
