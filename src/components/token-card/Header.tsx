import { TokenInterface } from "~/types/interfaces";
import solana from "@/assets/solana.png";
import { Box } from "~/utils/styled";
import TokenImage from "../TokenImage";
import clsx from "clsx";
import Graph from "@/assets/graph.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Header = ({ token }: { token: TokenInterface }) => (
    <Box className="name w-full flex p-4 relative">
        <div className="flex flex-col justify-center">
            <TokenImage token={token} />
        </div>
        <div>
            <h1 className="tokenName">{token.info.symbol}</h1>

            {
                <ul className="absolute right-0 top-0 flex flex-col">
                    <li className="p-3">
                        <a
                            href={`https://dexscreener.com/solana/${token.info.address}`}
                            target="_blank">
                            <img src={Graph} alt="graph" />
                        </a>
                    </li>
                </ul>
            }

            <ul className="dataToken flex w-full">
                {token.info.marketCap && (
                    <li className="w-1/2">
                        <span className="titleData block">MCap</span>
                        <span className="block">
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
                    <span className="titleData block">24H</span>
                    <span
                        className={clsx("percentMovement", {
                            "text-red-500": token.info.h24Change < 0,
                            "text-green-500": token.info.h24Change >= 0,
                        })}>
                        <span>{token.info.h24Change}% </span>
                        {token.info.h24Change >= 0 ? (
                            <FaChevronUp className="upOrDown" />
                        ) : (
                            <FaChevronDown className="upOrDown" />
                        )}
                    </span>
                </li>
            </ul>
        </div>
    </Box>
);

export default Header;
