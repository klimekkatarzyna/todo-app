import React, { FC, useMemo } from "react";
import styled, { css } from 'styled-components';
import { COLOURS, IconWrapper } from "../../constants";
import { InputType } from "../../enums";
import { Plus } from '@styled-icons/feather/Plus';
import { Circle } from '@styled-icons/feather/Circle';
import useFocusingHandling from "../../hooks/useMouseHandling";

const Wrapper = styled.div<{ type: InputType, inputFocused: boolean, isIcon: boolean }>`
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    padding: 0 0.7rem;
    background-color: ${props => (props.type === InputType.primary) ? `inherit` : `${COLOURS.white}`};
    cursor: pointer;
    border-right: 1px solid ${COLOURS.lightGrey};

    ${props => !props.isIcon && css`
        border-bottom: 1px solid ${COLOURS.darkerGrey};
        border-right: none;
        border-radius: inherit;
        padding: 0;
    `};
    &:hover {
        background-color: ${COLOURS.white};
    }

    > button {
        border: none;
        background-color: inherit;
    }
`;

const InputStyled = styled.input<{ inputFocused: boolean, colorType: InputType }>`
    padding: 0.8rem;
    border: none;
    color: ${props => props.colorType === InputType.primary ? `${COLOURS.blue}`: `${COLOURS.white}`};
    outline: none;
    background-color: ${props => props.colorType === InputType.primary ? `inherit` : `${COLOURS.grey}`};
    ::placeholder {
        color: ${props => (props.colorType === InputType.primary && !props.inputFocused) ? `${COLOURS.blue}`: `${COLOURS.fontColor}`};
    }
`;

interface IInput<T = string | number> {
    name: string;
    value: T;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isIcon?: boolean;
    colorType: InputType;
    type?: 'text' | 'password';
    autoFocus?: boolean;
}

export const Input: FC<IInput> = ({ name, value, isIcon = false, placeholder = '', colorType, type = 'test', onChange, autoFocus }) => {
    const { onFocus, onBlur, isFocused } = useFocusingHandling();
    const iconColor: string = useMemo(() => (colorType === InputType.primary && !isFocused) ? COLOURS.blue : COLOURS.fontColor, [type, isFocused]);

    return (
        <Wrapper type={colorType} inputFocused={isFocused} isIcon={isIcon}>
            {isIcon && (
                <button type='submit'>
                    <IconWrapper color={iconColor}>{isFocused ? <Circle/> : <Plus />}</IconWrapper>
                </button>
            )}
            <InputStyled
                name={name}
                value={value}
                type={type}
                colorType={colorType}
                placeholder={placeholder}
                autoFocus={autoFocus || false}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                inputFocused={isFocused} />
        </Wrapper>
    )
}