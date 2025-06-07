import {Button, Card} from "antd";
import styled from "styled-components";

export const StyledProductCard = styled(Card)`
    width: 240px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    padding: 0.5rem;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-4px);
    }

    .ant-card-cover {
        height: 200px;
        overflow: hidden;
    }

    .ant-card-body {
        padding: 16px;
    }

    .ant-card-meta-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .ant-card-meta-description {
        color: #1890ff;
        font-size: 16px;
        font-weight: 600;
    }

    .ant-card-actions {
        background: #fafafa;
        border-top: 1px solid #f0f0f0;
        padding: 12px 0;

        li {
            margin: 0;
            text-align: center;
        }
    }
`;

export const ReserveButton = styled(Button)`
  width: 100%;
  font-weight: 500;
  letter-spacing: 0.5px;
`;