import styled from "styled-components";

import { TokenInterface } from "~/types/interfaces";
import Header from "./Header";
import Score from "./Score";
import Swap from "./Swap";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useState } from "react";
import { openBuyMenu } from "~/services/app";
import { swapLeft } from "~/services/tokens";

type Props = {
    token: TokenInterface;
};

const TokenCard = ({ token }: Props) => {
    return (
        <StyledTokenCard className="mt-4 flex flex-col overflow-hidden">
            <Score token={token} />
            <Header token={token} />
            <Swap token={token} />
        </StyledTokenCard>
    );
};

const StyledTokenCard = styled.div`
    touch-action: pan-y; /* Allows vertical scrolling */
    background: #282828;
    border-radius: 20px;
    padding: 20px;
`;

export default TokenCard;
