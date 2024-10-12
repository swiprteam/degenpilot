import { useWeb3ModalAccount } from "@web3modal/solana/react";

import { ReactNode } from "react";
import { useLoading, useWeb3Modal } from "@/hooks/web3";
import { AppLayout, Button } from "~/utils/styled";
import styled from "styled-components";
import Logo from "@/components/Logo";

const AuthLayoutContent = ({ children }: { children: ReactNode }) => {
    const { isConnected } = useWeb3ModalAccount();
    const { instance } = useWeb3Modal();

    if (!isConnected) {
        return (
            <AppLayout>
                <div className="flex flex-col">
                    <div className="content justify-center flex flex-col wrapper">
                        <h1 className="brandTitle">Swipr</h1>
                        <div className="landingLogoConnect">
                            <Logo />
                            <div className="emphaz">
                                Connect to app.
                                <div className="descLanding">
                                    Connect your wallet
                                    <br /> to Swipr below.
                                </div>
                            </div>
                            <Button
                                className="w-full flex justify-center items-center"
                                onClick={() => instance.open()}>
                                Connect wallet{" "}
                            </Button>
                        </div>
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
