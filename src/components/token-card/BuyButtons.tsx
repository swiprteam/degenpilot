import styled from "styled-components";
import trash from "@/assets/trash.png";
import buy from "@/assets/buy.png";
import { swapLeft } from "~/services/tokens";
import { TokenInterface } from "~/types/interfaces";
import { Box } from "~/utils/styled";
import { openBuyMenu } from "~/services/app";

const BuyButtons = ({ token }: { token: TokenInterface }) => (
  <Box bordered className="w-full mt-4 sm:mt-8">
    <ul className="flex w-full justify-center gap-8 px-12 py-4 px-16 sm:py-8">
      <li className="w-1/2">
        <ButtonBox>
          <StyledButton onClick={() => swapLeft(token)}>
            <img src={trash} alt="trash" />
          </StyledButton>
        </ButtonBox>
        <span className="text-base sm:text-xl text-center text-error block mt-1 sm:mt-2">
          SKIP
        </span>
      </li>
      <li className="w-1/2">
        <ButtonBox onClick={() => openBuyMenu()}>
          <StyledButton>
            <img src={buy} alt="buy" />
          </StyledButton>
        </ButtonBox>
        <span className="text-base sm:text-xl text-center text-success block mt-1 sm:mt-2">
          BUY
        </span>
      </li>
    </ul>
  </Box>
);

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

export default BuyButtons;
