import styled from "styled-components";
import {Spin} from "antd";

export const LavenderSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #b37feb; /* Tom médio de lavanda */
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 16px;
`;

export const LoadingText = styled.span`
  color: #722ed1;
  font-size: 16px;
  font-weight: 500;
`;
