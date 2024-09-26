import styled from "styled-components";
export const Box = styled.div<{ bordered?: boolean }>`
  border-radius: 10px;
  border: ${(props: any) =>
    props.bordered ? "3px solid #003b71" : "1px solid #003b71"};
  background: #072045;
  box-shadow: 0px 15px 15px 0px rgba(0, 167, 220, 0.05);
  backdrop-filter: blur(7px);
`;

export const AddressButton = styled.button`
  border-radius: 10.625px;
  border: 1px solid #103368;
  background: linear-gradient(180deg, #0f2950 0%, rgba(34, 93, 182, 0) 100%);
`;

export const AppLayout = styled.div`
  background: #03112c;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  padding: 22px;
`;

export const Button = styled.button`
  border-radius: 12px;
  border: 1px solid var(--Blue, #00b0f4);
  background: #072045;
  box-shadow: 0px 1px 2px 0px #00a7dc,
    0px -2px 2px 0px var(--Blue, #00b0f4) inset;
`;

export const Square = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  &::before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 100%;
  }
`;
