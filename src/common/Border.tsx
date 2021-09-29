import React, { FC } from "react";
import styled from 'styled-components';
import { COLOURS } from "../constants";

const BorderStyled = styled.div`
    display: flex;
    background-color: ${COLOURS.border};
    margin: 1rem;
    height: 1px;
`;

export const Border: FC = () => {
    return (
        <BorderStyled />
    )
}