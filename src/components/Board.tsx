import React, { FC } from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 2rem;
    position: relative;
    flex: 1 1 0px;
    display: flex;
    flex-direction: column;
`;
interface IBoard {
    children: React.ReactNode;
}

export const Board: FC<IBoard> = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}