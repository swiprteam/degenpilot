import { useSelector } from "react-redux";
import { Token } from "~/model/token";
import { IRootState } from "~/store";
import { TokenInterface } from "~/types/interfaces";

export const useTokens = (): TokenInterface[] => {
  return useSelector((state: IRootState) => state.tokens.list);
};

export const useSelectedToken = (): TokenInterface => {
  return useSelector((state: IRootState) => {
    if (state.tokens.selected === null) return null;
    return new Token(state.tokens.list[state.tokens.selected]);
  });
};
