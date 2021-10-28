import React, { FC } from "react";
import styled from 'styled-components';
import TaskSidebarDetails from "./Tasks/TaskSidebarDetailsContainer";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    > div {
        margin: 0.5rem;
    }
`;
interface IBoard {
    children: React.ReactNode;
}

export const Board: FC<IBoard> = ({ children }) => {
    return (
        <Wrapper>
            {children}
            <TaskSidebarDetails />
        </Wrapper>
    )
}