import { getStoreState } from "~/store";
import {
  chainsIsLoadingSelector,
  chainsSelector,
} from "~/store/selectors/web3";
import JSBI from "jsbi";
import { SystemProgram } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { VersionedTransaction } from "@solana/web3.js";
import { AddressLookupTableAccount } from "@solana/web3.js";
import { TransactionMessage } from "@solana/web3.js";
import { Provider } from "@web3modal/solana/react";
import { Connection } from "@solana/web3.js";
export const getWeb3State = () => getStoreState().web3;
import bs58 from 'bs58';

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
  value: number;
  connection: Connection;
  slippage: number;
  fees: number;
  output: string;
};
export const sendBuyTransaction = async ({
  wallet,
  value,
  connection,
  slippage,
  fees,
  output,
}: SendBuyTransactionProps) => {
  const SOL_MINT = "So11111111111111111111111111111111111111112";
  const FEES_WALLET = "9YcMeALSJ112pGUDUmQySPRH4Z3RHsA7EpcSjDBJ5SGX";

  const transferAmount = value * fees * 1e9; // Compute fees
  const transferInstruction = SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: new PublicKey(FEES_WALLET),
    lamports: transferAmount,
  });
  const amount = JSBI.BigInt((inputAmount * 1e9) - transferAmount); // Convert input amount to lamports

  const quoteData = await (
    await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${SOL_MINT}&outputMint=${output}&amount=${amount}&slippageBps=${slippage}`
    )
  ).json();

  const { swapTransaction } = await (
    await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse: quoteData,
        userPublicKey: wallet.publicKey.toString(),
        wrapAndUnwrapSol: true,
        prioritizationFeeLamports: {
          jitoTipLamports: 100000
        }
      }),
    })
  ).json();
  const swapTransactionBuf = Buffer.from(swapTransaction, "base64");

  const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

  const addressLookupTableAccounts = await Promise.all(
    transaction.message.addressTableLookups.map(async (lookup: any) => {
      return new AddressLookupTableAccount({
        key: lookup.accountKey,
        state: AddressLookupTableAccount.deserialize(
          await connection
            .getAccountInfo(lookup.accountKey)
            .then((res) => res?.data)
        ),
      });
    })
  );

  /* Merge all the instructions (swap and transfer) into one array */
  const message = TransactionMessage.decompile(transaction.message, {
    addressLookupTableAccounts: addressLookupTableAccounts,
  });
  message.instructions.push(transferInstruction);
  transaction.message = message.compileToV0Message(addressLookupTableAccounts);

  const signTrans = await wallet.signTransaction(transaction);
  const serialized = signTrans.serialize();
  const encodedTx = bs58.encode(serialized);
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "sendTransaction",
    params: [encodedTx]
  }
  const res = await fetch(`https://mainnet.block-engine.jito.wtf/api/v1/transactions?bundleOnly=false`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  const txid = json.result

  // Wait for transaction confirmation
  await connection.confirmTransaction({
    blockhash: await connection.getLatestBlockhash().then((res) => res.blockhash),
    lastValidBlockHeight: await connection.getLatestBlockhash().then((res) => res.lastValidBlockHeight),
    signature: txid,
  });

  // Transaction has been confirmed
  console.log(`https://solscan.io/tx/${txid}`);
};
