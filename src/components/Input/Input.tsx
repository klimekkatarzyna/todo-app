import React, { FC, useMemo } from "react";
import styled from 'styled-components';
import { COLOURS, IconWrapper } from "../../constants";
import { InputType } from "../../enums";
import { Plus } from '@styled-icons/feather/Plus';
import { Circle } from '@styled-icons/feather/Circle';
import useFocusingHandling from "../../hooks/useMouseHandling";

const Wrapper = styled.div<{ type: InputType, inputFocused: boolean }>`
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    padding: 0 0.7rem;
    background-color: ${props => (props.type === InputType.primary) ? `inherit` : `${COLOURS.white}`};
    cursor: pointer;
    border-right: 1px solid ${COLOURS.lightGrey};
    &:hover {
        background-color: ${COLOURS.white};
    }

    > button {
        border: none;
        background-color: inherit;
    }
`;

const InputStyled = styled.input<{ inputFocused: boolean }>`
    padding: 0.8rem;
    border: none;
    color: ${props => props.type === InputType.primary ? `${COLOURS.blue}`: `${COLOURS.white}`};
    outline: none;
    background-color: ${props => props.type === InputType.primary ? `inherit` : `${COLOURS.grey}`};
    ::placeholder {
        color: ${props => (props.type === InputType.primary && !props.inputFocused) ? `${COLOURS.blue}`: `${COLOURS.fontColor}`};
    }
`;

interface IInput<T = string | number> {
    value: T;
    isIcon: boolean;
    type: InputType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const Input: FC<IInput> = ({ value, isIcon = true, placeholder = '', type , onChange}) => {
    const { onFocus, onBlur, isFocused } = useFocusingHandling();
    const iconColor: string = useMemo(() => (type === InputType.primary && !isFocused) ? COLOURS.blue : COLOURS.fontColor, [type, isFocused]);

    return (
        <Wrapper type={type} inputFocused={isFocused}>
            {isIcon && (
                <button type='submit'>
                    <IconWrapper color={iconColor}>{isFocused ? <Circle/> : <Plus />}</IconWrapper>
                </button>
            )}
            <InputStyled
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                inputFocused={isFocused} />
        </Wrapper>
    )
}