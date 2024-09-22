import { useSelector } from "react-redux";
import { loadingSelector } from "~/store/selectors/web3";

export const useWeb3Loading = () => {
  return useSelector(loadingSelector);
};
