import { TokenInterface } from "~/types/interfaces";
import BuyButtons from "./BuyButtons";
import Buy from "./buy";
import { useShowBuy } from "~/hooks/app";

const Swap = ({ token }: { token: TokenInterface }) => {
  const showBuyMenu = useShowBuy();
  if (showBuyMenu) return <Buy token={token} />;
  if (!showBuyMenu) return <BuyButtons token={token} />;
};

export default Swap;
