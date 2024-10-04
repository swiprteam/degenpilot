import { AddressButton, Box } from "~/utils/styled";
import Logo from "./Logo";
import { useWeb3ModalAccount } from "@web3modal/solana/react";
import { shortenAddress } from "~/utils/utils";
import { useWeb3Modal } from "~/hooks/web3";

const Header = () => {
  const { address } = useWeb3ModalAccount();
  const { instance } = useWeb3Modal();

  return (
    <header className="overflow-hidden">
      <Box className="p-4 flex w-full ">
        <Logo className="w-10" />
        <div className="w-full flex justify-end">
          <AddressButton
            className="text-primary"
            onClick={() => instance.open()}
          >
            {shortenAddress(address)}
          </AddressButton>
        </div>
      </Box>
    </header>
  );
};
export default Header;
