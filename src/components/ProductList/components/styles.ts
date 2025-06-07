import {Card} from "antd";
import styled from "styled-components";

export const CardStyled = styled(Card)`
    .ant-card-cover{
        display: flex;
        justify-content: center;
        padding: 1rem
    }
    
    .ant-card-actions{
        li {
            text-align: end;
            padding: 0.4rem 1rem;
        }
    }
`