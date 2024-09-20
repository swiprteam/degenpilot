import { TokenInterface } from "~/types/interfaces";

type Props = {
  token: TokenInterface;
};
const TokenCard = ({ token }: Props) => {
  return (
    <div>
      <h1>{token.info.name}</h1>
      <p>{token.info.symbol}</p>
    </div>
  );
};

export default TokenCard;
