import { TokenInterface } from "~/types/interfaces";
import solana from "@/assets/solana.png";
import { Box } from "~/utils/styled";
import TokenImage from "../TokenImage";
const Header = ({ token }: { token: TokenInterface }) => (
  <Box bordered className="name w-full flex p-4">
    <div className="flex flex-col justify-center">
      <TokenImage token={token} />
    </div>
    <div className="ml-6 flex flex-wrap">
      <h1 className="text-2xl items-center flex w-full pr-6">
        {token.info.name}
        <div>
          <img src={solana} alt="solana" className="w-5 ml-2" />
        </div>
      </h1>

      {/**
      <ul className="absolute right-0 top-0 flex flex-col">
        <li className="p-3">
          <Share />
        </li>
      </ul>
      */}
      <ul className="flex w-full mt-8">
        {token.info.marketCap && (
          <li className="w-1/2">
            <span className="block text-xs">MCap</span>
            <span className="block text-lg font-black">
              {token.info.marketCap.toLocaleString("en-US", {
                compactDisplay: "short",
                notation: "compact",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </li>
        )}
        <li className="w-1/2">
          <span className="block text-xs">24H</span>
          <span className="block text-lg font-black text-success">
            35.4% {token.info.h24Change >= 0 ? "▲" : "▼"}
          </span>
        </li>
      </ul>
    </div>
  </Box>
);

export default Header;
