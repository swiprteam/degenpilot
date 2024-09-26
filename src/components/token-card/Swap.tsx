import { Box } from "~/utils/styled";

import trash from "@/assets/trash.png";
import buy from "@/assets/buy.png";

import styled from "styled-components";
import { TokenInterface } from "~/types/interfaces";
import { swapLeft, swapRight } from "~/services/tokens";

const Swap = ({ token }: { token: TokenInterface }) => {
  return (
    <Box className="w-full mt-8">
      <ul className="flex w-full justify-center gap-8 px-12 py-8">
        <li className="w-1/2">
          <ButtonBox>
            <StyledButton onClick={() => swapLeft(token)}>
              <img src={trash} alt="trash" />
            </StyledButton>
          </ButtonBox>
          <span className="text-xl text-center text-error block mt-2">
            SKIP
          </span>
        </li>
        <li className="w-1/2">
          <ButtonBox onClick={() => swapRight(token)}>
            <StyledButton>
              <img src={buy} alt="buy" />
            </StyledButton>
          </ButtonBox>
          <span className="text-xl text-center text-success block mt-2">
            BUY
          </span>
        </li>
      </ul>
    </Box>
  );
};

export default Swap;

const ButtonBox = styled.div`
  width: 100%;
  position: relative;
  background: rgba(20, 68, 139, 0.36);
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 100%;
`;

const StyledButton = styled.button`
  width: 100%;
  position: relative;
  background: rgba(20, 68, 139, 0.36);
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 100%;
  &::before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 100%;
  }
  > * {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 75px;
  }
`;
