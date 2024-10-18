import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "~/store";
import {
  canSwapSelector,
  estimationIsEnabledSelector,
  swapTransactionSelector,
} from "../store/selectors/swapper";
import md5 from 'md5'

export const cacheHash = (...params: any[]) => {
  return md5(JSON.stringify(params));
};
export const useSwapperStore = () =>
  useSelector((state: IRootState) => state.swapper);

export const useIsInit = () => useSwapperStore().is.init;
export const useIsSelection = () => useSwapperStore().is.selection;
export const useInteraction = () => useSwapperStore().interaction;
export const useHash = () => useSwapperStore().hash;
export const useOnWrite = () => {
  return useSwapperStore().is.onWrite;
};

export const useEstimationHash = () => {
  const interaction = useInteraction();
  const toToken = useToToken();
  const fromValue = useFromValue();

  return useMemo(
    () => cacheHash("estimate", interaction, toToken, fromValue),
    [interaction, toToken, fromValue]
  );
};
export const useEstimationOnProgress = () =>
  useSelector((state: IRootState) => state.swapper.is.estimationOnprogress);

export const useEstimationIsEnabled = () => {
  return useSelector(estimationIsEnabledSelector);
};
export const useFromValue = () => {
  return useSelector(
    (state: IRootState) => state.swapper[state.swapper.interaction].value
  );
};
export const useSwaptransaction = () => {
  return useSelector(swapTransactionSelector);
};

export const useToToken = () => {
  return useSelector(
    (state: IRootState) => state.swapper[state.swapper.interaction].to
  );
};

export const useCanSwap = () => useSelector(canSwapSelector);
