import React, { FC } from "react";
import styled from 'styled-components';
import { InputType } from "../enums";
import CreateGroup from "./CreateGroup";
import { Input } from "./Input/Input";

const Wrapper = styled.div`
    display: flex;
    bottom: 0;
    position: fixed;
`;

interface ICreateListItem {

}

export const CreateListItem: FC<ICreateListItem> = () => {
    // TODO: logic to adding item 
    return (
        <Wrapper>
            <Input isIcon type={InputType.primary} placeholder={'Nowa lista'} />
            <CreateGroup />
        </Wrapper>
    )
}