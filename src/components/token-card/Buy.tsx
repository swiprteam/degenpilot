import { useWeb3ModalProvider } from "@web3modal/solana/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { closeBuyMenu } from "~/services/app";
import { swapRight } from "~/services/tokens";
import { sendBuyTransaction } from "~/services/web3";
import { TokenInterface } from "~/types/interfaces";
import { Box, ColorButton } from "~/utils/styled";
import { RotatingLines } from "react-loader-spinner";
import clsx from "clsx";
const FEES = 0.02; // 2% fee

const Buy = ({ token }: { token: TokenInterface }) => {
  const { connection, walletProvider } = useWeb3ModalProvider();
  const values = useMemo(
    () => [
      { key: "0.1", value: 0.1, label: "0.1 SOL" },
      { key: "1", value: 1, label: "1 SOL" },
      { key: "10", value: 10, label: "10 SOL" },
      { key: "100", value: 100, label: "100 SOL" },
      { key: "custom", value: null, label: "CUSTOM" },
    ],
    []
  );

  const [selected, setSelected] = useState("custom");
  const [value, setValue] = useState<string>("");
  const [slippage, setSlippage] = useState(50);
  const [loading, setLoading] = useState(false);

  const buyToken = useCallback(async () => {
    await sendBuyTransaction({
      wallet: walletProvider,
      value: parseFloat(value),
      connection,
      slippage,
      fees: FEES,
      output: token.info.address,
    });
  }, [walletProvider, value, connection, slippage, token.info.address]);

  const isDisabled = useMemo(() => {
    const numberValue = parseFloat(value);
    return loading || isNaN(numberValue) || numberValue <= 0;
  }, [value, loading]);
  return (
    <div>
      <Box className="p-4">
        <div className="flex flex-col">
          <ul className="flex justify-center gap-1 max-w-full w-full">
            {values.map(({ key, value, label }) => (
              <SelectButton
                active={key === selected}
                key={key}
                onClick={() => {
                  setValue(value.toString());
                  setSelected(key);
                }}
              >
                {label}
              </SelectButton>
            ))}
          </ul>
          <Input
            name="value"
            placeholder="0.00"
            value={value}
            onChange={(e) => {
              const inputValue = e.target.value
                .replace(/,/g, ".")
                .replace(/[^0-9.]/g, "");
              setSelected("custom");
              setValue(inputValue);
            }}
          />
        </div>
      </Box>
      <div className="flex mt-4">
        <ColorButton onClick={() => closeBuyMenu()} cancel className="mr-4">
          Cancel
        </ColorButton>
        <ColorButton
          disabled={isDisabled}
          onClick={async () => {
            if (isDisabled) return;
            setLoading(true);
            try {
              await buyToken();
              swapRight(token);
              setLoading(false);
              toast.success("Transaction sent");
            } catch (e) {
              console.log("🚀 ~ onClick={ ~ e:", e);
              setLoading(false);
              toast.error("Transaction failed");
            }
          }}
          success
          className="w-full bg-success"
        >
          Buy
        </ColorButton>
      </div>
      <Mask
        className={clsx("justify-center items-center", {
          hidden: !loading,
          flex: loading,
        })}
      >
        <RotatingLines
          visible={loading}
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </Mask>
    </div>
  );
};

const SelectButton = styled.li<{ active: boolean }>`
  border-radius: 6px;
  border: 1px solid rgba(0, 59, 113, 0);
  background: ${(props) =>
    props.active
      ? "linear-gradient(180deg, #008DDC 0%, #039CDD 100%)"
      : "#113061"};
  color: ${(props) => (props.active ? "#072045" : "#fff")};
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 10px;
  line-height: 0;
  height: 26px;
  width: 20%;
  text-align: center;
  font-weight: 600;
  flex-shrink: 0;
`;

const Input = styled.input`
  height: 35px;
  border-radius: 10;
  background: linear-gradient(180deg, #051e44 0%, #000205 79.5%, #15386d 100%);
  font-size: 24px;
  width: 100%;
  margin-top: 10px;
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
`;
export default Buy;
