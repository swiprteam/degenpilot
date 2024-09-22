import { AddressButton } from "~/utils/styled";
import Logo from "./Logo";
import { useWeb3ModalAccount } from "@web3modal/solana/react";
import { shortenAddress } from "~/utils/utils";
import { useWeb3Modal } from "~/hooks/web3";

const Header = () => {
  const { address } = useWeb3ModalAccount();
  const { instance } = useWeb3Modal();
  return (
    <header className="flex w-full overflow-hidden bg-secondary p-4">
      <Logo className="w-10" />
      <div className="w-full flex justify-end">
        <AddressButton onClick={() => instance.open()}>
          {shortenAddress(address)}
        </AddressButton>
      </div>
    </header>
  );
};
export default Header;
