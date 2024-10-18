import { useQuery } from "@tanstack/react-query";
import { useWeb3ModalProvider } from "@web3modal/solana/react";
import { createContext, useEffect } from "react";
import { useEstimationHash, useEstimationIsEnabled } from "~/hooks/swapper";
import { estimate } from "~/services/estimate";
import { dispatch } from "~/store";
import {  setInteractionQuote } from "~/store/swapper";

const EstimationContext = createContext({});

const EstimationProvider = ({ children }) => {
  const hash = useEstimationHash();

  const isEnabled = useEstimationIsEnabled();

  const { walletProvider,connection } = useWeb3ModalProvider();

  const { data: estimationData } = useQuery({
    queryKey: [`estimation-${hash}`],
    queryFn: () => estimate(walletProvider,connection),
    staleTime: 0,
    refetchInterval: 5000,
    enabled: isEnabled,
  });

  useEffect(() => {
    dispatch(setInteractionQuote(null));
  }, [hash]);
  useEffect(() => {
    dispatch(setInteractionQuote(estimationData));
  }, [estimationData]);

  return (
    <EstimationContext.Provider value={{ estimationData }}>
      {children}
    </EstimationContext.Provider>
  );
};

export { EstimationContext, EstimationProvider };
