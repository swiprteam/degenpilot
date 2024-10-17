import { AddressButton, Box } from "~/utils/styled";
import Logo from "./Logo";
import Group from "/group.png";
import { useWeb3ModalAccount } from "@web3modal/solana/react";
import { shortenAddress } from "~/utils/utils";
import { useWeb3Modal } from "~/hooks/web3";

const Header = () => {
    const { address } = useWeb3ModalAccount();
    const { instance } = useWeb3Modal();

    return (
        <header className="overflow-hidden">
            <Box className="cardHeader flex w-full ">
                <div className="brand">
                    <Logo className="w-8 sm:w-10" />
                    Swipr
                </div>
                <div className="w-full flex justify-end">
                    <AddressButton className="" onClick={() => instance.open()}>
                        <img src={Group} alt="group" className="w-4 sm:w-6" />
                        {shortenAddress(address, 6)}
                    </AddressButton>
                </div>
            </Box>
        </header>
    );
};
export default Header;
