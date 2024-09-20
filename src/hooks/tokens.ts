import { useSelector } from "react-redux";

import { IRootState } from "~/store";
import { TokenInterface } from "~/types/interfaces";

export const useTokens = (): TokenInterface[] => {
  return useSelector((state: IRootState) => state.tokens.list);
};

export const useSwappableTokens = (): TokenInterface[] => {
  return useSelector((state: IRootState) => {
    return state.tokens.list.filter(
      (token) =>
        !state.tokens.history.left.includes(token._id) &&
        !state.tokens.history.right.includes(token._id)
    );
  });
};
