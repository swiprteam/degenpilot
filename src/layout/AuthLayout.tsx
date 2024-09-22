import { useWeb3ModalAccount } from "@web3modal/solana/react";

import { ReactNode } from "react";
import { useLoading, useWeb3Modal } from "@/hooks/web3";

const AuthLayoutContent = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useWeb3ModalAccount();

  const { instance } = useWeb3Modal();

  if (!isConnected) {
    instance.open({
      view: "Connect",
    });
    return;
  } else {
    instance.close();
  }
  return children;
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { web3Modal } = useLoading();

  if (web3Modal) return;
  return <AuthLayoutContent>{children}</AuthLayoutContent>;
};
export default AuthLayout;
