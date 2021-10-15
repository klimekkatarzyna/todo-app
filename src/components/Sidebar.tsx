import React, { FC } from "react";
import styled from 'styled-components';
import { COLOURS } from "../constants";
import CreateGroup from "./CreateGroup";
import CreateList from "./List/CreateList/CreateList";
import Lists from "./List/Lists/Lists";
import { MainList } from "./MainList/MainList";

const Wrapper = styled.div`
    display: flex;
    background-color: ${COLOURS.lightGrey};
    border-right: 1px solid #f4f4f4;
    flex-direction: column;
    height: 100%;
    padding: 1rem 0;
    min-width: 250px;
    width: 50px;
    transition: width 180ms ease;
`;

interface ISidebar {

}

export const Sidebar: FC<ISidebar> = () => {
    return (
        <Wrapper>
            {/*TODO: search*/}
            {'<'}
            <MainList />

            <Lists />
            {/*TODO: list od added lists or groups*/}
            {/*TODO: input to add lists or groups */}
            <CreateList />
            <CreateGroup />
        </Wrapper>
    )
}