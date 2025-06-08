import {Button, Card} from "antd";
import styled, {css} from "styled-components";
import theme from "../../../styles/theme.ts";

interface StyledProductCardProps {
    $isDisabled?: boolean;
}

export const StyledProductCard = styled(Card)<StyledProductCardProps>`
    width: 240px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    position: relative;
    padding: 0.5rem;

    ${props => props.$isDisabled && css`
        && {
            background-color: ${theme.colors.gray['50']};
            border: 1px solid ${theme.colors.gray['100']};

            .ant-card-cover {
                position: relative;

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(245, 245, 245, 0.85);
                    z-index: 1;
                }
            }

            .ant-card-body {
                position: relative;

                &::before {
                    content: "RESERVADO";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: ${theme.colors.gray['300']};
                    color: ${theme.colors.gray['700']};
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    z-index: 2;
                    white-space: nowrap;
                    letter-spacing: 1px;
                }
            }

            .ant-card-meta-title {
                position: relative;
                color: ${theme.colors.gray['500']};

                &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 100%;
                    height: 1px;
                    background: ${theme.colors.gray['500']};
                    transform: translateY(-50%);
                }
            }

            .ant-card-meta-description {
                color: ${theme.colors.gray['500']};
                text-decoration: line-through;
            }
        }
    `}
    .ant-card-cover {
        height: 200px;
        overflow: hidden;
    }

    .ant-card-body {
        padding: 16px;
        position: relative;
    }

    .ant-card-meta-title {
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
        margin-bottom: 8px;
        color: ${theme.colors.gray['800']};
    }

    .ant-card-meta-description {
        font-size: 1.5rem;
        font-weight: 700;
        color: ${theme.colors.gray['800']};
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

    ${props => props.disabled && css`
    && {
      background-color: ${theme.colors.gray['100']};
      border-color: ${theme.colors.gray['300']};
      color: ${theme.colors.gray['500']};
      cursor: not-allowed;
      text-decoration: line-through;
    }
  `}
`;
