import { TokenInterface } from "~/types/interfaces";
import solana from "@/assets/solana.png";
import { Box } from "~/utils/styled";
import TokenImage from "../TokenImage";
import clsx from "clsx";
import Graph from "@/assets/graph.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

      {
        <ul className="absolute right-0 top-0 flex flex-col">
          <li className="p-3">
            <a
              href={`https://dexscreener.com/solana/${token.info.address}`}
              target="_blank"
            >
              <img src={Graph} alt="graph" />
            </a>
          </li>
        </ul>
      }

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
          <span
            className={clsx("flex items-center text-lg font-black", {
              "text-red-500": token.info.h24Change < 0,
              "text-green-500": token.info.h24Change >= 0,
            })}
          >
            {token.info.h24Change}%{" "}
            {token.info.h24Change >= 0 ? (
              <FaChevronUp className="ml-2" />
            ) : (
              <FaChevronDown className="ml-2" />
            )}
          </span>
        </li>
      </ul>
    </div>
  </Box>
);

export default Header;
