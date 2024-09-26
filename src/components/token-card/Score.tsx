import { Box, Button } from "~/utils/styled";
import CircularGauge from "../CircularJauge";
import { TokenInterface } from "~/types/interfaces";

const Score = ({ token }: { token: TokenInterface }) => {
  return (
    <Box bordered className="mt-8">
      <Button className="absolute right-0 top-O m-2">+info</Button>
      <CircularGauge score={token.score.value} />
    </Box>
  );
};

export default Score;
