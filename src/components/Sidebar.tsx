import React, { FC } from "react";
import styled from 'styled-components';
import { COLOURS } from "../constants";
import { CreateListElement } from "../CreateListElement";
import { Input } from "./Input/Input";
import { MainList } from "./MainList/MainList";

const Wrapper = styled.div`
    display: flex;
    background-color: ${COLOURS.darkGrey};
    flex-direction: column;
    height: 100%;
    padding: 1rem 0;
    min-width: 250px;
`;

interface ISidebar {

}

export const Sidebar: FC<ISidebar> = () => {
    return (
        <Wrapper>
            {/*TODO: search*/}
            <MainList />
            {/*TODO: list od added lists or groups*/}
            {/*TODO: input to add lists or groups */}
            <CreateListElement />
        </Wrapper>
    )
}