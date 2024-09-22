import styled from "styled-components";
export const Box = styled.div`
  border-radius: 10px;
  border: 1px solid #003b71;
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
`;
