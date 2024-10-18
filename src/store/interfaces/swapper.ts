import { VersionedTransaction } from "@solana/web3.js";
import { Token } from "~/model/token";

export interface SetOnWritePayload {
  onWrite: boolean;
  debounceTimer?: NodeJS.Timeout;
}


export interface SetOnWritePayload {
  onWrite: boolean;
  debounceTimer?: NodeJS.Timeout;
}

interface SwapperOperation {
  value: number;
  transaction: VersionedTransaction;
}
export interface SwapperOperationSwap extends SwapperOperation {
  to: Token;
}
