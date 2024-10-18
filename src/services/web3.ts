import { Connection } from "@solana/web3.js";
import { Provider } from "@web3modal/solana/react";
import { getStoreState } from "~/store";
import {
  chainsIsLoadingSelector,
  chainsSelector,
} from "~/store/selectors/web3";
import { getSwapTransaction } from "./swapper";
export const getWeb3State = () => getStoreState().web3;

export const getChainsIsLoding = () => {
  const state = getStoreState();
  return chainsIsLoadingSelector(state);
};

export const getChains = () => {
  const state = getStoreState();

  return chainsSelector(state);
};

type SendBuyTransactionProps = {
  wallet: Provider;
  connection: Connection;

};
export const sendBuyTransaction = async ({
  wallet,
  connection,

}: SendBuyTransactionProps) => {

  const transaction = getSwapTransaction()
  const signTrans = await wallet.signTransaction(transaction);
  const txid = await connection.sendRawTransaction(signTrans.serialize());
  await connection.confirmTransaction({
    blockhash: await connection
      .getLatestBlockhash()
      .then((res) => res.blockhash),
    lastValidBlockHeight: await connection
      .getLatestBlockhash()
      .then((res) => res.lastValidBlockHeight),
    signature: txid,
  });
  console.log(`https://solscan.io/tx/${txid}`);
};
