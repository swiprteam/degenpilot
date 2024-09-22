import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAppKitAccount();

  const { open } = useAppKit();

  if (!isConnected) {
    open();

    return;
  }
  return children;
};

export default AuthLayout;
