import { TokenInterface } from "~/types/interfaces";

type Props = {
  token: TokenInterface;
};
const TokenCard = ({ token }: Props) => {
  return (
    <div>
      <h1>{token.meta.name}</h1>
      <p>{token.meta.symbol}</p>
    </div>
  );
};

export default TokenCard;
