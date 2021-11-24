import React, { FC, useMemo } from "react";
import styled, { css } from 'styled-components';
import { COLOURS, IconWrapper } from "../../constants";
import { InputVersion } from "../../enums";
import { Plus } from '@styled-icons/feather/Plus';
import { Circle } from '@styled-icons/feather/Circle';
import useFocusingHandling from "../../hooks/useMouseHandling";

interface IWrapper {
    type: InputVersion;
    inputFocused: boolean;
    isIcon: boolean;
    isTaskInput?: boolean;
}

const Wrapper = styled.div<IWrapper>`
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    padding: 0 0.7rem;
    background-color: ${props => (props.type === InputVersion.primary) ? `inherit` : `${COLOURS.white}`};
    cursor: pointer;
    border-right: 1px solid ${COLOURS.lightGrey};
    border-top: 1px solid ${COLOURS.white};
    width: 100%;

    ${props => !props.isIcon && css`
        border-bottom: 1px solid ${COLOURS.darkerGrey};
        border-right: none;
        border-radius: inherit;
        padding: 0;
    `};

    ${props => (props.isTaskInput && props.inputFocused) && css`
        border-bottom: 1px solid ${COLOURS.blue};
        border-radius: inherit;
        border-right: none;
    `};

    > button {
        border: none;
        background-color: inherit;
    }
`;

const InputStyled = styled.input<{ inputFocused: boolean, colorType: InputVersion, isTaskInput?: boolean }>`
    width: 100%;
    padding: ${props => !props.isTaskInput ? '0.8rem': '1.2rem'};
    border: none;
    color: ${props => props.colorType === InputVersion.primary ? `${COLOURS.blue}`: `${COLOURS.white}`};
    outline: none;
    background-color: ${props => props.colorType === InputVersion.primary ? `inherit` : `${COLOURS.grey}`};
    ::placeholder {
        color: ${props => (props.colorType === InputVersion.primary && !props.inputFocused) ? `${COLOURS.blue}`: `${COLOURS.darkerGrey}`};
    }
`;

type InputType = 'text' | 'password';

interface IInput<T = string | number | undefined> {
    name: string;
    value: T;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isIcon?: boolean;
    colorType: InputVersion;
    type?: InputType;
    autoFocus?: boolean;
    isTaskInput?: boolean;
}

export const Input: FC<IInput> = ({ name, value, isIcon = false, placeholder = '', colorType, type = 'test', onChange, autoFocus, isTaskInput }) => {
    const { onFocus, onBlur, isFocused } = useFocusingHandling();
    const iconColor: string = useMemo(() => (colorType === InputVersion.primary && !isFocused) ? COLOURS.blue : COLOURS.fontColor, [type, isFocused]);

    return (
        <Wrapper type={colorType} inputFocused={isFocused} isIcon={isIcon} isTaskInput={isTaskInput}>
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
                inputFocused={isFocused}
                isTaskInput={isTaskInput} />
        </Wrapper>
    )
}