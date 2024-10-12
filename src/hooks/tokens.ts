import { useSelector } from "react-redux";

import {
  selectedTokenSelector,
  tokensSelector,
} from "~/store/selectors/tokens";
import { TokenInterface } from "~/types/interfaces";

export const useTokens = (): TokenInterface[] => {
  return useSelector(tokensSelector);
};

export const useSelectedToken = (): TokenInterface => {
  return useSelector(selectedTokenSelector);
};
