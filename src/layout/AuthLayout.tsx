import { useWeb3ModalAccount } from "@web3modal/solana/react";

import { ReactNode } from "react";
import { useLoading, useWeb3Modal } from "@/hooks/web3";
import { AppLayout, Button } from "~/utils/styled";
import styled from "styled-components";
const AuthLayoutContent = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useWeb3ModalAccount();

  const { instance } = useWeb3Modal();

  if (!isConnected) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Connect to app
            </h1>
            <SubTitle className="mb-8">
              Connect your wallet to Swipr below
            </SubTitle>
            <Button
              className="w-full flex justify-center items-center text-white"
              onClick={() => instance.open()}
            >
              Connect wallet{" "}
            </Button>
          </div>
        </div>
      </AppLayout>
    );
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

const SubTitle = styled.h2`
  color: #b8b8b8;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #f6f6f6;
    margin-top: 10px;
  }
`;
