import React, { FC } from "react";
import styled from 'styled-components';
import { BackgroundLines } from "../constants";
import TaskSidebarDetails from "./Tasks/TaskSidebarDetailsContainer";

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const MainContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    height: 660px;
    overflow-y: scroll;
`;
interface IBoard {
    children: React.ReactNode;
}

export const Board: FC<IBoard> = ({ children }) => {

    return (
        <Wrapper>
            <MainContainer>
                {children}
                <BackgroundLines />
            </MainContainer>
            <TaskSidebarDetails />
        </Wrapper>
    )
}