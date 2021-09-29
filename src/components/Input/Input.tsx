import React, { FC } from "react";
import { Plus } from '@styled-icons/feather/Plus';
import styled from 'styled-components';
import { COLOURS } from "../../constants";
import { InputType } from "../../enums";

const Wrapper = styled.div<{ type: InputType }>`
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    padding: 0 0.7rem;
    background-color: ${props => props.type === InputType.dark ? `${COLOURS.grey}`: `none`};
    > svg {
        width: 1.5rem;
        height: 1.5rem;
        color: ${props => props.type === InputType.dark ? `${COLOURS.blue}`: `${COLOURS.white}`};
    }
`;

const InputStyled = styled.input`
    padding: 0.8rem;
    border: none;
    color: ${props => props.type === InputType.dark ? `${COLOURS.blue}`: `${COLOURS.white}`};
    outline: none;
    background-color: ${props => props.type === InputType.dark ? `${COLOURS.grey}`: `none`};
    ::placeholder {
        color: ${props => props.type === InputType.dark ? `${COLOURS.blue}`: `${COLOURS.white}`};
    }
`;

interface IInput {
    isIcon: boolean;
    type: InputType;
    placeholder?: string;
}

export const Input: FC<IInput> = ({ isIcon = true, placeholder = '', type }) => {
    // TODO: formik input
    // TODO: handle mouse click events: left, rigth click
    // TODO: handle enter key
    return (
        <Wrapper type={type}>
            {isIcon && <Plus />}
            <InputStyled type={type} placeholder={placeholder} />
        </Wrapper>
    )
}