import { useSelector } from "react-redux";
import {
  chainsIsLoadingSelector,
  loadingSelector,
  web3ModalSelector,
} from "~/store/selectors/web3";

export const useWeb3Loading = () => {
  return useSelector(chainsIsLoadingSelector);
};

export const useLoading = () => {
  return useSelector(loadingSelector);
};
export const useWeb3Modal = () => {
  return useSelector(web3ModalSelector);
};
