import { Box } from "~/utils/styled";
import CircularGauge from "../CircularJauge";
import { TokenInterface } from "~/types/interfaces";

const Score = ({ token }: { token: TokenInterface }) => {
  return (
    <Box bordered className="mt-8">
      <CircularGauge score={token.score.value} />
    </Box>
  );
};

export default Score;
