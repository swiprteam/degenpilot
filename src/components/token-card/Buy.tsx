import { useWeb3ModalProvider } from "@web3modal/solana/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { swapRight } from "~/services/tokens";
import { sendBuyTransaction } from "~/services/web3";
import { Box, ColorButton } from "~/utils/styled";
import { RotatingLines } from "react-loader-spinner";
import clsx from "clsx";
import { useSelectedToken } from "~/hooks/tokens";
import { setFromValue } from "~/store/swapper";
import { dispatch } from "~/store";
import {  EstimationProvider } from "~/context/estimation-context";
import { useCanSwap } from "~/hooks/swapper";
const FEES = 0.01; // 1% fee

const Buy = () => {
    const token = useSelectedToken();
    const { connection, walletProvider } = useWeb3ModalProvider();
    const values = useMemo(
        () => [
            { key: "0.1", value: 0.1, label: "0.1 SOL" },
            { key: "1", value: 1, label: "1 SOL" },
            { key: "10", value: 10, label: "10 SOL" },
            { key: "100", value: 50, label: "50 SOL" },
        ],
        []
    );

    const [selected, setSelected] = useState("custom");
    const [value, setValue] = useState<string>("");
    const [slippage, setSlippage] = useState(100);
    const [loading, setLoading] = useState(false);

    const canSwap = useCanSwap()
    const buyToken = useCallback(async () => {
        await sendBuyTransaction({
            wallet: walletProvider,
            connection,
        });
    }, [walletProvider, connection]);

    const isDisabled = useMemo(() => {
        const numberValue = parseFloat(value);
        return loading || isNaN(numberValue) || numberValue <= 0 || !canSwap;
    }, [value, loading,canSwap]);

    return (
        <EstimationProvider>
            <div className="formBuy mt-4 md:mt-8">
                <Box>
                    <div className="flex flex-col">
                        <ul className="selectSol flex justify-between gap-1 max-w-full w-full">
                            {values.map(({ key, value, label }) => (
                                <SelectButton
                                    active={key === selected}
                                    key={key}
                                    onClick={() => {
                                        setValue(value.toString());
                                        dispatch(setFromValue(value));
                                        setSelected(key);
                                    }}>
                                    {label}
                                </SelectButton>
                            ))}
                        </ul>

                        <div className="flex mt-4 wrapBuy">
                            <Input
                                className="inputBuy"
                                name="value"
                                placeholder="0.00"
                                value={value}
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                        .replace(/,/g, ".")
                                        .replace(/[^0-9.]/g, "");
                                    setSelected("custom");
                                    setValue(inputValue);
                                    dispatch(setFromValue(Number(inputValue)))
                                }}
                            />
                            <ColorButton
                                disabled={isDisabled}
                                onClick={async () => {
                                    if (isDisabled) return;
                                    setLoading(true);
                                    try {
                                        await buyToken();
                                        swapRight();
                                        setLoading(false);
                                        toast.success("Transaction sent");
                                    } catch {
                                        setLoading(false);
                                        toast.error("Transaction failed");
                                    }
                                }}
                                className="buttonBuy">
                                Buy
                            </ColorButton>
                        </div>
                    </div>
                </Box>

                <Mask
                    className={clsx("justify-center items-center", {
                        hidden: !loading,
                        flex: loading,
                    })}>
                    <RotatingLines
                        visible={loading}
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                    />
                </Mask>
            </div>
        </EstimationProvider>
    );
};

const SelectButton = styled.li<{ active: boolean }>`
    border-radius: 15px;
    border: 2px solid #3a3a3a;
    padding: 1px 10px;
    color: #68b790;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-size: 14px;
    text-align: center;
    font-weight: 600;
    transition: all 0.3s;
    cursor: pointer;
    font-family: "NB-Bold", sans-serif;
    &:hover {
        background: #3a3a3a;
        border-color: #68b790;
    }
`;

const Input = styled.input``;

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
