import { TokenInterface } from "~/types/interfaces";

type Props = {
  token: TokenInterface;
};
const TokenCard = ({ token }: Props) => {
  console.log("🚀 ~ TokenCard ~ token:", token);
  return (
    <div className="mt-4 flex flex-col">
      <div className="name w-full flex">
        <img src={token.info.imageUrl} alt={token.info.name} />
        <div>
          <h1>{token.info.name}</h1>
          <ul className="flex">
            <li>
              <span className="block">MCap</span>
              <span className="block">{3.2}M</span>
            </li>
          </ul>
        </div>
      </div>

      <p>{token.info.symbol}</p>
    </div>
  );
};

export default TokenCard;
