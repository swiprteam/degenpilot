import { useSelector } from "react-redux";

import {
  selectedTokenSelector,
  tokensIsLoadingSelector,
  tokensSelector,
} from "~/store/selectors/tokens";
import { TokenInterface } from "~/types/interfaces";

export const useTokens = (): TokenInterface[] => {
  return useSelector(tokensSelector);
};

export const useSelectedToken = (): TokenInterface => {
  return useSelector(selectedTokenSelector);
};

export const useIsLoading = () => {
  return useSelector(tokensIsLoadingSelector);
};
